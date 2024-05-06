import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ datos }) => {
  // Agrupar la cantidad total por cliente
  const productosAgrupados = datos.reduce((result, dato) => {
    const cliente = dato.cliente.toUpperCase(); // Asegurarse de que el cliente esté en mayúsculas
    const productos = dato.productos.respuesta;
    const cantidadTotal = productos.reduce(
      (total, producto) => total + parseInt(producto.cantidad, 10),
      0
    );

    if (!result[cliente]) {
      result[cliente] = {
        cliente,
        cantidad: cantidadTotal,
      };
    } else {
      result[cliente].cantidad += cantidadTotal; // Sumar si el cliente ya existe
    }
    return result;
  }, {});

  // Datos para el gráfico
  const seriesData = Object.values(productosAgrupados).map(
    (cliente) => cliente.cantidad
  );
  const categoriesData = Object.values(productosAgrupados).map(
    (cliente) => cliente.cliente // Solo el nombre del cliente
  );

  // Configuración del gráfico de columnas
  const chartOptions = {
    chart: {
      height: 350,
      type: "bar", // Gráfico de barras verticales (columnas)
    },
    plotOptions: {
      bar: {
        columnWidth: "10%", // Ajuste del ancho de las columnas
      },
    },
    dataLabels: {
      enabled: false, // Deshabilitar etiquetas de datos
    },
    xaxis: {
      categories: categoriesData, // Clientes en el eje X
      labels: {
        style: {
          fontWeight: "bold", // Etiquetas en negrita
          textTransform: "uppercase", // Todo en mayúsculas
        },
      },
    },
    yaxis: {
      title: {
        text: "PEDIDOS POR FABRICA CANTIDAD ABERTURAS", // Título del eje Y
        style: {
          fontWeight: "bold",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} unidades`, // Formateador del tooltip
      },
    },
  };

  const series = [
    {
      name: "CANTIDAD TOTAL", // Nombre de la serie
      data: seriesData, // Datos para el gráfico
    },
  ];

  return (
    <div className="bg-white py-10 px-10 z-[100] shadow-xl rounded-xl mt-10 w-full cursor-pointer scrollbar-hidden max-md:overflow-x-scroll">
      <div id="chart" className="max-md:w-[1000px]">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar" // Gráfico de barras verticales (columnas)
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ApexChart;
