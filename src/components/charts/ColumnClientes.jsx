import React from "react";
import Chart from "react-apexcharts";

const ColumnClientes = ({ datosPresupuesto }) => {
  // Agrupar los productos por cliente y sumar la cantidad total por cliente
  const clientesData = datosPresupuesto.reduce((acc, rendicion) => {
    rendicion.productos.respuesta.forEach((producto) => {
      const cliente = producto.cliente;
      if (acc[cliente]) {
        acc[cliente].cantidad += parseInt(producto.cantidad);
      } else {
        acc[cliente] = {
          cliente: cliente,
          cantidad: parseInt(producto.cantidad),
          fecha: rendicion.created_at.split("T")[0], // Obtener solo la fecha
        };
      }
    });
    return acc;
  }, {});

  // Obtener los nombres de cliente y la cantidad total de productos por cliente
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
        columnWidth: "30%",
        // Ajustar el ancho de las columnas si es necesario
        borderRadius: "10",
        borderRadiusApplication: "end",
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
        colors: ["#FFFFFF"],
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
      name: "CANTIDAD DE ABERTURAS",
      data: cantidadProductosPorCliente.map(
        (clienteData) => clienteData.cantidad
      ),
    },
  ];

  return (
    <div className="w-full max-md:overflow-x-scroll">
      <Chart
        options={options}
        series={series}
        type="bar"
        className="max-md:w-[1500px] md:w-[100%] uppercase"
        height={300}
      />
    </div>
  );
};

export default ColumnClientes;
