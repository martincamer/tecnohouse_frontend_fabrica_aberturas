import { useAberturasContext } from "../../context/AluminioAberturas";
import { ModalEditaStock } from "./ModalEditarStock";
import { ModalEliminarAberturas } from "./ModalEliminarAbertura";
import { useState } from "react";

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

  return (
    <div className="rounded shadow-black/10 shadow max-md:shadow-none max-md:flex-none flex flex-col gap-3 w-full">
      <table className="border-[1px] border-gray-200  p-[5px] w-full rounded uppercase">
        <thead>
          <tr>
            <th className="p-3 max-md:p-2 text-sm">ID</th>
            <th className="p-3 max-md:p-2 text-sm">Codigo</th>
            <th className="p-3 max-md:p-2 text-sm">Stock</th>
            <th className="p-3 max-md:p-2 text-sm">Categoria</th>
            <th className="p-3 max-md:p-2 text-sm">Color</th>
            <th className="p-3 max-md:p-2 text-sm">Detalle</th>
            <th className="p-3 max-md:p-2 text-sm">Ancho x Alto</th>
            <th className="p-3 max-md:p-2 text-sm">Eliminar</th>
            <th className="p-3 max-md:p-2 text-sm">Editar</th>
            <th className="p-3 max-md:p-2 text-sm">STOCK</th>
          </tr>
        </thead>
        <tbody>
          {results.map((p, index) => (
            <tr key={p.id}>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.id}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.nombre}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.stock}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.categoria}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.color}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.descripcion}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.ancho} x {p.alto}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  onClick={() => {
                    handleBorrarAccesorioOpen(), setGuardarId(p.id);
                  }}
                  className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                  // onClick={() => handleEliminar(p.id)}
                >
                  ELIMINAR
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  onClick={() => {
                    openModalEditar(), handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                >
                  EDITAR
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  onClick={() => {
                    handleModalEditarStockOpen(),
                      handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-green-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                >
                  EDITAR
                </button>
              </th>
            </tr>
          ))}

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
        </tbody>
      </table>
    </div>
  );
};
