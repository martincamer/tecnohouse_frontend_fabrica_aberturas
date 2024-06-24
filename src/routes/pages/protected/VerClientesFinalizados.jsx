import React, { useEffect, useState } from "react";
import { usePedidoContext } from "../../../context/PedidoProvider";
import * as XLSX from "xlsx";

export const VerClientesFinalizados = () => {
  const { results } = usePedidoContext();

  const agruparPorCliente = (pedidos) => {
    // Crear un objeto para agrupar por cliente
    const agrupadoPorCliente = {};

    pedidos.forEach((pedido) => {
      pedido.productos.respuesta.forEach((producto) => {
        const cliente = producto.cliente.toUpperCase(); // Normalizar el cliente a mayúsculas

        if (!agrupadoPorCliente[cliente]) {
          // Si no existe el cliente, inicializarlo como un arreglo de productos
          agrupadoPorCliente[cliente] = {
            fabrica: pedido.cliente, // Agregar la fábrica al cliente
            productos: [],
          };
        }

        // Agregar el producto al cliente correspondiente
        agrupadoPorCliente[cliente].productos.push(producto);
      });
    });

    // Convertir el objeto a un arreglo de clientes con productos
    const arregloAgrupado = Object.entries(agrupadoPorCliente).map(
      ([cliente, datos]) => ({
        fabrica: datos.fabrica,
        cliente, // Nombre del cliente
        productos: datos.productos, // Productos asociados al cliente
      })
    );

    return arregloAgrupado; // Retornar el arreglo agrupado por cliente
  };

  // Agrupar por cliente
  const clientesAgrupados = agruparPorCliente(results);

  const [clienteFilter, setClienteFilter] = useState("");

  // Filtrar clientes por el nombre ingresado en `clienteFilter`
  const clientesFiltrados = clientesAgrupados.filter(
    (cliente) =>
      cliente.cliente.toLowerCase().includes(clienteFilter.toLowerCase()) ||
      cliente.fabrica.toLowerCase().includes(clienteFilter.toLowerCase())
  );

  // Paginación
  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentResults = clientesFiltrados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Cambiar la página actual
  };

  const rangeSize = 5;

  const startPage = Math.max(1, currentPage - Math.floor(rangeSize / 2));
  const endPage = Math.min(totalPages, startPage + rangeSize - 1);

  const descargarExcel = () => {
    const wsData = currentResults.map((producto) => ({
      "FABRICA/SUCURSAL": producto.fabrica.toUpperCase(),
      CLIENTE: producto.cliente.toUpperCase(),
      DETALLE: producto.detalle.toUpperCase(),
      CATEGORIA: producto.categoria.toUpperCase(),
      COLOR: producto.color.toUpperCase(),
      "CANTIDAD/ENTREGADA": producto.cantidad,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosPedidos");

    // Write the workbook to a file
    XLSX.writeFile(wb, "datos_pedidos.xlsx");
  };

  return (
    <section className="w-full py-2 px-10 max-md:px-5">
      <div className="mt-5">
        <p className="font-bold text-2xl text-slate-600 max-md:text-lg max-md:text-center">
          Bienvenido a la parte de clientes finalizados/entregados 🖐️🚀.
        </p>
      </div>
      <div className="mt-5 max-md:shadow-none max-md:border-none">
        <div className="mb-5 max-md:text-center">
          <button
            onClick={descargarExcel}
            type="button"
            className="bg-indigo-500 font-bold text-sm px-6 py-2.5 rounded-full text-white shadow uppercase max-md:text-xs"
          >
            Descargar comprobante unico en excel
          </button>
        </div>
        <div className="max-md:w-full flex justify-between items-center py-2 px-4 font-bold shadow-xl bg-white rounded-full w-1/4">
          <input
            value={clienteFilter}
            onChange={(e) => setClienteFilter(e.target.value)}
            type="text"
            className="outline-none text-slate-600 w-full uppercase text-sm"
            placeholder="Buscar el cliente en especifico o fabrica/sucursal"
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
          <div className="grid grid-cols-5 gap-4 mb-10 max-md:grid-cols-1">
            {currentResults?.map((c) => (
              <div className="border-slate-200 bg-white rounded-xl hover:shadow-md shadow-xl transition-all ease-linear py-5 px-5">
                <div className="flex flex-col gap-1">
                  <p className="uppercase text-sm font-bold text-slate-700">
                    CLIENTE <span className="font-normal">{c.cliente}</span>
                  </p>
                  <p className="uppercase text-sm font-bold text-slate-700">
                    FABRICA/SUC{" "}
                    <span className="font-bold text-indigo-500">
                      {c.fabrica}
                    </span>
                  </p>
                </div>

                <div className="mt-2">
                  <p className="font-bold text-sm uppercase text-center underline">
                    Aberturas entregadas
                  </p>
                  <div className="flex flex-col gap-2 mt-2 overflow-y-scroll px-2 scroll-bar h-[20vh]">
                    {c?.productos?.map((producto) => (
                      <div
                        className="border-slate-200 border py-1 px-1 rounded"
                        key={producto.id}
                      >
                        <p className="text-sm font-bold uppercase">
                          Desc.{" "}
                          <span className="font-medium">
                            {producto.detalle}
                          </span>
                        </p>
                        <p className="text-sm font-bold uppercase">
                          Cat.{" "}
                          <span className="font-medium">
                            {producto.categoria}
                          </span>
                        </p>
                        <p className="text-sm font-bold uppercase">
                          Col.{" "}
                          <span className="font-medium">{producto.color}</span>
                        </p>
                        <p className="text-sm font-bold uppercase">
                          AnchoxAlto.{" "}
                          <span className="font-medium">
                            {producto.ancho}x{producto.alto}
                          </span>
                        </p>
                        <p className="text-sm font-bold uppercase">
                          Cant.{" "}
                          <span className="font-medium">
                            {producto.cantidad}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1 font-bold">
              <button
                className="mx-1 px-2 py-1 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
              {(() => {
                // Determina el rango de páginas visibles
                const maxVisiblePages = 2; // Máximo de páginas a mostrar
                const halfRange = Math.floor(maxVisiblePages / 2);

                let startPage = Math.max(currentPage - halfRange, 1);
                let endPage = Math.min(currentPage + halfRange, totalPages);

                // Asegúrate de que el rango tenga 5 elementos
                if (endPage - startPage < maxVisiblePages - 1) {
                  if (startPage === 1) {
                    endPage = Math.min(maxVisiblePages, totalPages);
                  } else if (endPage === totalPages) {
                    startPage = Math.max(totalPages - (maxVisiblePages - 1), 1);
                  }
                }

                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, index) => {
                    const pageIndex = startPage + index;
                    return (
                      <button
                        key={pageIndex}
                        className={`mx-1 px-3 py-1 rounded-xl ${
                          currentPage === pageIndex
                            ? "bg-indigo-500 text-white transition-all border-[1px] border-indigo-500 ease-in-out shadow shadow-black/20 text-sm"
                            : "bg-white border-slate-300 border-[1px] shadow shadow-black/20 text-sm"
                        }`}
                        onClick={() => handlePageChange(pageIndex)}
                      >
                        {pageIndex}
                      </button>
                    );
                  }
                );
              })()}

              <button
                className="mx-1 px-2 py-1 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
