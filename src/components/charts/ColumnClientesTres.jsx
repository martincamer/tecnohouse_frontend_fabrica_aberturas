import React from "react";
import Chart from "react-apexcharts";

const ColumnClientesTres = ({ datosPresupuesto }) => {
  // Agrupar los productos por cliente y contar la cantidad de clientes repetidos
  const clientesRepetidos = datosPresupuesto.reduce((acc, rendicion) => {
    rendicion.productos.respuesta.forEach((producto) => {
      const cliente = producto.cliente;
      acc[cliente] = (acc[cliente] || 0) + 1;
    });
    return acc;
  }, {});

  // Obtener los nombres de cliente repetidos y la cantidad de repeticiones
  const clientes = Object.keys(clientesRepetidos);
  const repeticiones = Object.values(clientesRepetidos);

  // Calcular el total de clientes repetidos
  const totalClientesRepetidos = repeticiones.reduce(
    (total, cantidad) => total + cantidad,
    0
  );

  // Configurar opciones del gráfico
  const options = {
    chart: {
      type: "donut",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    labels: clientes.concat("Total"), // Agregar "Total" como etiqueta adicional
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
  const series = repeticiones.concat(totalClientesRepetidos); // Agregar el total de clientes repetidos

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="donut"
        className="max-md:w-[100%] md:w-[100%] uppercase"
        height={300}
      />
    </div>
  );
};

export default ColumnClientesTres;
