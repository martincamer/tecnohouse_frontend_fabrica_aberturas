import { useState } from "react";
import { Link } from "react-router-dom";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { useAberturasContext } from "../../../context/AluminioAberturas";
import ApexChart from "../../../components/charts/ApextChart";
import ApexChartColumn from "../../../components/charts/ApextChartColumn";
import ApexChartPie from "../../../components/charts/ApexChartPie";

export const Home = () => {
  const { datosMensuales } = usePedidoContext();
  const { perfiles } = useAberturasContext();

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Convertir las fechas en formato YYYY-MM-DD para los inputs tipo date
  const fechaInicioPorDefecto = firstDayOfMonth.toISOString().split("T")[0];
  const fechaFinPorDefecto = lastDayOfMonth.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(fechaInicioPorDefecto);
  const [endDate, setEndDate] = useState(fechaFinPorDefecto);

  const filteredByDateRange = datosMensuales.filter((orden) => {
    const createdAt = new Date(orden.created_at);
    return (
      (!startDate || createdAt >= new Date(startDate)) &&
      (!endDate || createdAt <= new Date(endDate))
    );
  });

  const unidadesEnStockAberturas = () => {
    return perfiles.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  const datos = filteredByDateRange.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  let dataTwo = datos.map((c) =>
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

  console.log(datosMensuales);

  return (
    <section className="w-full">
      <div className="w-full bg-white flex max-md:hidden">
        <Link
          className="text-indigo-500 bg-indigo-100 px-6 py-3.5 font-bold text-lg"
          to="/"
        >
          Inicio
        </Link>
      </div>

      <div className="px-10 mt-6">
        <p className="font-bold text-2xl text-slate-600 max-md:text-lg">
          Bienvenido a la parte de estadisticas del mes 🖐️.
        </p>
      </div>

      <div className="mt-5 px-10 right-0 top-[75px] absolute max-md:static max-md:top-0 max-md:right-0">
        <div className="flex gap-4 items-center max-md:flex-row max-md:overflow-x-scroll scrollbar-hidden max-md:gap-2 max-md:w-full max-md:items-center">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-slate-600 font-bold max-md:uppercase uppercase">
              Fecha de inicio
            </label>
            <input
              className="text-sm bg-white py-1.5 font-bold uppercase px-3 rounded-xl shadow-xl cursor-pointer text-slate-700 outline-none"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sm text-slate-600 font-bold max-md:uppercase uppercase">
              Fecha de fin
            </label>
            <input
              className="text-sm bg-white py-1.5 font-bold uppercase px-3 rounded-xl shadow-xl cursor-pointer text-slate-700 outline-none"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="px-10 py-10 max-md:px-5">
        <div className="max-md:grid-cols-1 max-md:border-none max-md:shadow-none grid grid-cols-4 gap-3">
          <article class="relative rounded-xl bg-white p-6 h-full shadow-xl cursor-pointer justify-center flex flex-col gap-1">
            <div className="flex items-center w-full">
              <div>
                <p class="text-sm text-gray-500 uppercase max-md:text-xs font-semibold">
                  Total aberturas entregadas/fabricas
                </p>

                <p class="text-2xl font-bold text-gray-700 max-md:text-base">
                  {resultadoTwo}
                </p>
              </div>

              <div className="h-full items-center flex justify-center">
                <CircularProgress color={"#6366f1"} percentage={resultadoTwo} />
              </div>
            </div>
          </article>
          <article class="relative rounded-xl bg-white p-6 h-full shadow-xl cursor-pointer justify-center flex flex-col gap-1">
            <div className="flex items-center w-full">
              <div>
                <p class="text-sm text-gray-500 uppercase max-md:text-xs font-semibold">
                  Total aberturas en stock/fabrica
                </p>

                <p class="text-2xl font-bold text-gray-700 max-md:text-base">
                  {unidadesEnStockAberturas()}
                </p>
              </div>

              <div className="h-full items-center flex justify-end w-full">
                <CircularProgress
                  color={"#6366f1"}
                  percentage={unidadesEnStockAberturas()}
                />
              </div>
            </div>
          </article>

          <article class="relative rounded-xl bg-white p-6 h-full shadow-xl cursor-pointer justify-center flex flex-col gap-1">
            <div className="flex items-center w-full">
              <div>
                <p class="text-sm text-gray-500 uppercase max-md:text-xs font-semibold">
                  Total final resumen stock/mas entregas
                </p>

                <p class="text-2xl font-bold text-gray-700 max-md:text-base">
                  {unidadesEnStockAberturas() + resultadoTwo}
                </p>
              </div>

              <div className="h-full items-center flex justify-end w-full">
                <CircularProgress
                  color={"#6366f1"}
                  percentage={unidadesEnStockAberturas() + resultadoTwo}
                />
              </div>
            </div>
          </article>

          <article class="relative rounded-xl bg-white p-6 h-full shadow-xl cursor-pointer justify-center flex flex-col gap-1">
            <div>
              <p class="text-sm text-gray-500 uppercase max-md:text-xs font-semibold">
                Fecha del mes
              </p>

              <p class="text-2xl font-bold text-gray-900 max-md:text-base">
                {mesActual}
              </p>
            </div>

            <div className="flex">
              <div class="mt-1 flex gap-1 text-white bg-indigo-500 py-2 rounded-xl px-4 items-center justify-start">
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
                  <span class="text-white font-bold uppercase">
                    {" "}
                    Hoy es {diaActual} {fechaActual.getDate()} de {mesActual}.{" "}
                  </span>
                </p>
              </div>
            </div>
          </article>
        </div>

        <ApexChart datos={datosMensuales} />

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
          <ApexChartColumn datos={datosMensuales} />
          <ApexChartPie
            resultadosTwo={resultadoTwo}
            unidadesEnStockAberturas={unidadesEnStockAberturas}
          />
        </div>
      </div>
    </section>
  );
};

const CircularProgress = ({ percentage, color }) => {
  // Asegura que el porcentaje esté entre 1 y 100
  const normalizedPercentage = percentage % 100 || 100;

  // Cálculo del ángulo de progreso
  const progressAngle = `${(normalizedPercentage / 100) * 360}deg`;

  // Tamaño de la barra de progreso
  const circleSize = "100px"; // Tamaño del círculo exterior

  // Estilo para el círculo de progreso
  const progressStyle = {
    backgroundImage: `conic-gradient(
      ${color} ${progressAngle},
      transparent 0
    )`,
  };

  return (
    <div
      className="relative flex justify-center items-center rounded-full bg-gray-200"
      style={{ width: circleSize, height: circleSize }}
    >
      {/* Fondo del círculo de progreso */}
      <div
        className="absolute w-full h-full rounded-full"
        style={{ ...progressStyle, zIndex: 1 }}
      />

      {/* Anillo interior para crear la barra gruesa */}
      <div
        className="-absolute w-20 h-20 rounded-full bg-white"
        style={{ zIndex: 2 }}
      />

      {/* Texto en el centro */}
      <div
        className="absolute flex justify-center items-center"
        style={{ zIndex: 3 }}
      >
        <span className="text-lg font-bold text-gray-700">
          {`${normalizedPercentage.toFixed(2)}%`}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
