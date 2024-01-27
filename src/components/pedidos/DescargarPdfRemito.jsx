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

// import poppinsBold from "../../fonts/Poppins-Bold.ttf";

import logo from "../../../public/logo.png";

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
    margin: "8px auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    width: "100%",
    backgroundColor: "#11212d",
    color: "white",
  },
  rowTwo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderBottom: "1px solid #000",
    width: "100%",
    backgroundColor: "#f0f0f0",
    color: "#11212d",
  },
  content_row: {
    border: "1px solid #000",
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
    // borderRight: "1px solid #000",
    // borderLeft: "1px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "6px",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  row5: {
    width: "900px",
    // borderRight: "1px solid #000",
    // borderLeft: "1px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "6px",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  row1: {
    width: "100%",
    fontSize: "6px",
    fontFamily: "Montserrat",
    paddingTop: 8,
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    textTransform: "uppercase",
  },
  row2: {
    width: "900px",
    fontSize: "6px",
    fontFamily: "Montserrat",
    paddingTop: 8,
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    textTransform: "uppercase",
  },
  row4: {
    width: "50%",
    fontSize: "6px",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    paddingTop: 8,
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000",
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

export const DescargarPdfPedidoTres = ({ datos }) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  // const sumarCantidad = datos?.productos?.respuesta?.map((c) => c.cantidad);

  // let data = sumarCantidad?.reduce((sum, b) => {
  //   return sum + Number(b);
  // }, 0);

  const totalAberturas = () => {
    return datos?.productos?.respuesta?.reduce((sum, b) => {
      return sum + Number(b?.cantidad);
    }, 0);
  };

  return (
    <Document pageMode="fullScreen">
      <Page style={styles.content}>
        <View
          style={{
            backgroundColor: "#ccd0cf",
            color: "#06141b",
          }}
        >
          <View
            style={{
              width: "90%",
              margin: "0 auto",
              padding: "20px 0px",
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
                REMITO {datos?.tipo} - cliente:
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
                {new Date(datos?.fecha).toLocaleDateString("es-AR")}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "90%",
              margin: "0 auto",
              // padding: "30px 0px",
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
                TRASLADADO POR:
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  textTransform: "uppercase",
                }}
              >
                {datos?.trasladado}
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
                NUM DE REMITO:
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  textTransform: "uppercase",
                }}
              >
                {datos?.remito}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "90%",
              margin: "12px auto",
              // padding: "30px 0px",
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
                TOTAL ABERTURAS ENTREGADAS:
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  textTransform: "uppercase",
                }}
              >
                {totalAberturas()}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            margin: "30px auto",
            border: "2px",
            padding: "20px",
            borderRadius: "0px",
            borderStyle: "solid",
          }}
        >
          <View
            style={{
              width: "100%",
              margin: "5px auto",
              border: "1.5px",
              borderColor: "75706f",
              padding: "10px 10px",
              borderRadius: "5px",
              borderStyle: "solid",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                margin: "0 auto",
              }}
            >
              <View
                style={{ display: "flex", gap: "1px", alignItems: "center" }}
              >
                <Image
                  style={{
                    width: "70px",
                    height: "50px",
                  }}
                  src={logo}
                />
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "6px",
                    marginTop: "5px",
                  }}
                >
                  MARCOS CIANI 3255
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "6px",
                  }}
                >
                  VENADO TUERTO STA.FE CP 2600
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "6px",
                  }}
                >
                  IVA: RESPONSABLE INSCRIPTO
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  gap: "6px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "9px",
                      fontWeight: "semibold",
                    }}
                  >
                    REMITO {datos?.tipo}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "9px",
                    }}
                  >
                    N°:{" "}
                    <Text style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      {datos?.remito}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    FECHA:{" "}
                    <Text
                      style={{ fontWeight: "normal", fontFamily: "Montserrat" }}
                    >
                      {new Date(datos?.fecha).toLocaleDateString("es-AR")}
                    </Text>
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    CUIT:{" "}
                    <Text
                      style={{ fontWeight: "normal", fontFamily: "Montserrat" }}
                    >
                      30-71083448-9
                    </Text>
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    ING.BRUTOS:{" "}
                    <Text
                      style={{ fontWeight: "normal", fontFamily: "Montserrat" }}
                    >
                      032-03413-4 D.R.I:I008840/4
                    </Text>
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    INIC.ACT:{" "}
                    <Text
                      style={{ fontWeight: "normal", fontFamily: "Montserrat" }}
                    >
                      01/21/2008
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              margin: "10px auto",
              border: "1.5px",
              borderColor: "75706f",
              padding: "10px 10px",
              borderRadius: "5px",
              borderStyle: "solid",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                margin: "0 auto",
              }}
            >
              <View style={{ display: "flex", gap: "1px" }}>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "normal",
                    fontSize: "8px",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      fontSize: "8px",
                    }}
                  >
                    ENTREGA A:
                  </Text>{" "}
                  {datos?.cliente}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "normal",
                    fontSize: "8px",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      fontSize: "8px",
                    }}
                  >
                    FABRICA:
                  </Text>{" "}
                  {datos?.cliente}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  gap: "6px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "normal",
                      fontSize: "8px",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        fontSize: "8px",
                      }}
                    >
                      SOLICITADO POR:
                    </Text>{" "}
                    {datos?.cliente}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "normal",
                      fontSize: "8px",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        fontSize: "8px",
                      }}
                    >
                      NOMBRE Y APELLIDO:
                    </Text>{" "}
                    {datos?.solicitante}
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "normal",
                      fontSize: "8px",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        fontSize: "8px",
                      }}
                    >
                      DIRECCIÓN DE ENTREGA:
                    </Text>{" "}
                    {datos?.direccion}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.row3}>CLIENTE - CASA.</Text>
              <Text style={styles.row5}>DETALLE</Text>
              <Text style={styles.row3}>ANCHO X ALTO</Text>
              <Text style={styles.row3}>COLOR</Text>
              <Text style={styles.row3}>CATEGORIA</Text>
              <Text style={styles.row3}>CANT</Text>
            </View>

            {datos?.productos?.respuesta?.map((p) => (
              <View key={p?.id} style={styles.rowTwo}>
                <Text style={styles.row1}>{p?.cliente}</Text>
                <Text style={styles.row2}>{p?.detalle}</Text>
                <Text style={styles.row1}>
                  {p?.ancho}x{p?.alto}
                </Text>
                <Text style={styles.row1}>{p?.color}</Text>
                <Text style={styles.row1}>{p?.categoria}</Text>
                <Text style={styles.row1}>{p?.cantidad}</Text>
              </View>
            ))}

            <View
              style={{
                margin: "5px 0px",
              }}
            >
              <Text
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "3px 5px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: "9px",
                  color: "#2a384c",
                  border: "0.8px solid #2a384c",
                }}
              >
                TOTAL:{" "}
                <Text
                  style={{
                    padding: "3px 5px",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: "9px",
                    color: "#2a384c",
                  }}
                >
                  5
                </Text>
              </Text>
            </View>
          </View>
          {/* // */}
        </View>

        {/* <View
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
              }}
            >
              Fecha de entrega del pedido:
            </Text>{" "}
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              {dateTime(datos?.fecha)}
            </Text>
          </View>
        </View>{" "} */}
      </Page>
    </Document>
  );
};
