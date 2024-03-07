import { PDFViewer } from "@react-pdf/renderer";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { DescargarPedidoCompletoJefeFabrica } from "../../../components/pedidos/DescargarPedidoIncompletoJefeFabrica";

// import { ImprimirPdf } from "./ImprirmirPdf";

export const ViewPdf = () => {
  const { results } = usePedidoContext();

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <DescargarPedidoCompletoJefeFabrica datos={results} />
    </PDFViewer>
  );
};
