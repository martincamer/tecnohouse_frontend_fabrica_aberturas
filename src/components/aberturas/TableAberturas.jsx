import { useAberturasContext } from "../../context/AluminioAberturas";
import { ModalEditaStock } from "./ModalEditarStock";
import { ModalEliminarAberturas } from "./ModalEliminarAbertura";
import { useState } from "react";
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDescargarExcel = () => {
    // Filtrar las aberturas con stock mayor que 0
    const aberturasConStock = results.filter((abertura) => abertura.stock > 0);

    // Mapear los datos a un formato adecuado para el archivo Excel
    const dataToExport = aberturasConStock.map((abertura) => ({
      // ID: abertura.id,
      // Codigo: abertura.nombre,
      Detalle: abertura.descripcion,
      Categoria: abertura.categoria,
      Color: abertura.color,
      "Ancho x Alto": `${abertura.ancho} x ${abertura.alto}`,
      Stock: abertura.stock,
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
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                ID
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Codigo
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Stock
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Categoria
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Color
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Detalle
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Ancho x Alto
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Eliminar
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Editar
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Editar stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-left">
            {currentResults.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer"
              >
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.id}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.nombre}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.stock}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.categoria}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.color}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.descripcion}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.ancho} x {p.alto}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  <button
                    onClick={() => {
                      handleBorrarAccesorioOpen(), setGuardarId(p.id);
                    }}
                    className="bg-red-100 text-red-800 py-2 shadow-black/30 px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                    // onClick={() => handleEliminar(p.id)}
                  >
                    ELIMINAR
                  </button>
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <button
                    onClick={() => {
                      openModalEditar(), handlePerfilSeleccionado(p.id);
                    }}
                    className="bg-indigo-500 text-white py-2 shadow px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                  >
                    EDITAR
                  </button>
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <button
                    onClick={() => {
                      handleModalEditarStockOpen(),
                        handlePerfilSeleccionado(p.id);
                    }}
                    className="bg-slate-500 text-white py-2 shadow px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                  >
                    EDITAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      <button
        className="bg-green-500 rounded-xl shadow py-2 px-5 text-white mt-10"
        onClick={handleDescargarExcel}
      >
        Descargar aberturas en stock formato Excel
      </button>{" "}
    </div>
  );
};
