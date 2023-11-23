import { useEffect } from "react";
import { ModalCrearPedido } from "../../../components/pedidos/ModalCrearPedido";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { useState } from "react";
import moment from "moment";

export const Pedidos = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    datosPresupuesto,
    setDatosPresupuesto,
  } = usePedidoContext();

  const [totalCantidad, setTotalCantidad] = useState(0);

  // Obtener la fecha actual
  const fechaActual = moment();

  function load() {
    const datosFiltrados = datosPresupuesto.filter((objeto) => {
      const fechaCreacion = moment(objeto.created_at);
      return (
        fechaCreacion.month() === fechaActual.month() &&
        fechaCreacion.year() === fechaActual.year()
      );
    });

    // Actualizar el estado con los datos filtrados
    setDatosPresupuesto(datosFiltrados);
  }

  useEffect(() => {
    const total = datosPresupuesto.reduce((acumulador, objeto) => {
      const fechaCreacion = moment(objeto.created_at);
      if (
        fechaCreacion.month() === fechaActual.month() &&
        fechaCreacion.year() === fechaActual.year()
      ) {
        objeto.productos.respuesta.forEach((producto) => {
          acumulador += parseInt(producto.cantidad, 10);
        });
      }
      return acumulador;
    }, 0);

    // Actualizar el estado con el total calculado
    setTotalCantidad(total);
  }, []);

  const datos = datosPresupuesto.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  let data = datos.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultado = data?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  useEffect(() => {
    load();
  }, [resultado]);

  return (
    <section className="w-full py-14 px-14">
      <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow py-10 px-12 w-full">
        <div>
          <p className="font-semibold text-[20px]">Crear pedido clientes</p>
        </div>

        <div className="mt-5 flex gap-5">
          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Pedidos generados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">
              {datosPresupuesto?.length}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Total aberturas generadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">{resultado}</span>
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

        <div className="mt-5">
          <TablePedidos />
        </div>

        <ModalCrearPedido isOpen={isOpen} closeModal={closeModal} />
      </div>
    </section>
  );
};
