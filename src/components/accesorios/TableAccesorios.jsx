import { useState } from "react";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { ModalEliminarAccesorio } from "./ModalEliminarAccesorio";
import { CrearNuevaEntrada } from "./CrearNuevaEntrada";
import { ModalNuevaSalida } from "./ModalNuevaSalida";
import XLSX from "xlsx";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { RiEditCircleFill } from "react-icons/ri";

export const TableAccesorios = ({
  openModalEditar,
  handlePerfilSeleccionado,
  results,
  openModalEditarDos,
}) => {
  const { handleEliminar } = useAccesoriosContext();

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);
  const [guardarId, setGuardarId] = useState(false);

  const handleBorrarAccesorioOpen = () => {
    setOpenBorrarAccesorio(true);
  };

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
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

  const [obtenerId, setObtenerId] = useState(null);

  const handleId = (id) => setObtenerId(id);

  const [isOpenEntrada, setIsOpenEntrada] = useState(false);
  const openEntrada = () => setIsOpenEntrada(true);
  const closeEntrada = () => setIsOpenEntrada(false);

  const [isOpenSalida, setIsOpenSalida] = useState(false);
  const openSalida = () => setIsOpenSalida(true);
  const closeSalida = () => setIsOpenSalida(false);

  const handleDescargarExcel = () => {
    const dataToExport = results.map((item) => ({
      CODIGO: item.nombre.toUpperCase(),
      DESCRIPCION: item.descripcion.toUpperCase(),
      STOCK: item.stock,
      CATEGORIAS: item.categoria.toUpperCase(),
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    XLSX.writeFile(wb, "accesorios_stock_datos.xlsx");
  };

  return (
    <div className="max-md:py-2">
      <div className="rounded-xl shadow-xl md:block bg-white max-md:overflow-x-auto scrollbar-hidden">
        <table className="w-full uppercase divide-y-[1px] divide-slate-300 table">
          <thead>
            <tr>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Codigo
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Detalle
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Stock
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Stock Minimo
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Entradas
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Salidas
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Categoria
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Acciones
              </th>
              <th className="py-6 px-3 text-sm font-bold text-indigo-600">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {currentResults?.map((p) => (
              <tr
                className="cursor-pointer hover:bg-slate-100 transition-all"
                key={p.id}
              >
                <th className="py-4 text-sm max-md:p-2 max-md:text-sm">
                  {p.nombre}
                </th>
                <th className="py-4 text-sm max-md:p-2 max-md:text-sm">
                  {p.descripcion}
                </th>
                <th
                  className={`${
                    Number(p.stock_minimo) > Number(p.stock)
                      ? "text-red-600 font-bold"
                      : "text-green-500 font-bold"
                  } py-4 text-sm max-md:p-2 max-md:text-sm`}
                >
                  {p.stock}
                </th>
                <th className={`py-4 text-sm max-md:p-2 max-md:text-sm`}>
                  {p.stock_minimo}
                </th>
                <th
                  className={`text-indigo-500 py-4 text-sm max-md:p-2 max-md:text-sm`}
                >
                  +{p.entrada}
                </th>
                <th className={`py-4 text-sm max-md:p-2 max-md:text-sm`}>
                  {p.salida}
                </th>
                <th className="py-4 text-sm max-md:p-2 max-md:text-sm">
                  {p.categoria}
                </th>

                <th className="py-4 flex px-4">
                  <p
                    className={`${
                      Number(p.stock_minimo) > Number(p.stock)
                        ? "bg-red-500/20 text-red-800 rounded-xl text-sm py-2 px-2"
                        : "bg-green-500 text-white rounded-xl text-sm py-2 px-2"
                    }`}
                  >
                    {Number(p.stock_minimo) > Number(p.stock)
                      ? "pedir"
                      : "mucho stock"}
                  </p>
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
                          onClick={() => {
                            openModalEditar(), handlePerfilSeleccionado(p.id);
                          }}
                          className="
                          hover:bg-indigo-500 hover:text-white
                          bg-indigo-500/10 text-indigo-700 py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                        >
                          Editar
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handlePerfilSeleccionado(p.id),
                              openModalEditarDos();
                          }}
                          className="
                          hover:bg-slate-200 hover:text-slate-700
                          bg-slate-700 text-white py-2 px-5 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                        >
                          Editar stock
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            openEntrada(), handleId(p.id);
                          }}
                          className="
                          hover:bg-indigo-100 hover:text-indigo-500
                          bg-indigo-500 text-white py-2 px-5 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                        >
                          Nueva entrada
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            openSalida(), handleId(p.id);
                          }}
                          className="
                          hover:bg-green-100 hover:text-green-700
                          bg-green-600 text-white py-2 px-5 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                        >
                          Crear salida
                        </button>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        <ModalEliminarAccesorio
          p={guardarId}
          handleEliminar={handleEliminar}
          openBorrarAccesorio={openBorrarAccesorio}
          handleBorrarAccesorioClose={handleBorrarAccesorioClose}
        />
      </div>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
          <button
            className="mx-1 px-3 py-2 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
                        ? "bg-green-500 text-white transition-all border-[1px] border-green-500 ease-in-out shadow shadow-black/20 text-sm"
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
            className="mx-1 px-3 py-2 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
        className="bg-green-500/90 text-white hover:shadow-md hover:shadow-gray-350 transition-all ease-linear uppercase rounded-full py-2.5 px-6 font-semibold shadow mt-10 max-md:hidden md:block text-sm"
        onClick={handleDescargarExcel}
      >
        Descargar excel accesorios
      </button>
    </div>
  );
};
