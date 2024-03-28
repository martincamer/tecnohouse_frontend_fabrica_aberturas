import React from "react";
import Chart from "react-apexcharts";

const ColumnClientes = ({ datosPresupuesto }) => {
  // Organizar los datos por cliente y sumar la cantidad de productos
  const clientesData = datosPresupuesto.reduce((acc, rendicion) => {
    const cliente = rendicion.cliente;
    const cantidadProductos = rendicion.productos.respuesta.reduce(
      (total, producto) => total + parseInt(producto.cantidad),
      0
    );
    acc[cliente] = (acc[cliente] || 0) + cantidadProductos;
    return acc;
  }, {});

  // Obtener los nombres de cliente y la cantidad total de productos
  const clientes = Object.keys(clientesData);
  const cantidadProductosPorCliente = Object.values(clientesData);

  // Configurar opciones del gráfico
  const options = {
    chart: {
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: clientes,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        colors: {
          ranges: [
            {
              from: Number.MIN_SAFE_INTEGER,
              to: 1,
              color: "#FF0000",
            },
          ],
          backgroundBarColors: [],
          backgroundBarOpacity: 1,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val; // Muestra la cantidad en el gráfico
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
  };

  // Configurar series del gráfico
  const series = [
    {
      name: "Cantidad de productos",
      data: cantidadProductosPorCliente,
    },
  ];

  return (
    <div className="w-full max-md:overflow-x-scroll">
      <Chart
        options={options}
        series={series}
        type="bar"
        className="max-md:w-[1500px] md:w-[100%]"
        height={500}
      />
    </div>
  );
};

export default ColumnClientes;
