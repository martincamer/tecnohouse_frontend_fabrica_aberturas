import { ModalCrearPedido } from "../../../components/pedidos/ModalCrearPedido";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { usePedidoContext } from "../../../context/PedidosMensualesProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../../components/ui/Search";
import moment from "moment";
import "moment/locale/es";
import { TablePedidosRealizados } from "../../../components/pedidos/TablePedidosRealizados";

export const PedidosRealizados = () => {
  const { isOpen, openModal, closeModal, datosPresupuesto, search, searcher } =
    usePedidoContext();

  const [totalCantidad, setTotalCantidad] = useState(0);

  const datos = datosPresupuesto?.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  const datosTwo = datosPresupuesto?.map((c) =>
    c.productos.respuesta.map((c) => c.cantidadFaltante)
  );

  let data = datos?.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  let dataTwo = datosTwo.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultado = data?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  const resultadoTwo = dataTwo?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  let fechaActualNew = new Date();

  let nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let indiceMes = fechaActualNew.getMonth();

  let nombreMes = nombresMeses[indiceMes];

  return (
    <section className="w-full py-14 px-14">
      <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow py-10 px-12 w-full">
        <div>
          <p className="font-semibold text-[20px]">Pedidos Realizados</p>
        </div>

        <div className="mt-5 flex gap-5">
          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Pedidos generados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">
              {datosPresupuesto?.length}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Fecha del mes:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">{nombreMes}</span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Total aberturas generadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">{resultado}</span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Total aberturas realizadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">
              {resultadoTwo}
            </span>
          </div>
        </div>

        <div className="mt-5 py-5 px-5">
          <button
            type="button"
            onClick={openModal}
            className="py-2 px-5 bg-green-500 rounded shadow font-semibold text-white"
          >
            Crear nuevo pedido
          </button>
        </div>

        <div>
          <Search search={search} searcher={searcher} />
        </div>

        <div className="mt-5 h-[500px] overflow-y-scroll">
          <TablePedidosRealizados />
        </div>
        <div className="mt-5">
          {/* <Link
            className="bg-blue-500 py-1 px-6 rounded shadow text-white font-semibold"
            to={"/pedido-completo"}
          >
            Ver pedido completo
          </Link> */}
        </div>

        <ModalCrearPedido isOpen={isOpen} closeModal={closeModal} />
      </div>
    </section>
  );
};
