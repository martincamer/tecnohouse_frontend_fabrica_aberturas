import { Link } from "react-router-dom";
import { usePedidoContext } from "../../context/PedidoProvider";
import { ModalEditarRemito } from "./ModalEditarRemito";
import { useState } from "react";

export const TablePedidos = () => {
  const { handleDeletePresupuesto, results } = usePedidoContext();
  const [obtenerId, setObtenerId] = useState("");

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

  const openModalRemito = () => {
    setIsOpen(true);
  };

  const closeModalRemito = () => {
    setIsOpen(false);
  };

  const handleObtenerId = (id) => {
    setObtenerId(id);
  };

  console.log(obtenerId);

  console.log(results);

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
            Fecha de entrega
          </th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">Remito</th>
          <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">
            Eliminar
          </th>
          <th className="p-3 max-md:py-1 max-md:px-10 max-md:text-sm">
            Ver pedido
          </th>
        </tr>
      </thead>
      <tbody>
        {results.map((p) => (
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
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {dateTime(p?.fecha)}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase max-md:py-1 max-md:px-4 max-md:text-xs">
              {p?.remito}-{" "}
              <button
                onClick={() => {
                  openModalRemito(), handleObtenerId(p?.id);
                }}
                className="bg-orange-500 font-bold py-1 px-2 text-white rounded text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
              >
                editar
              </button>
            </th>
            <th className="border-[1px] border-gray-300 p-3 max-md:py-1 max-md:px-4">
              <button
                className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                onClick={() => handleDeletePresupuesto(p.id)}
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
        <ModalEditarRemito
          obtenerId={obtenerId}
          isOpen={isOpen}
          closeModalRemito={closeModalRemito}
        />
      </tbody>
    </table>
  );
};
