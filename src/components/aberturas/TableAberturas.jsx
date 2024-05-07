import { useAberturasContext } from "../../context/AluminioAberturas";
import { ModalEditaStock } from "./ModalEditarStock";
import { ModalEliminarAberturas } from "./ModalEliminarAbertura";
import { useState } from "react";
import { ModalNuevaSalida } from "./ModalNuevaSalida";
import { CrearNuevaEntrada } from "./CrearNuevaEntrada";
import XLSX from "xlsx";

export const TableAberturas = ({
  results,
  openModalEditar,
  handlePerfilSeleccionado,
}) => {
  const { handleEliminar } = useAberturasContext();

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);
  const [openModalEditarStock, setOpenModalEditarStock] = useState(false);
  const [guardarId, setGuardarId] = useState(false);

  const [obtenerId, setObtenerId] = useState(null);

  const handleId = (id) => setObtenerId(id);

  const [isOpenEntrada, setIsOpenEntrada] = useState(false);
  const openEntrada = () => setIsOpenEntrada(true);
  const closeEntrada = () => setIsOpenEntrada(false);

  const [isOpenSalida, setIsOpenSalida] = useState(false);
  const openSalida = () => setIsOpenSalida(true);
  const closeSalida = () => setIsOpenSalida(false);

  const handleBorrarAccesorioOpen = () => {
    setOpenBorrarAccesorio(true);
  };

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
  };

  const handleModalEditarStockOpen = () => {
    setOpenModalEditarStock(true);
  };

  const handleModalEditarStockClose = () => {
    setOpenModalEditarStock(false);
  };
  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar primero los elementos con stock mayor que 0 y luego los que tienen stock menor o igual a 0
  const filteredResults = results
    ?.filter((p) => p.stock > 0)
    .concat(results?.filter((p) => p.stock <= 0));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calcular el total de páginas basado en los resultados filtrados
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDescargarExcel = () => {
    // Filtrar las aberturas con stock mayor que 0
    const aberturasConStock = results.filter((abertura) => abertura.stock > 0);

    // Mapear los datos a un formato adecuado para el archivo Excel
    const dataToExport = aberturasConStock.map((abertura) => ({
      DETALLE: abertura.descripcion,
      CATEGORIA: abertura.categoria,
      COLOR: abertura.color,
      "ANCHO X ALTO": `${abertura.ancho} x ${abertura.alto}`,
      "STOCK CARGADO": abertura.stock,
    }));

    // Crear el libro de trabajo
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    // Escribir el archivo Excel y descargarlo
    XLSX.writeFile(wb, "datos.xlsx");
  };

  return (
    <div className="max-md:py-2">
      <div className="rounded-xl shadow-xl md:block bg-white max-md:overflow-x-auto scrollbar-hidden">
        <table className="w-full uppercase divide-y-[1px] divide-slate-300 table">
          <thead>
            <tr>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Descripción
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Categoria
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Color
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Ancho x Alto
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Stock/fabrica
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-left">
            {currentResults.map((p) => (
              <tr
                key={p.id}
                className="cursor-pointer hover:bg-slate-100 transition-all"
              >
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.descripcion}
                </th>
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.categoria}
                </th>
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.color}
                </th>
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.ancho}x{p.alto}
                </th>
                <th
                  className={`py-3 px-3 text-sm text-left ${
                    p.stock > 0 ? "text-green-500" : "text-red-800"
                  } font-bold uppercase`}
                >
                  {p.stock}
                </th>
                <th>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="hover:bg-indigo-500 hover:text-white py-3 px-3 rounded-full transition-all"
                    >
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
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow-xl border border-gray-300 bg-base-100 rounded-box w-52 gap-2"
                    >
                      <li>
                        <button
                          className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-700 py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                          onClick={() => {
                            handleBorrarAccesorioOpen(), setGuardarId(p.id);
                          }}
                        >
                          Eliminar
                        </button>
                      </li>
                      <li>
                        <button
                          className="bg-indigo-500/10 hover:bg-indigo-500 hover:text-white text-indigo-700 py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                          onClick={() => {
                            openModalEditar(), handlePerfilSeleccionado(p.id);
                          }}
                        >
                          Editar
                        </button>
                      </li>
                      <li>
                        <button
                          className="bg-green-500/10 hover:bg-green-500 hover:text-white text-green-700 py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                          onClick={() => {
                            handleModalEditarStockOpen(),
                              handlePerfilSeleccionado(p.id);
                          }}
                        >
                          Editar stock
                        </button>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
      <ModalEliminarAberturas
        p={guardarId}
        handleEliminar={handleEliminar}
        openBorrarAccesorio={openBorrarAccesorio}
        handleBorrarAccesorioClose={handleBorrarAccesorioClose}
      />
      <ModalEditaStock
        closeModalEditar={handleModalEditarStockClose}
        isOpenEditar={openModalEditarStock}
        p={guardarId}
      />
      <CrearNuevaEntrada
        isOpenEntrada={isOpenEntrada}
        closeOpenEntrada={closeEntrada}
        obtenerId={obtenerId}
      />
      <ModalNuevaSalida
        isOpenEntrada={isOpenSalida}
        closeOpenEntrada={closeSalida}
        obtenerId={obtenerId}
      />
      <button
        className="bg-green-500/90 rounded-full shadow hover:shadow-gray-400/50 py-2.5 px-6 font-semibold text-white mt-10 uppercase max-md:hidden text-sm transition-all ease-in-out"
        onClick={handleDescargarExcel}
      >
        Descargar aberturas en stock formato Excel
      </button>{" "}
    </div>
  );
};
