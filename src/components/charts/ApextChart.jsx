import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ datos }) => {
  // Agrupar productos por 'cliente'
  const productosAgrupados = datos.reduce((result, dato) => {
    const productos = dato.productos.respuesta;
    productos.forEach((producto) => {
      const cliente = producto.cliente.toUpperCase(); // Asegurarse de tener clientes en mayúsculas
      const cantidad = parseInt(producto.cantidad, 10); // Asegurarse de que sea un número entero
      if (!result[cliente]) {
        result[cliente] = {
          cliente,
          cantidad,
        };
      } else {
        result[cliente].cantidad += cantidad; // Sumar cantidades si el cliente ya existe
      }
    });
    return result;
  }, {});

  // Preparar datos para el gráfico
  const seriesData = Object.values(productosAgrupados).map(
    (cliente) => cliente.cantidad
  );
  const categoriesData = Object.values(productosAgrupados).map(
    (cliente) => cliente.cliente // Solo el cliente, sin detalles
  );

  // Configuración del gráfico de área tipo spline
  const chartOptions = {
    chart: {
      height: 500,
      with: "100%",
      type: "area", // Gráfico de área
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth", // Curvas suaves
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categoriesData, // Categorías basadas en clientes
      labels: {
        style: {
          fontWeight: "bold", // Etiquetas en negrita
          textTransform: "uppercase", // Todo en mayúsculas
        },
      },
    },
    yaxis: {
      title: {
        text: "CONTROL DE CONTRATOS, CANTIDADES", // Título del eje Y
        style: {
          fontWeight: "bold",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} unidades`, // Formateador para el tooltip
      },
    },
  };

  // Define la serie con la cantidad total por cliente
  const series = [
    {
      name: "CANTIDAD TOTAL", // Nombre de la serie
      data: seriesData, // Datos para el gráfico
    },
  ];

  return (
    <div className="bg-white py-10 px-10 z-[100] shadow-xl relative rounded-xl mt-10 w-full cursor-pointer scrollbar-hidden max-md:overflow-x-scroll">
      <div className="max-md:w-[1200px]" id="chart">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="area" // Gráfico de área
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart;
