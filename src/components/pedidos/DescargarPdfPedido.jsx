import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import poppinsBold from "../../fonts/Montserrat-Bold.ttf";
import poppinsSemiBold from "../../fonts/Montserrat-SemiBold.ttf";
import poppinsRegular from "../../fonts/Montserrat-Regular.ttf";

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
  row1: {
    width: "100%",
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    fontWeight: "normal",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "10px",
    fontFamily: "Montserrat",
    fontWeight: "semibold",
  },
  row2: {
    width: "100%",
    fontSize: "10px",
    fontFamily: "Montserrat",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  rowCantidad: {
    width: "150px",
    fontSize: "10px",
    fontFamily: "Montserrat",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  rowCantidadTwo: {
    width: "150px",
    fontSize: "10px",
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  row3: {
    width: "50%",
    fontSize: "7px",
    fontFamily: "Montserrat",
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
    fontFamily: "Montserrat",
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
    padding: "30px 30px",
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

export const DescargarPdfPedido = ({ datos }) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  const sumarCantidadYFaltantePorNombreODetalleQueEmpiezaConP = () => {
    const resultado = {};

    datos?.productos?.respuesta.forEach((elemento) => {
      if (elemento.detalle && elemento.detalle.startsWith("P")) {
        const clave = elemento.nombre || elemento.detalle;
        if (resultado[clave]) {
          resultado[clave].cantidad += parseInt(elemento.cantidad, 10);
          resultado[clave].cantidadFaltante += parseInt(
            elemento.cantidadFaltante,
            10
          );
        } else {
          resultado[clave] = { ...elemento };
          resultado[clave].cantidad = parseInt(elemento.cantidad, 10);
          resultado[clave].cantidadFaltante = parseInt(
            elemento.cantidadFaltante,
            10
          );
        }
      }
    });

    // Filtrar elementos cuya cantidad sea diferente a cantidadFaltante
    const resultadoFiltrado = Object.values(resultado).filter(
      (elemento) => elemento.cantidad !== elemento.cantidadFaltante
    );

    return resultadoFiltrado.map((elemento) => ({
      ...elemento,
      cantidad: elemento.cantidad.toString(),
      cantidadFaltante: elemento.cantidadFaltante.toString(),
    }));
  };

  const resultadoFinal =
    sumarCantidadYFaltantePorNombreODetalleQueEmpiezaConP();
  console.log(resultadoFinal);

  const opcionesFecha = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };

  const fecha = new Date(datos?.fecha);

  const fechaLocalizada = fecha?.toLocaleDateString("es-AR", opcionesFecha);

  return (
    <Document pageMode="fullScreen">
      <Page style={styles.content}>
        <View
          style={{
            width: "90%",
            margin: "0 auto",
            padding: "20px 0px 0px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "15px",
              textDecoration: "underline",
            }}
          >
            PUERTAS - {datos?.detalle}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "15px",
              textDecoration: "underline",
            }}
          >
            PEDIDO - N°{datos?.id}
          </Text>
        </View>
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
                fontFamily: "Montserrat",
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
                fontFamily: "Montserrat",
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
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                textTransform: "uppercase",
              }}
            >
              Fecha de emición:
            </Text>
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Montserrat",
                fontWeight: "normal",
                textTransform: "uppercase",
              }}
            >
              {dateTime(datos?.created_at)}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.row1}>Categoria.</Text>
            <Text style={styles.row1}>Detalle.</Text>
            {/* <Text style={styles.row1}>Color.</Text> */}
            <Text style={styles.row1}>Ancho x Alto.</Text>
            <Text style={styles.rowCantidadTwo}>Cant.</Text>
            <Text style={styles.rowCantidadTwo}>Real.</Text>
            <Text style={styles.rowCantidadTwo}>Falt.</Text>
          </View>

          {resultadoFinal?.map((p) => (
            <View key={p?.id} style={styles.rowTwo}>
              <Text style={styles.row2}>{p?.categoria}</Text>
              <Text style={styles.row2}>{p?.detalle}</Text>
              {/* <Text style={styles.row2}>{p?.color}</Text> */}
              <Text style={styles.row2}>
                {p?.ancho}x{p?.alto}
              </Text>
              <Text style={styles.rowCantidad}>{p?.cantidad}</Text>
              <Text style={styles.rowCantidad}>{p?.cantidadFaltante}</Text>
              <Text style={styles.rowCantidad}>
                {p?.cantidad - p?.cantidadFaltante}
              </Text>
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
                fontFamily: "Montserrat",
                textTransform: "uppercase",
              }}
            >
              Total Aberturas:
            </Text>{" "}
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Montserrat",
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
                fontFamily: "Montserrat",
                textTransform: "uppercase",
              }}
            >
              CATEGORIA:
            </Text>{" "}
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Montserrat",
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
