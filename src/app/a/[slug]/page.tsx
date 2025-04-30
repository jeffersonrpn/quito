import Link from "next/link";

import { Contract } from "../../api/contracts/types";
import { Person } from "../../api/person/types";
import Header from "./components/Header";
import Entry from "./components/Entry";
import Summary from "./components/Summary";
import FullContract from "./components/FullContract";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let person: Person | null = null;
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/person/${slug}`);

    if (res.status === 404) {
      return (
        <main className="p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Planilha não encontrada
          </h1>
          <p className="mb-4 text-gray-700">
            Não encontramos nenhuma planilha com o identificador{" "}
            <strong>{slug}</strong>.
          </p>
        </main>
      );
    }
    person = await res.json();
  } catch (error) {
    console.error("Error fetching person:", error);
  }

  let allContracts: Contract[] = [];
  let paidContracts: Contract[] = [];
  let currentContract: Contract | null = null;
  let contracts: Contract[] = [];

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/contracts/${slug}`);

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText} ${res.url}`);
    }

    allContracts = await res.json();
    paidContracts = allContracts.filter((contract) => contract.status);
    contracts = allContracts.filter((contract) => !contract.status);
    currentContract = contracts.splice(0, 1)[0];
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Erro ao carregar contrato
        </h1>
        <p className="text-gray-600">
          Verifique a URL ou tente novamente mais tarde.
        </p>
        <Link href={`/a/${slug}`} className="text-blue-600 hover:underline">
          Tentar novamente
        </Link>
      </main>
    );
  }

  return (
    <main>
      {person && <Header person={person} />}

      {allContracts.length && (
        <>
          {person && (
            <Summary
              person={person}
              contract={allContracts[allContracts.length - 1]}
              allContracts={allContracts}
            />
          )}
          {paidContracts.length > 0 && (
            <FullContract title="Anteriores" contracts={paidContracts} />
          )}
          <Entry
            key={currentContract.number}
            contract={currentContract}
            current={true}
          />
          {contracts && <FullContract title="Próximas" contracts={contracts} />}
        </>
      )}
    </main>
  );
}
