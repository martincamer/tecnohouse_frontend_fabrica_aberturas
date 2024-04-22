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

  const [datosMensuales, setDatosMensuales] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFacturasMensual();

      setDatosMensuales(res.data);

      console.log(res.data);
    }

    loadData();
  }, []);

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <section className="w-full h-full min-h-full max-h-full px-12 max-md:px-4 flex flex-col gap-12 max-md:gap-8 py-24 max-md:py-6">
      <div className="rounded-xl bg-white grid grid-cols-4 gap-3 max-md:grid-cols-1 max-md:border-none max-md:shadow-none max-md:py-2 max-md:px-0">
        {[1, 2, 3, 4].map((index) => (
          <article
            key={index}
            className="animate-pulse flex items-center justify-between gap-4 rounded-2xl border-[1px] border-slate-200 bg-white py-12 px-8 hover:shadow-md transition-all ease-linear cursor-pointer"
          >
            <div className="flex gap-4 items-center">
              <div className="rounded-full bg-gray-200 animate-pulse w-9 h-9"></div>
              <div>
                <div className="bg-gray-200 animate-pulse h-8 w-24"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-20"></div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="w-full animate-pulse flex flex-col gap-3 py-10 px-10 shadow-md h-[70vh] max-md:h-[30vh] border-slate-200 border-[1px] rounded-2xl">
        <div className="flex items-end justify-around h-full border-b-[1px] border-slate-200">
          <div className="h-[500px] max-md:h-[100px] max-md:w-[40px]  animate-pulse  w-[80px] rounded-t-2xl bg-slate-300 mr-3"></div>
          <div className="h-[300px] max-md:h-[60px] max-md:w-[40px]  animate-pulse  w-[80px] rounded-t-2xl bg-slate-300 mr-3"></div>
          <div className="h-[150px] max-md:h-[50px] max-md:w-[40px]  animate-pulse  w-[80px] rounded-t-2xl bg-slate-300 mr-3"></div>
          <div className="h-[90px]  max-md:h-[30px] max-md:w-[40px]  animate-pulse w-[80px] rounded-t-2xl bg-slate-300 mr-3"></div>
          <div className="h-[400px] max-md:h-[20px] max-md:w-[40px]  animate-pulse  w-[80px] rounded-t-2xl bg-slate-300"></div>
        </div>
      </div>
    </section>
  ) : (
    <section className="w-full py-20 px-5 max-md:px-4  max-md:py-8">
      <div className="max-md:grid-cols-1 max-md:border-none max-md:shadow-none max-md:px-0 bg-slate-0 grid grid-cols-4 gap-3">
        <article class="rounded-xl border border-slate-300 bg-white p-6 h-full hover:shadow-md transition-all ease-linear cursor-pointer justify-center flex flex-col gap-1">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Total aberturas entregadas/fabricas
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {resultadoTwo}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-1 text-green-600 bg-green-200 py-2 rounded-xl px-4 items-center justify-start">
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
                  {Number(resultadoTwo / 10).toFixed(2)}%{" "}
                </span>

                <span class="text-gray-500"> PORCENTAJE FINAL GENERADO </span>
              </p>
            </div>
          </div>
        </article>

        <article class="rounded-xl border border-slate-300 bg-white p-6 h-full hover:shadow-md transition-all ease-linear cursor-pointer justify-center flex flex-col gap-1">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Total Aberturas en stock
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {unidadesEnStockAberturas()}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-1 text-green-600 bg-green-200 py-2 rounded-xl px-4 items-center justify-start">
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
                  {Number(unidadesEnStockAberturas() / 10).toFixed(2)}%{" "}
                </span>

                <span class="text-gray-500"> PORCENTAJE FINAL GENERADO </span>
              </p>
            </div>
          </div>
        </article>

        <article class="rounded-xl border border-slate-300 bg-white p-6 h-full hover:shadow-md transition-all ease-linear cursor-pointer justify-center flex flex-col gap-1">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Total Producción final / resumen
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {unidadesEnStockAberturas() + resultadoTwo}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-1 text-green-600 bg-green-200 py-2 rounded-xl px-4 items-center justify-start">
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
                  {Number(
                    Number(unidadesEnStockAberturas() + resultadoTwo) / 10
                  ).toFixed(2)}
                  %{" "}
                </span>

                <span class="text-gray-500"> PORCENTAJE FINAL GENERADO </span>
              </p>
            </div>
          </div>
        </article>

        <article class="rounded-xl border border-slate-300 bg-white p-6 h-full hover:shadow-md transition-all ease-linear cursor-pointer">
          <div>
            <p class="text-sm text-gray-500 uppercase max-md:text-xs">
              Fecha del mes
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {mesActual}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-1 text-green-600 bg-green-200 py-2 rounded-xl px-4 items-center justify-start">
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
          </div>
        </article>
      </div>
      <div className="mt-10 bg-white py-20 rounded-2xl hover:shadow-md transition-all ease-linear cursor-pointer border-[1px] border-slate-300 max-md:flex-col max-md:py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-bold uppercase text-slate-700 text-center max-md:text-xs max-md:underline max-md:px-6">
              Total Aberturas entregadas por fabricas
            </h3>
          </div>
          {<ColumnClientesDos datosPresupuesto={datosMensuales} />}
        </div>
      </div>
      <div className="mt-10 bg-white py-20 rounded-2xl hover:shadow-md transition-all ease-linear border-[1px] border-slate-300 grid grid-cols-2 gap-12 max-md:grid-cols-1 cursor-pointer max-md:py-5">
        <div className="flex flex-col gap-6">
          <div className="max-md:px-12">
            <h3 className="font-bold uppercase text-slate-700 text-center max-md:text-sm underline">
              Total aberturas entregadas por cliente
            </h3>
          </div>
          {<ColumnClientes datosPresupuesto={datosMensuales} />}
        </div>

        <div className="flex flex-col gap-6">
          <div className="max-md:px-12">
            <h3 className="font-bold uppercase text-slate-700 text-center max-md:text-sm underline">
              Total viviendas entregadas
            </h3>
          </div>
          {<ColumnClientesTres datosPresupuesto={datosMensuales} />}
        </div>
      </div>
    </section>
  );
};
