import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerFactura } from "../../../api/factura.api";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import poppinsBold from "../../../fonts/Poppins-Bold.ttf";
import poppinsSemiBold from "../../../fonts/Poppins-SemiBold.ttf";
import poppinsRegular from "../../../fonts/Poppins-Regular.ttf";

export const ViewPedidoPdf = () => {
  const [datos, setDatos] = useState([]);
  const [obtenerId, setObtenerId] = useState("");
  const params = useParams();

  console.log(datos);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFactura(params.id);

      setDatos(res.data);
    }
    loadData();
  }, []);

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
      width: "95%",
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
    row1: {
      width: "100px",
      borderRight: "0.5px solid #000",
      borderLeft: "0.5px solid #000",
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: "center",
      height: "100%",
      fontSize: "12px",
      fontFamily: "Poppins",
      fontWeight: "semibold",
    },
    row2: {
      width: "600px",
      fontSize: "12px",
      fontFamily: "Poppins",
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

  return (
    <Document
      style={{
        width: "100%",
        height: "100%",
        paddingTop: "100px",
      }}
    >
      <Page style={styles.content}>
        <View
          style={{
            paddingBottom: "20px",
          }}
        >
          <View>
            <Text>Fabrica - Cliente</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.row1}>Numero</Text>
            <Text style={styles.row1}>Cod</Text>
            <Text style={styles.row2}>Detalle</Text>
            <Text style={styles.row1}>Ancho - Alto</Text>
            <Text style={styles.row1}>Cantidad</Text>
            <Text style={styles.row1}>Cliente</Text>
            <Text style={styles.row1}>Color</Text>
            <Text style={styles.row1}>Categoria</Text>
          </View>

          {datos?.productos?.respuesta?.map((p) => (
            <View key={p?.id} style={styles.rowTwo}>
              <Text style={styles.row1}>{p?.id}</Text>
              <Text style={styles.row1}>{p?.nombre}</Text>
              <Text style={styles.row2}>{p?.detalle}</Text>
              <Text style={styles.row1}>
                {p?.ancho}x{p?.alto}
              </Text>
              <Text style={styles.row1}>{p?.cantidad}</Text>
              <Text style={styles.row1}>{p?.cliente}</Text>
              <Text style={styles.row1}>{p?.color}</Text>
              <Text style={styles.row1}>{p?.categoria}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
