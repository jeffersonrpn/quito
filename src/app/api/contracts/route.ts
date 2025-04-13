export async function GET(params: Request) {
  const contracts = [
    {
      id: "manuipad",
      description: "iPad & iPencil",
      active: true,
    },
    {
      id: "terebici",
      description: "Reforma da bicicleta",
      active: true,
    },
    {
      id: "hiannebici",
      description: "Reforma da bicicleta",
      active: true,
    },
    {
      id: "wellycarro",
      description: "Pegeaut 206",
      active: true,
    },
    {
      id: "gabicasa",
      description: "Casa",
      active: true,
    },
  ];

  return new Response(JSON.stringify(contracts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
