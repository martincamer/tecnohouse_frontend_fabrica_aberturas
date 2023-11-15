import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidDownArrow } from "react-icons/bi";
import { ModalPresupuestoEstado } from "../ui/ModalPresupuestoEstado";
import { useFacturaContext } from "../../context/FacturaProvider";

export const TableFacturacion = () => {
  const { datosPresupuesto, handleDeletePresupuesto } = useFacturaContext();
  let [obtenerId, setObtenerId] = useState("");
  let [isOpenEstado, setIsEstado] = useState(false);

  const seleccionarId = (id) => {
    setObtenerId(id);
  };

  function closeModalEstado() {
    setIsEstado(false);
  }

  function openModalEstado() {
    setIsEstado(true);
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px] p-[5px] table-auto w-full rounded">
        <thead>
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Emision</th>
            <th className="p-3">Cliente</th>
            <th className="p-3">Total a pagar</th>
            <th className="p-3">Tipo Factura</th>
            <th className="p-3">Ver Factura</th>
            <th className="p-3">Eliminar</th>
            <th className="p-3 w-[220px]">Estado de la venta</th>
          </tr>
        </thead>
        <tbody>
          {datosPresupuesto.map((p) => (
            <tr key={p.id}>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.id}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                {dateTime(p.created_at)}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                {p.clientes.nombre} {p.clientes.apellido}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {Number(p.estadistica.total_pagar).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.tipo_factura}
              </th>
              <th className="border-[1px] border-gray-300 p-3 space-x-2 w-1/5">
                <Link
                  to={`/factura-venta/${p.id}`}
                  className="bg-secondary py-1 px-2 text-center font-bold font-bold text-white rounded"
                >
                  ver factura
                </Link>
              </th>
              <th className="border-[1px] border-gray-300 p-3">
                <Link
                  onClick={() => handleDeletePresupuesto(p.id)}
                  className="bg-red-500 py-1 px-2 text-center font-bold text-white rounded"
                >
                  eliminar
                </Link>
              </th>
              <th className="border-[1px] border-gray-300 p-3 relative">
                <Link
                  onClick={openModalEstado}
                  className={`${
                    (p.estado === "aceptado" && "bg-green-500") ||
                    (p.estado === "rechazado" && "bg-red-500") ||
                    (p.estado === "pendiente" && "bg-yellow-500")
                  } py-1 px-2 text-center font-bold text-white rounded flex gap-1 flex-row justify-center items-center w-2/3 text-center mx-auto`}
                >
                  <span onClick={() => seleccionarId(p.id)}>{p.estado}</span>
                  <BiSolidDownArrow className="text-[12px]" />
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
        <ModalPresupuestoEstado
          closeModalEstado={closeModalEstado}
          isOpenEstado={isOpenEstado}
          obtenerId={obtenerId}
          openModalEstado={openModalEstado}
        />
      </table>
    </div>
  );
};
