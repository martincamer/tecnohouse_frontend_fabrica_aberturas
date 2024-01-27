import { usePedidoContext } from "../context/PedidoProvider";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export const ChartJs = () => {
  const [chartData, setChartData] = useState(null);

  const { datosPresupuesto } = usePedidoContext();

  // Process data for the chart
  useEffect(() => {
    const products = {};
    datosPresupuesto.forEach((order) => {
      order.productos.respuesta.forEach((product) => {
        if (!products[product.nombre]) {
          products[product.nombre] = 0;
        }
        products[product.nombre] += parseInt(product.cantidad, 10);
      });
    });

    // Prepare data for the chart
    const labels = Object.keys(products);
    const dataValues = Object.values(products);

    // Set chart data
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Quantity",
          data: dataValues,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [datosPresupuesto]); // Include data as a dependency for useEffect

  // Check if chartData is valid before rendering the chart
  if (!chartData) {
    return null;
  }

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              type: "linear",
              position: "left",
              beginAtZero: true,
            },
            x: {
              type: "category",
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};
