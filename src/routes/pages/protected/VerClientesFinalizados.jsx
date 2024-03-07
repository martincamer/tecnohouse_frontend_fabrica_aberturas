import React, { useState } from "react";
import { usePedidoContext } from "../../../context/PedidoProvider";

export const VerClientesFinalizados = () => {
  const { results } = usePedidoContext();

  console.log(results);

  const [clienteFilter, setClienteFilter] = useState("");
  // Filtrar productos por cliente
  const filteredProductos = results.flatMap((order) =>
    order.productos.respuesta.filter((producto) =>
      producto.cliente.toLowerCase().includes(clienteFilter.toLowerCase())
    )
  );

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredProductos?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProductos?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const rangeSize = 5;

  const startPage = Math.max(1, currentPage - Math.floor(rangeSize / 2));
  const endPage = Math.min(totalPages, startPage + rangeSize - 1);

  return (
    <section className="w-full py-14 px-14 max-md:px-2 overflow-x-scroll">
      <div className="flex">
        <p className="font-normal text-lg border-b-[3px] border-indigo-500 text-slate-700 max-md:text-lg">
          Buscar clientes finalizados e imprimir comprobantes.
        </p>
      </div>

      <div className="border-slate-300 border-[1px] rounded-xl px-10 py-10 mt-10">
        <div className="mb-5">
          <button
            type="button"
            className="bg-black px-6 py-2 rounded-xl text-white shadow"
          >
            Descargar comprobante unico
          </button>
        </div>
        <div className="flex justify-between items-center py-2 px-4 border-slate-300 border-[1px] shadow rounded-xl w-1/4">
          <input
            value={clienteFilter}
            onChange={(e) => setClienteFilter(e.target.value)}
            type="text"
            className="outline-none text-slate-600 w-full"
            placeholder="Buscar el cliente en especifico"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-slate-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <div className="rounded-xl border-[1px] border-slate-300 shadow mt-10">
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="uppercase text-indigo-500">
                  <th className="text-left px-4 py-2 font-medium">Cliente</th>
                  <th className="text-left px-4 py-2 font-medium">Detalle</th>
                  <th className="text-left px-4 py-2 font-medium">Categoria</th>
                  <th className="text-left px-4 py-2 font-medium">
                    Cantidad Realizada
                  </th>
                  <th className="text-left px-4 py-2 font-medium">Color</th>

                  <th className="text-left px-4 py-2 font-medium">Estado</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {/* Mostrar datos directamente en la tabla */}
                {currentResults.map((producto) => (
                  <tr key={producto.id}>
                    <td className="text-left px-4 py-3 font-normal text-sm text-gray-900 uppercase">
                      {producto.cliente}
                    </td>
                    <td className="text-left px-4 py-3 font-normal text-sm text-gray-900 uppercase">
                      {producto.detalle}
                    </td>
                    <td className="text-left px-4 py-3 font-normal text-sm text-gray-900 uppercase">
                      {producto.categoria}
                    </td>
                    <td className="text-left px-4 py-3 font-normal text-sm text-gray-900 uppercase">
                      {producto.cantidadFaltante}
                    </td>
                    <td className="text-left px-4 py-3 font-normal text-sm text-gray-900 uppercase">
                      {producto.color}
                    </td>
                    <td className="text-left px-4 py-2 font-normal text-sm text-gray-900 uppercase flex">
                      {producto.cantidad === producto.cantidadFaltante ? (
                        <p className="bg-green-500 shadow rounded-xl px-4 py-1 font-semibold text-white">
                          Realizado
                        </p>
                      ) : (
                        <p className="bg-orange-500 shadow rounded-xl px-4 py-1 font-semibold text-white">
                          Pendiente
                        </p>
                      )}
                    </td>
                    {/* Agregar más celdas según sea necesario */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
              <button
                className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
                Anterior
              </button>
              {Array.from({ length: endPage - startPage + 1 }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === startPage + index
                        ? "bg-indigo-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                        : "bg-gray-100 shadow shadow-black/20 text-sm"
                    }`}
                    onClick={() => handlePageChange(startPage + index)}
                  >
                    {startPage + index}
                  </button>
                )
              )}
              <button
                className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
