import { useState } from "react";
import { Link } from "react-router-dom";
import { useRemitoContext } from "../../context/RemitoProvider";

export const TableRemitos = () => {
  const { handleDeletePresupuesto, results } = useRemitoContext();
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

  // Función para sumar la cantidad de todos los objetos

  return (
    <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
      <thead>
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Cliente</th>
          <th className="p-3">Solicitante</th>
          <th className="p-3">Trasladado</th>
          <th className="p-3">fecha</th>
          <th className="p-3">dirección</th>
          <th className="p-3">Numero - Remito</th>
          <th className="p-3">Tipo</th>
          <th className="p-3">Eliminar</th>
          <th className="p-3">Ver pedido</th>
        </tr>
      </thead>
      <tbody>
        {results?.map((p) => (
          <tr key={p?.id}>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.id}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.cliente}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.solicitante}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.trasladado}
            </th>

            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {dateTime(p?.fecha)}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.direccion}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.remito}{" "}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.tipo}{" "}
            </th>
            <th className="border-[1px] border-gray-300 p-3">
              <button
                className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer uppercase"
                onClick={() => handleDeletePresupuesto(p.id)}
              >
                eliminar
              </button>
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-bold">
              <Link
                to={`/remitos/${p?.id}`}
                className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer"
              >
                ver pedido
              </Link>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
