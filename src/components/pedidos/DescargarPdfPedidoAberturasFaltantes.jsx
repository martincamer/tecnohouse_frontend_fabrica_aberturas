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
    textTransform: "uppercase",
  },
  row5: {
    width: "1150px",
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "8px",
    fontFamily: "Poppins",
    fontWeight: "semibold",
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
    textTransform: "uppercase",
    height: "100%",
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
    textTransform: "uppercase",
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
    textTransform: "uppercase",
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

export const DescargarPdfPedidoAberturasFaltantes = ({
  datosAgrupadosEnUno,
  resultadoFinalAberturas,
  datos,
}) => {
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
                textTransform: "uppercase",
              }}
            >
              Lugar o Cliente:{" "}
            </Text>
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "normal",
                textTransform: "capitalize",
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
                textTransform: "uppercase",
              }}
            >
              {dateTime(datos?.created_at)}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.row5}>Detalle</Text>
            <Text style={styles.row3}>Ancho x Alto</Text>
            <Text style={styles.row3}>Cantidad</Text>
            <Text style={styles.row3}>Realizadas</Text>
            <Text style={styles.row3}>Cliente</Text>
          </View>

          {datosAgrupadosEnUno?.map((p, index) =>
            p?.productos.map(
              (d) =>
                d?.cantidad !== d?.cantidadFaltante && (
                  <View key={index} style={styles.rowTwo}>
                    <Text style={styles.row2}>{d?.detalle}</Text>
                    <Text style={styles.row1}>
                      {d?.ancho}x{d?.alto}
                    </Text>
                    <Text style={styles.row1}>{d?.cantidad}</Text>
                    <Text style={styles.row1}>{d?.cantidadFaltante}</Text>
                    <Text style={styles.row1}>{d?.cliente}</Text>
                  </View>
                )
            )
          )}
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
              }}
            >
              {resultadoFinalAberturas}
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
              }}
            >
              {/* {dateTime(datos?.fecha)} */}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
