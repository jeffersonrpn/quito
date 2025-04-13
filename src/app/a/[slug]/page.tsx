// src/app/a/[slug]/page.tsx
import { notFound } from "next/navigation";

type Contract = {
  number: number;
  value: number;
  balance: number;
  status: boolean;
  date: Date;
  total: number;
};

export default async function Page({ params }: { params: { slug: string } }) {
  let contracts: Contract[] = [];
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/contracts/${params.slug}`
    );

    if (!res.ok) {
      notFound();
    }

    contracts = await res.json();
  } catch (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Erro ao carregar contrato
        </h1>
        <p className="text-gray-600">
          Verifique a URL ou tente novamente mais tarde.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">
      {contracts.length === 0 ? (
        <p className="text-gray-500">Nenhum registro encontrado</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Número</th>
              <th className="border-b p-2">Valor</th>
              <th className="border-b p-2">Saldo</th>
              <th className="border-b p-2">Data</th>
              <th className="border-b p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, i) => (
              <tr key={i}>
                <td className="border-b p-2">{c.number}</td>
                <td className="border-b p-2">{c.value.toFixed(2)}</td>
                <td className="border-b p-2">{c.balance.toFixed(2)}</td>
                <td className="border-b p-2">{c.date.toString()}</td>
                <td className="border-b p-2">{c.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
