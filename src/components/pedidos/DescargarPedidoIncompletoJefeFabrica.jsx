import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import poppinsBold from "../../fonts/Montserrat-Bold.ttf";
import poppinsSemiBold from "../../fonts/Montserrat-SemiBold.ttf";
import poppinsRegular from "../../fonts/Montserrat-Regular.ttf";
import imagen from "../../../public/logo.png";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: poppinsRegular,
    },
    {
      src: poppinsSemiBold,
      fontWeight: "semibold",
    },
    {
      src: poppinsBold,
      fontWeight: "bold",
    },
  ],
});

const OrderDetails = ({ order }) => {
  const { productos } = order;

  return (
    <View style={{ margin: "10px 0" }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          borderBottom: 1,
          borderColor: "#000",
          paddingBottom: 5,
        }}
      >
        <Text
          style={{
            width: "33%",
            fontWeight: "bold",
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            fontSize: "8px",
          }}
        >
          Cliente
        </Text>
        <Text
          style={{
            width: "33%",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Montserrat",
            fontSize: "8px",
          }}
        >
          Detalle
        </Text>
        <Text
          style={{
            width: "20%",
            fontWeight: "bold",
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            fontSize: "8px",
          }}
        >
          Linea
        </Text>
        <Text
          style={{
            width: "10%",
            fontWeight: "bold",
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            fontSize: "8px",
          }}
        >
          Cant.
        </Text>
        <Text
          style={{
            width: "20%",
            fontWeight: "bold",
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            fontSize: "8px",
          }}
        >
          Estado
        </Text>
      </View>
      {productos.respuesta.map((producto) => (
        <View
          key={producto.id}
          style={{ flexDirection: "row", marginTop: 5, gap: 12 }}
        >
          <Text
            style={{
              width: "33%",
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: "8px",
              textTransform: "uppercase",
            }}
          >
            {producto.cliente}
          </Text>
          <Text
            style={{
              width: "33%",
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: "8px",
              textTransform: "uppercase",
            }}
          >
            {producto.detalle}
          </Text>
          <Text
            style={{
              width: "20%",
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: "8px",
              textTransform: "uppercase",
            }}
          >
            {producto.categoria}
          </Text>
          <Text
            style={{
              width: "10%",
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: "8px",
              textTransform: "uppercase",
            }}
          >
            {producto.cantidad}
          </Text>
          <Text
            style={{
              width: "20%",
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: "8px",
              backgroundColor: "#3ab059",
              textAlign: "center",
              color: "white",
              padding: "2px",
              borderRadius: "6px",
            }}
          >
            {"Entregada"}
          </Text>
        </View>
      ))}
    </View>
  );
};

export const DescargarPedidoCompletoJefeFabrica = ({ datos }) => {
  const uniqueClients = Array.from(
    new Set(datos.map((order) => order.cliente))
  );

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener el nombre del mes y el día
  const nombreMeses = [
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
  const mesActual = nombreMeses[fechaActual.getMonth()];

  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const diaSemanaActual = diasSemana[fechaActual.getDay()];
  const diaActual = fechaActual.getDate();
  const añoActual = fechaActual.getFullYear();

  const total = datos.reduce((sumaTotal, order) => {
    const sumaProductos = order.productos.respuesta.reduce(
      (total, producto) => total + parseInt(producto.cantidad, 10),
      0
    );
    return sumaTotal + sumaProductos;
  }, 0);

  return (
    <Document pageMode="fullScreen">
      <Page
        style={{
          padding: "20px 20px",
        }}
        size="A4"
      >
        <View style={{ padding: "20px 20px" }}>
          <View
            style={{
              width: "90%",
              margin: "0 auto",
              padding: "10px 0px 0px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: "80px",
                height: "50px",
              }}
              src={imagen}
            />
          </View>
          <View
            style={{
              marginBottom: "10px",
              marginTop: "20px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#000",
              padding: "10px 20px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Montserrat",
                fontWeight: "normal",
              }}
            >
              Fecha
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Montserrat",
                fontWeight: "normal",
              }}
            >
              {mesActual} /{diaSemanaActual} /{diaActual} /{añoActual}
            </Text>
          </View>

          <View
            style={{
              marginBottom: "40px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#000",
              padding: "10px 20px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Montserrat",
                fontWeight: "normal",
              }}
            >
              Total aberturas entregadas
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Montserrat",
                fontWeight: "bold",
              }}
            >
              {total}
            </Text>
          </View>
          {uniqueClients.map((cliente, index) => {
            const clientOrders = datos.filter(
              (order) => order.cliente === cliente
            );
            const totalFaltante = clientOrders.reduce((sum, order) => {
              return (
                sum +
                order.productos.respuesta.reduce(
                  (total, producto) => total + parseInt(producto.cantidad, 10),
                  0
                )
              );
            }, 0);

            return (
              <View key={index}>
                <Text
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    marginBottom: "2px",
                  }}
                >{`FABRICA: ${cliente}`}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "normal",
                    textTransform: "uppercase",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                  }}
                >
                  {`Total de aberturas entregadas:`}{" "}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {totalFaltante}
                  </Text>
                </Text>{" "}
                {clientOrders.map((order) => (
                  <OrderDetails key={order.id} order={order} />
                ))}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};
