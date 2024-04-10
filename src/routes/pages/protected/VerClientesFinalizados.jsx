import React, { useState } from "react";
import { usePedidoContext } from "../../../context/PedidoProvider";
import * as XLSX from "xlsx";

export const VerClientesFinalizados = () => {
  const { results } = usePedidoContext();

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

  const descargarExcel = () => {
    const wsData = currentResults.map((producto) => ({
      CLIENTE: producto.cliente.toUpperCase(),
      DETALLE: producto.detalle.toUpperCase(),
      CATEGORIA: producto.categoria.toUpperCase(),
      "CANTIDAD REALIZADA": producto.cantidadFaltante,
      COLOR: producto.color.toUpperCase(),
      ESTADO:
        producto.cantidad === producto.cantidadFaltante
          ? "REALIZADO"
          : "PENDIENTE",
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosPedidos");

    // Write the workbook to a file
    XLSX.writeFile(wb, "datos_pedidos.xlsx");
  };

  return (
    <section className="w-full py-20 px-4 max-md:py-6 max-md:px-2">
      <div className="flex max-md:px-4">
        <p className="uppercase font-normal text-lg border-b-[3px] border-indigo-500 text-slate-700 max-md:text-sm">
          Buscar clientes finalizados e imprimir comprobantes.
        </p>
      </div>

      <div className="mt-10 max-md:shadow-none max-md:border-none max-md:px-3">
        <div className="mb-5">
          <button
            onClick={descargarExcel}
            type="button"
            className="bg-black text-sm px-6 py-2 rounded-xl text-white shadow uppercase max-md:text-xs"
          >
            Descargar comprobante unico en excel
          </button>
        </div>
        <div className="max-md:w-full flex justify-between items-center py-2 px-4 border-slate-300 border-[1px] shadow rounded-xl w-1/4">
          <input
            value={clienteFilter}
            onChange={(e) => setClienteFilter(e.target.value)}
            type="text"
            className="outline-none text-slate-600 w-full uppercase text-sm"
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

        <div className="cursor-pointer mt-5 ">
          <div className="grid grid-cols-5 gap-4 mb-10">
            {currentResults.map((c) => (
              <div className="border-slate-200 border-[1px] rounded-2xl hover:shadow-md transition-all ease-linear py-5 px-5">
                <div className="flex flex-col gap-1">
                  <p className="uppercase text-sm font-bold text-slate-700">
                    CLIENTE <span className="font-normal">{c.cliente}</span>
                  </p>

                  <p className="uppercase text-sm font-bold text-slate-700">
                    CATEGORIA DE LAS ABERTURAS{" "}
                    <span className="font-normal">{c.categoria}</span>
                  </p>

                  <p className="uppercase text-sm font-bold text-slate-700">
                    DETALLE <span className="font-normal">{c.detalle}</span>
                  </p>
                  <p className="uppercase text-sm font-bold text-slate-700">
                    ANCHOXALTO{" "}
                    <span className="font-normal">
                      {c.ancho}x{c.alto}
                    </span>
                  </p>
                  <p className="uppercase text-sm font-bold text-slate-700">
                    CANTIDAD <span className="font-normal">{c.cantidad}</span>
                  </p>
                  <p className="uppercase text-sm font-bold text-slate-700">
                    CANTIDAD REALIZADA{" "}
                    <span className="font-normal">{c.cantidadFaltante}</span>
                  </p>

                  <div className="flex mt-1 justify-end">
                    <p
                      className={`${
                        c.cantidad === c.cantidadFaltante
                          ? "bg-green-100 text-green-700"
                          : "text-orange-700 bg-orange-100"
                      } py-1.5 px-4 rounded-xl text-sm shadow-md shadow-gray-300`}
                    >
                      {c.cantidad === c.cantidadFaltante ? (
                        <span className="flex gap-2 items-center">
                          FINALIZADA
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          PENDIENTE{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                            />
                          </svg>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
              <button
                className="mx-1 px-2 py-2 rounded-xl border-[1px] border-slate-300 shadow shadow-black/20 text-sm flex gap-1 items-center"
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
              </button>
              {Array.from({ length: endPage - startPage + 1 }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`mx-1 px-3 py-1 rounded-xl ${
                      currentPage === startPage + index
                        ? "bg-green-500 transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                        : "bg-white border-[1px] border-slate-300 shadow shadow-black/20 text-sm"
                    }`}
                    onClick={() => handlePageChange(startPage + index)}
                  >
                    {startPage + index}
                  </button>
                )
              )}
              <button
                className="mx-1 px-2 py-2 rounded-xl border-[1px] border-slate-300 shadow shadow-black/20 text-sm flex gap-1 items-center"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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
