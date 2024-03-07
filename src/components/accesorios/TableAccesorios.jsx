import { useState } from "react";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { ModalEliminarAccesorio } from "./ModalEliminarAccesorio";

export const TableAccesorios = ({
  openModalEditar,
  handlePerfilSeleccionado,
  resultadosFiltrados,
  results,
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className=" rounded shadow-black/10 shadow max-md:shadow-none max-md:flex-none flex flex-col gap-3 w-full">
      <table className="border-[1px] border-gray-200  p-[5px] w-full rounded uppercase">
        <thead>
          <tr>
            {/* <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              ID
            </th> */}
            <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              Codigo
            </th>
            <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              Stock
            </th>
            <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              Categoria
            </th>
            <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              Color
            </th>
            <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              Detalle
            </th>
            <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              Eliminar
            </th>
            <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
              Editar
            </th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((p) => (
            <tr
              className="hover:bg-slate-100 transition-all ease-in-out duration-100 cursor-pointer"
              key={p.id}
            >
              {/* <th className="border-b-[1px] border-gray-300 py-4 font-normal text-sm max-md:p-2 border-b-b-[1px] max-md:text-sm">
                {p.id}
              </th> */}
              <th className="border-b-[1px] border-gray-300 py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                {p.nombre}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                {p.stock}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                {p.categoria}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                {p.color}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                {p.descripcion}
              </th>

              <th className="border-b-[1px] border-gray-300 py-4 font-bold max-md:p-2">
                <button
                  className="bg-red-500/10 border-[1px] border-red-500 text-red-600 py-1 px-2 rounded font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm"
                  onClick={() => {
                    handleBorrarAccesorioOpen(), setGuardarId(p.id);
                  }}
                >
                  eliminar
                </button>
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-bold  max-md:p-2">
                <button
                  onClick={() => {
                    openModalEditar(), handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-indigo-500/10 border-[1px] border-indigo-500 text-indigo-600 py-1 px-2 rounded font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm"
                >
                  editar
                </button>
              </th>
            </tr>
          ))}
          <ModalEliminarAccesorio
            p={guardarId}
            handleEliminar={handleEliminar}
            openBorrarAccesorio={openBorrarAccesorio}
            handleBorrarAccesorioClose={handleBorrarAccesorioClose}
          />
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-3">
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
  );
};
