import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { SpreadsheetRow } from "../types";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const jwt = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID || "", jwt);
  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[id];

  if (!sheet) {
    return new Response(JSON.stringify({ error: "Sheet not found" }), {
      status: 404,
    });
  }

  const unformattedRows = await sheet.getRows<SpreadsheetRow>();
  const rows = unformattedRows.map((row) => ({
    number: +row.get("number"),
    value: parseFloat((row.get("value") || "0").replace(",", ".")),
    fee: parseFloat((row.get("fee") || "0").replace(",", ".")),
    balance: parseFloat((row.get("balance") || "0").replace(",", ".")),
    status: row.get("status") === "1",
    date: parseDate(row.get("date") || "01/01/1970"),
    total: parseFloat((row.get("total") || "0").replace(",", ".")),
  }));

  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

const parseDate = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day); // mês é zero-indexado
};
