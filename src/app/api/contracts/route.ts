import { ContractsData } from '../../data/contracts';

export async function GET() {
  const contracts = ContractsData;

  return new Response(JSON.stringify(contracts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
