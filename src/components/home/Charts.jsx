import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

const convertirFecha = (fecha) => {
  return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
};

export const Charts = ({ datosMensuales }) => {
  const cantidadesReducidas = datosMensuales.map((item) => ({
    ...item,
    productos: {
      respuesta: item.productos.respuesta.map((producto) =>
        parseInt(producto.cantidad)
      ),
    },
  }));

  // Sumar las cantidades reducidas
  const sumaCantidades = cantidadesReducidas.reduce((total, item) => {
    return (
      total +
      item.productos.respuesta.reduce((sum, cantidad) => sum + cantidad, 0)
    );
  }, 0);

  const datosConDiferencias = datosMensuales.filter((item) => {
    return item.productos.respuesta.some(
      (producto) =>
        parseInt(producto.cantidad) !== parseInt(producto.cantidadFaltante)
    );
  });

  console.log("Datos con Diferencias:", datosConDiferencias);

  const cantidadesFaltantesReducidas = datosConDiferencias.map((item) => {
    const respuesta = item.productos.respuesta.map((producto) => {
      const cantidad = parseInt(producto.cantidad);
      const cantidadFaltante = parseInt(producto.cantidadFaltante);

      // Incluir ambos valores
      return { cantidad, cantidadFaltante };
    });

    return {
      ...item,
      productos: {
        respuesta,
      },
    };
  });

  // Console.log para verificar cantidadesFaltantesReducidas
  console.log("Cantidades Faltantes Reducidas:", cantidadesFaltantesReducidas);

  // Sumar las cantidades faltantes reducidas
  const sumaCantidadesFaltantes = cantidadesFaltantesReducidas.reduce(
    (total, item) => {
      return (
        total +
        item.productos.respuesta.reduce(
          (sum, { cantidad, cantidadFaltante }) =>
            sum + (cantidadFaltante - cantidad),
          0
        )
      );
    },
    0
  );

  console.log("Suma de cantidades faltantes:", sumaCantidadesFaltantes);

  return (
    <BarChart
      width={1440}
      height={500}
      style={{
        padding: "20px 10px",
        margin: "0 auto",
        cursor: "pointer",
      }}
      data={[
        {
          created_at: convertirFecha(new Date()),
          sumaCantidades,
        },
      ]}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="created_at" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="sumaCantidadesFaltantes"
        name="Cantidad faltantes"
        fill="#dc3545"
      />

      <Bar dataKey="sumaCantidades" name="Cantidad Realizadas" fill="#28a745" />
    </BarChart>
  );
};
