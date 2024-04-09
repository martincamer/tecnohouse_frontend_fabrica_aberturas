import { useState } from "react";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { ModalEliminarAccesorio } from "./ModalEliminarAccesorio";
import { CrearNuevaEntrada } from "./CrearNuevaEntrada";
import { ModalNuevaSalida } from "./ModalNuevaSalida";
import XLSX from "xlsx";

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
    <div>
      <div className=" flex flex-col gap-3 max-md:flex md:hidden">
        {currentResults.map((p) => (
          <div
            className="border-slate-300 border-[1px] shadow rounded-xl py-3 px-2 flex justify-between items-center"
            key={p.id}
          >
            <div className="w-full">
              <p className="font-bold text-slate-700 text-xs">{p.id}</p>
              <p className="font-bold text-slate-700 text-xs uppercase">
                - {p.descripcion}
              </p>
              <p className="font-bold text-slate-700 text-xs">
                STOCK:{" "}
                <span
                  className={`${
                    p.stock_minimo > p.stock ? "text-red-600" : "text-green-500"
                  } text-xs`}
                >
                  {p.stock}
                </span>
              </p>
              <p className="font-bold text-slate-700 text-xs">
                STOCK MIN: <span className="font-normal">{p.stock_minimo}</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full  h-[70px] overflow-y-scroll">
              <button
                className="bg-red-500/10 text-red-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  handleBorrarAccesorioOpen(), setGuardarId(p.id);
                }}
              >
                Eliminar
              </button>

              <button
                className="bg-black/10 text-black-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  openModalEditar(), handlePerfilSeleccionado(p.id);
                }}
              >
                Editar
              </button>

              <button
                className="bg-indigo-500/10 text-indigo-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  openSalida(), handleId(p.id);
                }}
              >
                Crear Salida
              </button>

              <button
                className="bg-indigo-500/10 text-indigo-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  openEntrada(), handleId(p.id);
                }}
              >
                Crear Entrada
              </button>

              <button
                className="bg-black text-white uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  handlePerfilSeleccionado(p.id), openModalEditarDos();
                }}
              >
                Editar Stock
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-[1px] border-slate-300 rounded-2xl  max-md:hidden md:block hover:shadow-md transition-all ease-linear ">
        <table className="  p-[5px] w-full  uppercase">
          <thead>
            <tr>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Codigo
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Detalle
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Stock
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Stock Minimo
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Entradas
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Salidas
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Categoria
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Color
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Eliminar
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Editar
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Nueva entrada
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Editar stock
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Nueva salida
              </th>
              <th className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {currentResults?.map((p) => (
              <tr className="cursor-pointer" key={p.id}>
                <th className="py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                  {p.nombre}
                </th>
                <th className="py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
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
                <th
                  className={`py-4 font-normal text-sm max-md:p-2 max-md:text-sm`}
                >
                  {p.stock_minimo}
                </th>
                <th
                  className={`text-indigo-500 font-bold py-4 text-sm max-md:p-2 max-md:text-sm`}
                >
                  +{p.entrada}
                </th>
                <th
                  className={`py-4 font-normal text-sm max-md:p-2 max-md:text-sm`}
                >
                  {p.salida}
                </th>
                <th className="py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                  {p.categoria}
                </th>
                <th className="py-4 font-normal text-sm max-md:p-2 max-md:text-sm">
                  {p.color}
                </th>

                <th className="py-4 font-normal max-md:p-2">
                  <button
                    className="bg-red-500/10 text-red-700 py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                    onClick={() => {
                      handleBorrarAccesorioOpen(), setGuardarId(p.id);
                    }}
                  >
                    Eliminar
                  </button>
                </th>
                <th className="py-4 font-normal  max-md:p-2">
                  <button
                    onClick={() => {
                      openModalEditar(), handlePerfilSeleccionado(p.id);
                    }}
                    className="bg-indigo-500/10 text-indigo-700 py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                  >
                    Editar
                  </button>
                </th>

                <th className="py-4 font-normal  max-md:p-2">
                  <button
                    onClick={() => {
                      openEntrada(), handleId(p.id);
                    }}
                    className="bg-indigo-500 text-white py-2 px-5 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                  >
                    Nueva entrada
                  </button>
                </th>
                <th className="py-4 font-normal  max-md:p-2">
                  <button
                    onClick={() => {
                      handlePerfilSeleccionado(p.id), openModalEditarDos();
                    }}
                    className="bg-slate-700 text-white py-2 px-5 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                  >
                    Editar stock
                  </button>
                </th>
                <th className="py-4 font-normal  max-md:p-2">
                  <button
                    onClick={() => {
                      openSalida(), handleId(p.id);
                    }}
                    className="bg-green-600 text-white py-2 px-5 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal text-sm uppercase"
                  >
                    Crear salida
                  </button>
                </th>
                <th className="py-4 font-normal  px-4">
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
        className="bg-green-100 text-green-700 hover:shadow-md hover:shadow-gray-350 transition-all ease-linear uppercase rounded-xl py-2 px-6 shadow mt-10 max-md:hidden md:block text-sm"
        onClick={handleDescargarExcel}
      >
        Descargar excel accesorios
      </button>
    </div>
  );
};
