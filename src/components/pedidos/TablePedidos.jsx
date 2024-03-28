import { Link } from "react-router-dom";
import { usePedidoContext } from "../../context/PedidoProvider";
import { useEffect, useState } from "react";
import { ModalEliminarPedido } from "./ModalEliminarPedido";
import { IoCloseCircle } from "react-icons/io5";

export const TablePedidos = ({ datosMensuales, resultadoFiltrados }) => {
  const { handleDeletePresupuesto, results } = usePedidoContext();

  useEffect(() => {
    setClickStates(results.map(() => true));
    setTimeout(() => {
      setClickStates(results.map(() => false));
    }, 100);
  }, [results]);

  const [clickStates, setClickStates] = useState(results.map(() => false));

  const handleToggleClick = (index) => {
    setClickStates((prevClickStates) =>
      prevClickStates.map((state, i) => (i === index ? !state : state))
    );
  };

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
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

  return (
    <div>
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
              <p className="font-bold text-slate-700 text-xs uppercase">
                Linea: <span className="font-normal">{p.detalle}</span>
              </p>

              <p className="font-bold text-slate-700 text-xs">
                CLIENTES DEL PEDIDO:{" "}
                <div
                  onClick={() => handleToggleClick(index)}
                  className={`py-2 px-2 text-xs text-left text-slate-700 uppercase`}
                >
                  {!clickStates[index] ? (
                    <p className="p-3 border-slate-300 border-[1px] rounded-xl shadow cursor-pointer text-center">
                      VER CLIENTE - CLICK
                    </p>
                  ) : (
                    <div className="relative">
                      <div className="absolute top-0 right-3 cursor-pointer">
                        <IoCloseCircle className="text-2xl text-red-500 border-red-800 border-[1px] rounded-full" />
                      </div>
                      {Array.from(
                        new Set(
                          p?.productos?.respuesta?.map((item) => item.cliente)
                        )
                      ).map((uniqueClient, i) => {
                        const hasF = p?.productos?.respuesta?.some(
                          (item) =>
                            item.cliente === uniqueClient &&
                            item.cantidad !== item.cantidadFaltante
                        );

                        return (
                          <div className="pt-3 cursor-pointer" key={i}>
                            {i > 0 ? " - " : ""}
                            {uniqueClient}
                            <span className="font-bold text-xs underline text-red-500 mx-1">
                              {hasF && "FALTA REALIZAR"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </p>
              <p className="mb-2 mt-2">
                <Link
                  to={`/pedido/${p?.id}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  className="bg-indigo-500 py-2 px-6 text-white rounded-xl text-sm cursor-pointer max-md:text-sm"
                >
                  Ver pedido
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5 md:block max-md:hidden">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Numero
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Cliente
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Detalle de linea - categoria
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Total aberturas
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Clientes
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Fecha de creación
              </th>
              {/* <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">Remito</th> */}
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Estado del pedido
              </th>{" "}
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Eliminar
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Ver pedido
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-left">
            {resultadoFiltrados?.map((p, index) => (
              <tr
                key={p.id}
                className="hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer"
              >
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p?.id}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p?.cliente}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p?.detalle}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p?.productos.respuesta.reduce((sum, b) => {
                    return sum + Number(b?.cantidad);
                  }, 0)}
                </td>
                <td
                  onClick={() => handleToggleClick(index)}
                  className="py-3 px-3 text-sm text-left text-slate-700 uppercase"
                >
                  {!clickStates[index] ? (
                    <p className="p-3 border-slate-300 border-[1px] rounded-xl shadow cursor-pointer text-center">
                      VER CLIENTE - CLICK
                    </p>
                  ) : (
                    <div className="relative">
                      <div className="absolute top-0 right-3 cursor-pointer">
                        <IoCloseCircle className="text-2xl text-red-500 border-red-800 border-[1px] rounded-full" />
                      </div>
                      {Array.from(
                        new Set(
                          p?.productos?.respuesta?.map((item) => item.cliente)
                        )
                      ).map((uniqueClient, i) => {
                        const hasF = p?.productos?.respuesta?.some(
                          (item) =>
                            item.cliente === uniqueClient &&
                            item.cantidad !== item.cantidadFaltante
                        );

                        return (
                          <div className="pt-3 cursor-pointer" key={i}>
                            {i > 0 ? " - " : ""}
                            {uniqueClient}
                            <span className="font-bold underline text-red-500 mx-1">
                              {hasF && "FALTA REALIZAR"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {new Date(p?.created_at).toLocaleDateString("es-AR")}
                </td>
                <th
                  className={`font-bold max-md:text-xs text-sm uppercase rounded-lg text-center`}
                >
                  {p?.productos.respuesta.reduce((sum, b) => {
                    return sum + Number(b?.cantidad);
                  }, 0) ===
                  p?.productos.respuesta.reduce((sum, b) => {
                    return sum + Number(b?.cantidadFaltante);
                  }, 0) ? (
                    <p className="bg-green-500 text-white py-3 rounded-xl">
                      realizado
                    </p>
                  ) : (
                    <p className="bg-orange-500 text-white py-3 rounded-xl">
                      pendiente
                    </p>
                  )}
                </th>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  <button
                    className="bg-red-500/10 border-red-200 border-[1px] py-2 px-4 text-red-500 rounded-xl text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                    onClick={() => {
                      handleBorrarAccesorioOpen(), setGuardarId(p.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>

                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <Link
                    to={`/pedido/${p?.id}`}
                    // target="_blank"
                    // rel="noopener noreferrer"
                    className="bg-indigo-600/10 border-indigo-300 border-[1px] py-2 px-4 text-indigo-600 rounded-xl text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                  >
                    Ver pedido
                  </Link>
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
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                    : "bg-gray-100 shadow shadow-black/20 text-sm"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
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
  );
};
