import { useAberturasContext } from "../../../context/AluminioAberturas";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { useAluminioContext } from "../../../context/AluminioProvider";
import { useState, useEffect } from "react";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { obtenerFacturasMensual } from "../../../api/factura.api";
import { Charts } from "../../../components/home/Charts";

export const Home = () => {
  const { results } = useAberturasContext();
  const { results: accesorios } = useAccesoriosContext();
  const { results: perfiles } = useAluminioContext();
  const { datosPresupuesto, setDatosPresupuesto } = usePedidoContext();

  const [datosMensuales, setDatosMensuales] = useState([]);

  console.log(datosMensuales);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFacturasMensual();

      setDatosMensuales(res.data);

      console.log(res.data);
    }

    loadData();
  }, []);

  const unidadesEnStock = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  console.log(datosPresupuesto);

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

  const datos = datosMensuales.map((c) =>
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

  const datosTwo = datosMensuales.map((c) =>
    c.productos.respuesta.map((c) => c.cantidadFaltante)
  );

  console.log(datosMensuales);

  let dataTwo = datosTwo.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultadoTwo = dataTwo?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
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

  const fechaActual = new Date();
  const diaActual = diasSemana[fechaActual.getDay()];
  const mesActual = meses[fechaActual.getMonth()];

  return (
    <section className="w-full py-20 px-12 max-md:px-4">
      <div className="bg-slate-0 grid grid-cols-5 border-[1px] gap-3 items-center border-black/20 py-6 px-10  max-md:px-2 max-md:py-4 rounded-xl shadow-md shadow-black/10">
        <div className="border-[1px] border-black/20 py-5 px-2 rounded-xl shadow-md shadow-black/10 flex flex-col gap-3 items-center bg-white">
          <p className="font-normal text-slate-700 text-base max-md:text-lg">
            Productos Totales en stock
          </p>
          <div className="font-bold max-md:text-sm text-indigo-500 text-lg">
            {unidadesEnStock()}
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-5 px-2 rounded-xl shadow-md shadow-black/10 flex flex-col gap-3 items-center bg-white">
          <p className="font-normal text-slate-700 text-base max-md:text-lg">
            Fecha del mes
          </p>
          <div className="font-bold max-md:text-sm text-indigo-500 text-lg">
            <p>
              Hoy es {diaActual} {fechaActual.getDate()} de {mesActual}.
            </p>
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-5 px-2 rounded-xl shadow-md shadow-black/10 flex flex-col gap-3 items-center bg-white">
          <p className="font-normal text-slate-700 text-base max-md:text-lg">
            Total aberturas generadas en el mes
          </p>
          <div className="font-bold max-md:text-sm text-indigo-500 text-lg">
            {resultado}
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-5 px-2 rounded-xl shadow-md shadow-black/10 flex flex-col gap-3 items-center bg-white">
          <p className="font-normal text-slate-700 text-base max-md:text-lg">
            Total aberturas realizadas en el mes
          </p>
          <div className="font-bold max-md:text-sm text-indigo-500 text-lg">
            {resultadoTwo}
          </div>
        </div>
      </div>
      <div className="mt-20 bg-white py-20 rounded-lg shadow-md border-[1px] border-slate-300">
        <Charts datosMensuales={datosMensuales} />
      </div>
    </section>
  );
};
