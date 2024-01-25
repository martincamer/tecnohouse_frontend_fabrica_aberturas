import { useEffect } from "react";
import { ModalCrearPedido } from "../../../components/pedidos/ModalCrearPedido";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../../components/ui/Search";
import moment from "moment";
import "moment/locale/es";

export const Pedidos = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    datosPresupuesto,
    setDatosPresupuesto,
    search,
    searcher,
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
    load();
  }, [datosPresupuesto.length]);

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
  const datosTwo = datosPresupuesto.map((c) =>
    c.productos.respuesta.map((c) => c.cantidadFaltante)
  );

  let data = datos.map((c) =>
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
    <section className="w-full py-14 px-14 max-md:px-2 overflow-x-scroll">
      <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow py-10 px-12 max-md:px-4 max-md:py-6 w-full">
        <div>
          <p className="font-semibold text-[20px] max-md:text-lg">
            Crear pedido clientes
          </p>
        </div>

        <div className="mt-5 flex gap-5 max-md:flex-col">
          <div className="border-[1px] py-5 px-5 flex gap-2 items-center  shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Pedidos generados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {datosPresupuesto?.length}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Fecha del mes:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {nombreMes}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Total aberturas generadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {resultado}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Total aberturas realizadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {resultadoTwo}
            </span>
          </div>
        </div>

        <div className="mt-5 py-5 px-5">
          <button
            type="button"
            onClick={openModal}
            className="py-2 px-5 bg-green-500 rounded shadow font-semibold text-white max-md:text-sm"
          >
            Crear nuevo pedido
          </button>
        </div>

        <div>
          <Search search={search} searcher={searcher} />
        </div>

        <div className="mt-5 h-[500px] overflow-y-scroll w-full">
          <TablePedidos />
        </div>
        <div className="mt-5">
          <Link
            className="bg-blue-500 py-1 px-6 rounded shadow text-white font-semibold"
            to={"/pedido-completo"}
          >
            Ver pedido completo
          </Link>
        </div>

        <ModalCrearPedido isOpen={isOpen} closeModal={closeModal} />
      </div>
    </section>
  );
};
