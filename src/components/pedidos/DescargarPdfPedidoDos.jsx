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
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderTop: "0.5px solid #000",
    borderBottom: "0.5px solid #000",
    width: "100%",
    textTransform: "uppercase",
  },
  rowTwo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderBottom: "0.5px solid #000",
    width: "100%",
    textTransform: "uppercase",
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
    width: "1480px",
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
  row1: {
    width: "100%",
    fontSize: "10px",
    fontFamily: "Poppins",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    paddingHorizontal: "2px",
  },
  row6: {
    width: "220px",
    fontSize: "10px",
    fontFamily: "Poppins",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    paddingHorizontal: "2px",
  },
  row2: {
    width: "1480px",
    fontSize: "10px",
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
    fontSize: "10px",
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

export const DescargarPdfPedidoDos = ({ datos }) => {
  // Función para sumar la cantidad por nombre o detalle que comienza con "V"
  const sumarCantidadPorNombreODetalleQueEmpiezaConV = () => {
    const resultado = {};

    datos?.productos?.respuesta?.forEach((elemento) => {
      if (elemento.detalle && elemento.detalle.startsWith("V")) {
        const clave = elemento.nombre || elemento.detalle;
        if (resultado[clave]) {
          resultado[clave].cantidad += parseInt(elemento.cantidad, 10);
        } else {
          resultado[clave] = { ...elemento };
          resultado[clave].cantidad = parseInt(elemento.cantidad, 10);
        }
      }
    });

    return Object.values(resultado).map((elemento) => ({
      ...elemento,
      cantidad: elemento.cantidad.toString(), // Convertir la cantidad de nuevo a string si es necesario
    }));
  };

  const resultadoFinal = sumarCantidadPorNombreODetalleQueEmpiezaConV();
  // Muestra el resultado final

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

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
            alignItems: "center",
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
                fontWeight: "bold",
                display: "flex",
                gap: "12px",
              }}
            >
              Lugar o Cliente:{" "}
            </Text>
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "normal",
                textTransform: "uppercase",
              }}
            >
              {datos?.cliente}
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
                fontWeight: "semibold",
                textTransform: "uppercase",
              }}
            >
              Fecha de emición:
            </Text>
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "normal",
                textTransform: "capitalize",
              }}
            >
              {dateTime(datos?.created_at)}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.row6}>Cod.</Text>
            <Text style={styles.row5}>Detalle</Text>
            <Text style={styles.row3}>Color</Text>
            <Text style={styles.row3}>Ancho x Alto</Text>
            <Text style={styles.row3}>Cantidad</Text>
          </View>

          {resultadoFinal?.map((p) => (
            <View key={p?.id} style={styles.rowTwo}>
              <Text style={styles.row6}>{p?.nombre}</Text>
              <Text style={styles.row2}>{p?.detalle}</Text>
              <Text style={styles.row1}>{p?.color}</Text>
              <Text style={styles.row1}>
                {p?.ancho}x{p?.alto}
              </Text>
              <Text style={styles.row1}>{p?.cantidad}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            width: "90%",
            margin: "0 auto",
            paddingTop: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
                textTransform: "uppercase",
              }}
            >
              {resultadoFinal?.reduce((sum, b) => {
                return sum + Number(b?.cantidad);
              }, 0)}
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
              CATEGORIA:
            </Text>{" "}
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
                textTransform: "uppercase",
              }}
            >
              {datos?.detalle}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
