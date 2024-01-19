import { Link } from "react-router-dom";
import { useState } from "react";
import { usePedidoContext } from "../../context/PedidosMensualesProvider";
import { ModalEliminarPedidoRealizado } from "./ModalEliminarPedidoRealizado";

export const TablePedidosRealizados = () => {
  const { handleDeletePresupuesto, resultadosFiltrados } = usePedidoContext();

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);

  const handleBorrarAccesorioOpen = () => {
    setOpenBorrarAccesorio(true);
  };

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
  };

  console.log(resultadosFiltrados);

  // Función para sumar la cantidad de todos los objetos

  return (
    <table className="border-[1px] w-full rounded">
      <thead>
        <tr>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">ID</th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Cliente
          </th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Detalle de linea - categoria
          </th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Total aberturas
          </th>
          {/* <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">Fecha de emición</th> */}
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Fecha de creación
          </th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">Remito</th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Estado del pedido
          </th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Eliminar
          </th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Ver pedido
          </th>
        </tr>
      </thead>
      <tbody>
        {resultadosFiltrados?.map((p) => (
          <tr key={p?.id}>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {p?.id}
            </th>
            <th className=" border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs ">
              {p?.cliente}
            </th>
            <th className=" border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {p?.detalle}
            </th>
            <th className=" border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {p?.productos.respuesta.reduce((sum, b) => {
                return sum + Number(b?.cantidad);
              }, 0)}
            </th>
            <th className=" border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs ">
              {new Date(p?.created_at).toLocaleDateString("es-AR")}
            </th>
            <th className=" border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs ">
              {p?.remito}
            </th>
            <th
              className={`${
                p?.productos.respuesta.reduce((sum, b) => {
                  return sum + Number(b?.cantidad);
                }, 0) ===
                p?.productos.respuesta.reduce((sum, b) => {
                  return sum + Number(b?.cantidadFaltante);
                }, 0)
                  ? "bg-green-500 text-white"
                  : "bg-orange-500 text-white"
              } border-[1px] border-gray-300 p-3 font-bold max-md:text-xs text-sm uppercase`}
            >
              {p?.productos.respuesta.reduce((sum, b) => {
                return sum + Number(b?.cantidad);
              }, 0) ===
              p?.productos.respuesta.reduce((sum, b) => {
                return sum + Number(b?.cantidadFaltante);
              }, 0)
                ? "realizado"
                : "pendiente"}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-bold ">
              <button
                className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer"
                onClick={handleBorrarAccesorioOpen}
              >
                eliminar
              </button>
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-bold ">
              <Link
                to={`/pedido/${p?.id}`}
                className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer"
              >
                ver pedido
              </Link>
            </th>
            <ModalEliminarPedidoRealizado
              p={p.id}
              handleEliminar={handleDeletePresupuesto}
              openBorrarAccesorio={openBorrarAccesorio}
              handleBorrarAccesorioClose={handleBorrarAccesorioClose}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
