import { useClientesContext } from "../../context/ClientesProvider";
import { useFacturaContext } from "../../context/FacturaProvider";

export const TableEstadistica = () => {
  const { results } = useClientesContext();

  // const totalPagar = (apellido) => {
  //   return clientes.reduce((sum, b) => {
  //     return (
  //       sum +
  //       Number(b.clientes.apellido === apellido && b.estadistica.total_pagar)
  //     );
  //   }, 0);
  // };

  console.log(results);

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px]  p-[5px] table-auto w-full rounded">
        <thead>
          <tr>
            <th className="p-3">Numero</th>
            <th className="p-3">Cliente</th>
            <th className="p-3">Total facturado</th>
            <th className="p-3">Entrego</th>
            <th className="p-3">Deuda restante</th>
            <th className="p-3">Resetear total deuda</th>
            <th className="p-3">Editar entrega</th>
            <th className="p-3">Ver facturas</th>
            <th className="p-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          {results.map((c) => (
            <tr>
              <th className="border-[1px] border-gray-300 p-3 font-medium w-[20px]">
                {c.id}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {c.nombre} {c.apellido}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {Number(c.total_facturado).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                $0
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {Number(c.total_facturado).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>

              <th className="border-[1px] border-gray-300 p-3 font-medium">
                <button
                  type="button"
                  className="bg-red-500 py-1 px-2 rounded shadow text-white font-bold"
                >
                  resetear
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                <button
                  type="button"
                  className="bg-secondary py-1 px-2 rounded shadow text-white font-bold"
                >
                  editar
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                <button
                  type="button"
                  className="bg-green-500 py-1 px-2 rounded shadow text-white font-bold"
                >
                  ver facturas
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                <button
                  type="button"
                  className="bg-blue-500 py-1 px-2 rounded shadow text-white font-bold"
                >
                  realizado
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
