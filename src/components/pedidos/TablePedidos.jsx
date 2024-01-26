import { Link } from "react-router-dom";
import { usePedidoContext } from "../../context/PedidoProvider";
import { useEffect, useState } from "react";
import { ModalEliminarPedido } from "./ModalEliminarPedido";
import { IoCloseCircle } from "react-icons/io5";

export const TablePedidos = () => {
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

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  let [isOpen, setIsOpen] = useState(false);

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);
  const [guardarId, setGuardarId] = useState(false);

  const handleBorrarAccesorioOpen = () => {
    setOpenBorrarAccesorio(true);
  };

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
  };

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
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Clientes
          </th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Fecha de creación
          </th>
          {/* <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">Remito</th> */}
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Estado del pedido
          </th>{" "}
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Eliminar
          </th>
          <th className="p-3 max-md:py-1 max-md:px-10 max-md:text-sm">
            Ver pedido
          </th>
        </tr>
      </thead>
      <tbody>
        {results.map((p, index) => (
          <tr key={p?.id}>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {p?.id}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {p?.cliente}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {p?.detalle}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
              {p?.productos.respuesta.reduce((sum, b) => {
                return sum + Number(b?.cantidad);
              }, 0)}
            </th>
            <th
              onClick={() => handleToggleClick(index)}
              className="border-[1px] border-gray-300 p-2 font-medium text-sm"
            >
              {!clickStates[index] ? (
                <p className="p-3 font-bold bg-gray-100 rounded shadow shadow-black/50 cursor-pointer">
                  VER CLIENTE - CLICK
                </p>
              ) : (
                <div className="relative">
                  <div className="absolute top-0 right-3 cursor-pointer">
                    <IoCloseCircle className="text-2xl text-red-500" />
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
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {new Date(p?.created_at).toLocaleDateString("es-AR")}
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
            <th className="border-[1px] border-gray-300 p-3 max-md:py-1 max-md:px-4">
              <button
                className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                onClick={() => {
                  handleBorrarAccesorioOpen(), setGuardarId(p.id);
                }}
              >
                eliminar
              </button>
            </th>

            <th className="border-[1px] border-gray-300 p-3 max-md:py-1 max-md:px-4 font-bold ">
              <Link
                to={`/pedido/${p?.id}`}
                className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
              >
                ver pedido
              </Link>
            </th>
          </tr>
        ))}
        <ModalEliminarPedido
          p={guardarId}
          handleEliminar={handleDeletePresupuesto}
          openBorrarAccesorio={openBorrarAccesorio}
          handleBorrarAccesorioClose={handleBorrarAccesorioClose}
        />
      </tbody>
    </table>
  );
};
