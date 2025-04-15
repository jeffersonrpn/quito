import { ContractsData } from "../../../data/contracts";
import { Person } from "../types";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const contract = ContractsData.filter(person => person.id === id);

  if (contract.length === 0) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }
  
  const person = contract[0] as Person;

  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });


}
