import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChartPie = ({ resultadosTwo, unidadesEnStockAberturas }) => {
  // Datos para el gráfico de pastel
  const series = [
    resultadosTwo, // Cantidad total de aberturas
    unidadesEnStockAberturas(), // Stock en fábrica
  ];

  // Etiquetas para el gráfico de pastel
  const categoriesData = ["Total entregas", "Stock fabrica"];

  // Configuración del gráfico de pastel
  const chartOptions = {
    chart: {
      height: 350,
      type: "pie", // Gráfico de pastel
    },
    labels: categoriesData, // Etiquetas para el gráfico de pastel
    tooltip: {
      y: {
        formatter: (value) => `${value} unidades`, // Formateador del tooltip
      },
    },
    legend: {
      position: "bottom", // Posición de la leyenda
      labels: {
        style: {
          fontWeight: "bold", // Leyendas en negrita
          textTransform: "uppercase", // Todo en mayúsculas
          fontSize: "12px",
        },
      },
    },
  };

  return (
    <div className="bg-white py-10 px-10 z-[100] shadow-xl rounded-xl mt-10 w-full cursor-pointer scrollbar-hidden max-md:overflow-x-scroll">
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="pie" // Gráfico de pastel
          height={350}
          width={"100%"}
        />
      </div>
      {/* Texto adicional con formato en mayúsculas y negrita */}
      <div className="mt-4 max-md:text-left text-center">
        <p className="font-bold text-sm text-gray-700 uppercase max-md:text-xs">
          Total de Aberturas Entregadas/Fábricas:{" "}
          <span className="font-bold text-indigo-500">
            {resultadosTwo} unidades
          </span>
        </p>
        <p className="font-bold text-sm text-gray-700 uppercase max-md:text-xs">
          Stock en Fábrica Actual:{" "}
          <span className="font-bold text-indigo-500">
            {unidadesEnStockAberturas()} unidades
          </span>
        </p>
      </div>
    </div>
  );
};

export default ApexChartPie;
