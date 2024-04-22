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
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 10,
        borderRadiusApplication: "end",
        colors: {
          ranges: [
            {
              from: Number.MIN_SAFE_INTEGER,
              to: 1,
              color: "#FF0000", // Por ejemplo, para indicar valores negativos
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
    responsive: [
      {
        breakpoint: 768, // Punto de interrupción para cambiar a horizontal
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true, // Hacer el gráfico horizontal
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
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
        className="max-md:w-[100%] md:w-[100%] uppercase"
        height={300}
      />
    </div>
  );
};

export default ColumnClientes;
