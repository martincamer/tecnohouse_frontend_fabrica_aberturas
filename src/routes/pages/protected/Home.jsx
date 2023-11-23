import React from "react";
import { useAberturasContext } from "../../../context/AluminioAberturas";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { useAluminioContext } from "../../../context/AluminioProvider";
import { useState, useEffect, useParams } from "react";
import moment from "moment";
import {
  deleteFacturaProducto,
  obtenerFactura,
} from "../../../api/factura.api";
import { usePedidoContext } from "../../../context/PedidoProvider";

export const Home = () => {
  const { results } = useAberturasContext();
  const { results: accesorios } = useAccesoriosContext();
  const { results: perfiles } = useAluminioContext();
  const { datosPresupuesto, setDatosPresupuesto } = usePedidoContext();

  const unidadesEnStock = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  const unidadesEnStockAccesorios = () => {
    return accesorios.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  const unidadesEnStockAluminio = () => {
    return perfiles.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

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
    <section className="w-full py-12 px-12">
      <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 space-y-5">
        <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 flex gap-4 items-center">
          <p className="font-bold text-lg">Productos Totales en stock: Cant.</p>
          <div className="font-bold text-lg text-black py-2 rounded-full bg-gray-100 px-4 shadow shadow-black/30 border-[0.5px]">
            {unidadesEnStock()}
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 flex gap-4 items-center">
          <p className="font-bold text-lg">
            Accesorios Totales en stock: Cant.
          </p>
          <div className="font-bold text-lg text-black py-2 rounded-full bg-gray-100 px-4 shadow shadow-black/30 border-[0.5px]">
            {unidadesEnStockAccesorios()}
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 flex gap-4 items-center">
          <p className="font-bold text-lg">Perfiles Totales en stock: Cant.</p>
          <div className="font-bold text-lg text-black py-2 rounded-full bg-gray-100 px-4 shadow shadow-black/30 border-[0.5px]">
            {unidadesEnStockAluminio()}
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 flex gap-4 items-center">
          <p className="font-bold text-lg">
            Total aberturas realizadas en el mes:
          </p>
          <div className="font-bold text-lg text-black py-2 rounded-full bg-gray-100 px-4 shadow shadow-black/30 border-[0.5px]">
            {resultado}
          </div>
        </div>
      </div>
    </section>
  );
};
