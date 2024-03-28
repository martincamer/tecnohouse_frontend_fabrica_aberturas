import { useAberturasContext } from "../../../context/AluminioAberturas";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { useState, useEffect } from "react";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { obtenerFacturasMensual } from "../../../api/factura.api";
import ColumnClientes from "../../../components/charts/ColumnClientes";
import ColumnClientesDos from "../../../components/charts/ColumnClientesDos";
import ColumnClientesTres from "../../../components/charts/ColumnClientesTres";

export const Home = () => {
  const { results } = useAberturasContext();
  const { results: accesorios } = useAccesoriosContext();
  const { datosPresupuesto } = usePedidoContext();

  const [datosMensuales, setDatosMensuales] = useState([]);

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

  // const unidadesEnStockAccesorios = () => {
  //   return accesorios.reduce((sum, b) => {
  //     return sum + Number(b.stock);
  //   }, 0);
  // };

  const unidadesEnStockAberturas = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

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
    <section className="w-full py-20 px-12 max-md:px-4 max-md:py-2 max-md:pb-32">
      <div className="max-md:grid-cols-1 max-md:border-none max-md:shadow-none max-md:px-0 bg-slate-0 grid grid-cols-4 border-[1px] gap-3 border-black/20 py-6 px-10  max-md:py-4 rounded-xl shadow-md shadow-black/10 items-start">
        <article class="rounded-xl border border-slate-300 shadow bg-white p-6 h-full">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Total aberturas realizadas
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {resultadoTwo}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-green-600 max-md:text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <p class="flex gap-2 text-xs">
              <span class="font-medium">
                {" "}
                {Number(resultadoTwo).toFixed(2)}%{" "}
              </span>

              <span class="text-gray-500"> PORCENTAJE FINAL GENERADO </span>
            </p>
          </div>
        </article>

        <article class="rounded-xl border border-slate-300 shadow bg-white p-6 h-full">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Total Aberturas en stock
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {unidadesEnStockAberturas()}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-green-600 max-md:text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <p class="flex gap-2 text-xs">
              <span class="font-medium">
                {" "}
                {Number(unidadesEnStockAberturas()).toFixed(2)}%{" "}
              </span>

              <span class="text-gray-500"> PORCENTAJE FINAL GENERADO </span>
            </p>
          </div>
        </article>

        <article class="rounded-xl border border-slate-300 shadow bg-white p-6 h-full">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Total Producción final / resumen
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {unidadesEnStockAberturas() + resultadoTwo}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <p class="flex gap-2 text-xs max-md:text-xs">
              <span class="font-medium">
                {" "}
                {Number(unidadesEnStockAberturas() + resultadoTwo).toFixed(
                  2
                )}%{" "}
              </span>

              <span class="text-gray-500"> PORCENTAJE FINAL GENERADO </span>
            </p>
          </div>
        </article>

        <article class="rounded-xl border border-slate-300 shadow bg-white p-6">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Fecha del mes
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {mesActual}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <p class="flex gap-2 text-xs max-md:text-xs">
              <span class="text-gray-500 uppercase">
                {" "}
                Hoy es {diaActual} {fechaActual.getDate()} de {mesActual}.{" "}
              </span>
            </p>
          </div>
        </article>
      </div>
      <div className="mt-10 bg-white py-20 rounded-lg shadow-md border-[1px] border-slate-300 max-md:flex-col">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-bold uppercase text-slate-700 text-center max-md:text-sm max-md:underline max-md:px-6">
              Total Aberturas entregadas por fabricas
            </h3>
          </div>
          {<ColumnClientesDos datosPresupuesto={datosPresupuesto} />}
        </div>
      </div>
      <div className="mt-10 bg-white py-20 rounded-lg shadow-md border-[1px] border-slate-300 grid grid-cols-2 gap-12 max-md:grid-cols-1">
        <div className="flex flex-col gap-6">
          <div className="max-md:px-12">
            <h3 className="font-bold uppercase text-slate-700 text-center max-md:text-sm underline">
              Total aberturas entregadas por cliente
            </h3>
          </div>
          {<ColumnClientes datosPresupuesto={datosPresupuesto} />}
        </div>

        <div className="flex flex-col gap-6">
          <div className="max-md:px-12">
            <h3 className="font-bold uppercase text-slate-700 text-center max-md:text-sm underline">
              Total viviendas entregadas
            </h3>
          </div>
          {<ColumnClientesTres datosPresupuesto={datosPresupuesto} />}
        </div>
      </div>
    </section>
  );
};
