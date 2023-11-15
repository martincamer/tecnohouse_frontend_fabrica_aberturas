import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import poppinsBold from "../fonts/Poppins-Bold.ttf";
import poppinsSemiBold from "../fonts/Poppins-SemiBold.ttf";
import poppinsRegular from "../fonts/Poppins-Regular.ttf";

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
    width: "100%",
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "7px",
    fontFamily: "Poppins",
    fontWeight: "semibold",
  },
  row2: {
    width: "100%",
    fontSize: "7px",
    fontFamily: "Poppins",
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
    display: "flex",
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

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function dateTime(data) {
  return new Date(data).toLocaleDateString("arg", options);
}

export const FacturaDocumentDonwload = ({ datos, datosFacturar }) => {
  return (
    <Document>
      <Page style={styles.content}>
        <View style={styles.contentFactura}>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                fontFamily: "Poppins",
                textTransform: "capitalize",
              }}
            >
              {datosFacturar[0]?.nombre}
            </Text>
            <View
              style={{
                fontSize: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              {/* <Image
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />{" "} */}
              <Text style={{ fontSize: "10px", fontFamily: "Poppins" }}>
                Telefono: {datosFacturar[0]?.telefono}
              </Text>
            </View>
            <View
              style={{
                fontSize: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              {/* <Image
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />{" "} */}
              <Text style={{ fontSize: "9px", fontFamily: "Poppins" }}>
                Email: {datosFacturar[0]?.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              border: "0.6px solid black",
              width: "50px",
              padding: "6px 0px",
              position: "absolute",
              top: "0",
            }}
          >
            <Text
              style={{
                position: "relative",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Poppins",
                textTransform: "uppercase",
              }}
            >
              {datos?.tipo_factura}
            </Text>
            <Text
              style={{
                height: "88px",
                borderRight: "0.5px solid black",
                position: "absolute",
                top: "42px",
                left: "23px",
              }}
            ></Text>
          </View>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                fontFamily: "Poppins",
              }}
            >
              FACTURA A 000001-000{datos?.id}
            </Text>
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "semibold",
                fontFamily: "Poppins",
              }}
            >
              Factura de venta original
            </Text>
            <View
              style={{
                fontSize: "10px",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: "8px",
                }}
              >
                Fecha: {new Date().toLocaleDateString("arg")}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.content_row}>
            <View
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                  }}
                >
                  CLIENTE
                </Text>{" "}
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.clientes?.nombre} {datos?.clientes?.apellido}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                  }}
                >
                  DOMICILIO
                </Text>{" "}
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.clientes?.localidad}{" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                    textTransform: "capitalize",
                  }}
                >
                  LOCALIDAD
                </Text>{" "}
                <Text
                  style={{
                    fontSize: "8px",
                    textTransform: "capitalize",
                    fontFamily: "Poppins",
                  }}
                >
                  {datos?.clientes?.localidad}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                    textTransform: "capitalize",
                  }}
                >
                  PROVINCIA
                </Text>{" "}
                <Text
                  style={{
                    fontSize: "8px",
                    textTransform: "capitalize",
                    fontFamily: "Poppins",
                  }}
                >
                  {datos?.clientes?.provincia}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                gap: "4px",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                    textTransform: "capitalize",
                  }}
                >
                  CONDICIÓN DE VENTA
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "3",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                    textTransform: "capitalize",
                  }}
                >
                  FECHA DE VENCIMIENTO
                </Text>
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                >
                  {dateTime(datos?.created_at)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: "8px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                    textTransform: "capitalize",
                  }}
                >
                  CONDICIÓN
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.row4}>Cant.</Text>
            <Text style={styles.row1}>Cod.</Text>
            <Text style={styles.row4}>kg</Text>
            <Text style={styles.row1}>Cat.</Text>
            <Text style={styles.row1}>Color</Text>
            <Text style={styles.row1}>Detalle</Text>
            <Text style={styles.row1}> Precio total por barras</Text>
          </View>

          {datos?.productos?.respuesta.map((p) => (
            <View key={p.nobmre} style={styles.rowTwo}>
              <Text style={styles.row3}>{p.barras}</Text>
              <Text style={styles.row2}>{p.nombre}</Text>
              <Text style={styles.row3}>
                {p.totalKG.toLocaleString("arg", {
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.row2}>{p.categoria}</Text>
              <Text style={styles.row2}>{p.color}</Text>
              <Text style={styles.row2}>{p.detalle}</Text>
              <Text style={styles.row2}>
                {p.totalPrecioUnitario.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.content_footer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              TOTAL DE KG
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
              }}
            >
              {datos?.estadistica?.total_kg?.toLocaleString("arg", {
                minimumFractionDigits: 2,
              })}{" "}
              kg
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
                fontSize: "8px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              TOTAL DE PRODUCTOS
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
              }}
            >
              {datos?.estadistica?.total_barras} brs
            </Text>
          </View>
          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              TOTAL DE IVA
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
              }}
            >
              $ 1200
            </Text>
          </View> */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              Total a pagar:
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
              }}
            >
              {datos?.estadistica?.total_pagar?.toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
