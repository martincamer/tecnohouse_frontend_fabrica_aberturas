import { Link } from "react-router-dom";
import { usePedidoContext } from "../../context/PedidoProvider";
import { useEffect, useState } from "react";
import { ModalEliminarPedido } from "./ModalEliminarPedido";
import { ModalVerClientes } from "./ModalVerClientes";

export const TablePedidos = ({ datosMensuales, resultadoFiltrados }) => {
  const { handleDeletePresupuesto } = usePedidoContext();

  useEffect(() => {
    setClickStates(datosMensuales.map(() => true));
    setTimeout(() => {
      setClickStates(datosMensuales.map(() => false));
    }, 100);
  }, [datosMensuales]);

  const [clickStates, setClickStates] = useState(
    datosMensuales.map(() => false)
  );

  const handleToggleClick = (index) => {
    setClickStates((prevClickStates) =>
      prevClickStates.map((state, i) => (i === index ? !state : state))
    );
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentResults = datosMensuales?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(datosMensuales?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [isClientes, setIsClientes] = useState(false);
  const [obtenerId, setObtenerId] = useState(null);

  const openClientes = () => {
    setIsClientes(true);
  };

  const closeClientes = () => {
    setIsClientes(false);
  };

  const handleID = (id) => {
    setObtenerId(id);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 max-md:flex md:hidden">
        {resultadoFiltrados.map((p, index) => (
          <div
            className="border-slate-300 border-[1px] shadow rounded-xl py-3 px-2 flex justify-between items-center"
            key={p.id}
          >
            <div className="w-full">
              <p className="font-bold text-slate-700 text-xs">{p.id}</p>
              <p className="font-bold text-slate-700 text-xs uppercase">
                - Cliente: <span className="font-normal">{p.cliente}</span>
              </p>
              <p className="font-bold text-slate-700 text-xs">
                CLIENTES DEL PEDIDO:{" "}
                <div className="flex my-3">
                  <button
                    onClick={() => {
                      handleID(p?.id), openClientes();
                    }}
                    type="button"
                    className="bg-indigo-100 text-indigo-600 py-2 px-4 rounded-xl flex gap-2 items-center max-md:text-xs"
                  >
                    VER CLIENTES
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
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </button>
                </div>
              </p>
              <p className="mb-2 mt-2">
                <Link
                  to={`/pedido/${p?.id}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  className="bg-indigo-500 py-2 px-6 text-white rounded-xl text-sm cursor-pointer max-md:text-xs uppercase"
                >
                  Ver pedido
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl shadow-xl md:block bg-white max-md:overflow-x-auto scrollbar-hidden">
        <table className="w-full uppercase divide-y-[1px] divide-slate-300 table">
          <thead>
            <tr>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Numero/Pedido
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Cliente
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Total aberturas
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Clientes
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Fecha de creación
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Eliminar
              </th>
              <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                Ver pedido
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-left">
            {currentResults?.map((p) => (
              <tr
                key={p.id}
                className="cursor-pointer hover:bg-slate-100 transition-all"
              >
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p?.id}
                </th>
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                  {p?.cliente}
                </th>
                <th className="py-3 px-3 text-sm text-left uppercase font-bold">
                  <span className="bg-green-500/90 text-white py-2 px-4 shadow-md rounded-xl">
                    {p?.productos.respuesta.reduce((sum, b) => {
                      return sum + Number(b?.cantidad);
                    }, 0)}
                  </span>
                </th>
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  <div className="flex">
                    <button
                      onClick={() => {
                        handleID(p?.id), openClientes();
                      }}
                      type="button"
                      className="bg-indigo-100 text-indigo-600 py-2 px-6 rounded-full flex gap-2 items-center"
                    >
                      VER CLIENTES
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
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
                <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {new Date(p?.created_at).toLocaleDateString("es-AR")}
                </th>

                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  <button
                    className="bg-red-500 uppercase py-2.5 px-6 font-bold text-white rounded-full text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                    onClick={() => {
                      handleBorrarAccesorioOpen(), setGuardarId(p.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>

                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <div className="flex">
                    <Link
                      to={`/pedido/${p?.id}`}
                      // target="_blank"
                      // rel="noopener noreferrer"
                      className="bg-indigo-500 uppercase py-2 px-6 text-white rounded-full font-bold text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs flex gap-2 items-center"
                    >
                      Ver pedido
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
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalEliminarPedido
          p={guardarId}
          handleEliminar={handleDeletePresupuesto}
          openBorrarAccesorio={openBorrarAccesorio}
          handleBorrarAccesorioClose={handleBorrarAccesorioClose}
        />
        <ModalVerClientes
          obtenerId={obtenerId}
          isOpen={isClientes}
          closeModal={closeClientes}
        />
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
  );
};
