export interface SpreadsheetRow {
  number: string;
  value: string;
  fee: string;
  balance: string;
  status: string;
  date: string;
  total: string;
}

export type Contract = {
  number: number;
  value: number;
  fee: number;
  balance: number;
  status: boolean;
  date: Date;
  total: number;
};
