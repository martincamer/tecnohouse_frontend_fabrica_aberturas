import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import poppinsBold from "../../fonts/Poppins-Bold.ttf";
import poppinsSemiBold from "../../fonts/Poppins-SemiBold.ttf";
import poppinsRegular from "../../fonts/Poppins-Regular.ttf";

Font.register({
  family: "Poppins",
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

const styles = StyleSheet.create({
  table: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "90%",
  },
  table_intro: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    width: "90%",
    marginBottom: "5px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderTop: "0.5px solid #000",
    borderBottom: "0.5px solid #000",
    width: "100%",
  },
  rowTwo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderBottom: "0.5px solid #000",
    width: "100%",
  },
  content_row: {
    border: "0.7px solid #000",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingHorizontal: "10px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "10px",
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row3: {
    width: "100%",
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "8px",
    fontFamily: "Poppins",
    fontWeight: "semibold",
  },
  row5: {
    width: "900px",
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "8px",
    fontFamily: "Poppins",
    textTransform: "uppercase",
  },
  row1: {
    width: "100%",
    fontSize: "8px",
    fontFamily: "Poppins",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    textTransform: "uppercase",
  },
  row2: {
    width: "1150px",
    fontSize: "8px",
    fontFamily: "Poppins",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  row4: {
    width: "50%",
    fontSize: "7px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  contentFactura: {
    width: "95%",
    margin: "10px auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    border: "0.8px solid black",
    borderRadius: "3px",
    padding: "0px 0px 50px 0px",
    position: "relative",
  },
  content_uno: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    padding: "10px",
  },
  contentFinal: {
    width: "80%",
    margin: "0 auto",
    paddingTop: "50px",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "5px",
  },
  content: {
    height: "100%",
    width: "100%",
  },
  content_page: {
    height: "100%",
    width: "100%",
    border: "1px solid black",
    borderRadius: "4px",
  },
  content_footer: {
    width: "98%",
    margin: "10px auto",
    padding: "20px",
    border: "0.6px solid #000",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    borderRadius: 2,
  },
});

export const DescargarPdfPedidoCuatro = ({
  nuevoArregloClientes,
  datosPresupuesto,
}) => {
  // Función para sumar la cantidad por nombre o detalle que comienza con "V"

  // var options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  // function dateTime(data) {
  //   return new Date(data).toLocaleDateString("arg", options);
  // }

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const datos = datosPresupuesto?.map((c) =>
    c.productos.respuesta.map((c) => c?.cantidad)
  );

  let data = datos?.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultado = data?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  const datosTwo = datosPresupuesto?.map((c) =>
    c.productos.respuesta.map((c) => c?.cantidadFaltante)
  );

  let dataTwo = datosTwo?.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultadoTwo = dataTwo?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  let nuevosDatos = [];

  let clientesUnicos = new Set();

  // Nuevo arreglo para almacenar los objetos únicos

  // Iterar sobre los datos y filtrar clientes únicos
  datosPresupuesto?.forEach((objeto) => {
    var cliente = objeto?.cliente;
    if (!clientesUnicos?.has(cliente)) {
      clientesUnicos?.add(cliente);
      nuevosDatos?.push({ cliente: cliente }); // Añadir un nuevo objeto con solo el campo "cliente"
    }
  });

  const clientes = nuevosDatos?.map((p) => p?.cliente);

  // Convertir el array en una cadena separada por comas
  const clientesSeparadosPorComas = clientes?.join(", ");

  return (
    <Document pageMode="fullScreen">
      <Page style={styles.content}>
        <View
          style={{
            width: "90%",
            margin: "0 auto",
            padding: "30px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "bold",
                display: "flex",
                gap: "12px",
                textTransform: "uppercase",
              }}
            >
              Fabricas - Clientes{" "}
            </Text>
            <View
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                textTransform: "capitalize",
                display: "flex",
                flexDirection: "column-reverse",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                  fontFamily: "Poppins",
                }}
              >
                {clientesSeparadosPorComas}.
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "normal",
                textTransform: "uppercase",
              }}
            >
              {hoy.toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {nuevoArregloClientes.map((cliente) => (
            <View>
              <View style={styles.table_intro}>
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                  }}
                >{`Cliente - Casa: ${cliente.cliente}`}</Text>
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                  }}
                >
                  {`Lugar - Entrega de las aberturas: `}
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Poppins",
                      fontWeight: "semibold",
                    }}
                  >
                    {cliente.clienteOriginal}
                  </Text>
                </Text>
              </View>

              <View style={styles.table}>
                <View style={styles.row}>
                  {/* <Text style={styles.row1}>ID</Text> */}
                  <Text style={styles.row1}>Cliente</Text>
                  <Text style={styles.row5}>Detalle</Text>
                  <Text style={styles.row1}>Cantidad</Text>
                  <Text style={styles.row1}>Realizadas</Text>
                  <Text style={styles.row1}>Ancho x Alto</Text>
                </View>

                {cliente?.productos?.map((p) => (
                  <View style={styles.rowTwo}>
                    {/* <Text style={styles.row1}>{p?.id}</Text> */}
                    <Text style={styles.row1}> {p?.cliente}</Text>
                    <Text style={styles.row5}>{p?.detalle}</Text>
                    <Text style={styles.row1}>{p?.cantidad}</Text>
                    <Text style={styles.row1}>{p?.cantidadFaltante}</Text>
                    <Text style={styles.row1}>
                      {p?.ancho}x{p?.alto}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            paddingTop: "20px",
            width: "90%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                textTransform: "uppercase",
              }}
            >
              Total Aberturas:
            </Text>{" "}
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              {resultado}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                textTransform: "uppercase",
              }}
            >
              Total Aberturas Entregadas:
            </Text>{" "}
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
                textTransform: "uppercase",
              }}
            >
              {resultadoTwo}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
