import logo from "../../../../public/logo.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerFactura } from "../../../api/remitos.api";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargarPdfPedidoTres } from "../../../components/pedidos/DescargarPdfRemito";

export const ViewRemito = () => {
  //   const { obtenerDato, unicoPresupuesto } = useRemitoContext();
  const [datos, setDatos] = useState([]);

  const params = useParams();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFactura(params.id);

      setDatos(res.data);
    }
    loadData();
  }, []);

  const sumarCantidad = datos?.productos?.respuesta?.map((c) => c.cantidad);

  let data = sumarCantidad?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  // console.log(data);s
  const totalAberturas = () => {
    return datos?.productos?.respuesta?.reduce((sum, b) => {
      return sum + Number(b?.cantidad);
    }, 0);
  };

  return (
    <section className="py-14 px-14 w-full">
      <div className="border-[1px] border-gray-200 py-10 px-10 shadow rounded">
        <div className="font-bold mb-2 text-xl">
          REMITO INTERNO - CLIENTE:{" "}
          <span className="text-blue-500 uppercase text-lg underline">
            {datos?.cliente}
          </span>
        </div>

        <div className="font-bold mb-2 text-xl">
          TRASLADADO POR:{" "}
          <span className="text-blue-500 text-lg uppercase">
            {datos?.trasladado}
          </span>
        </div>

        <div className="font-bold mb-2 text-xl">
          REMITO NUMERO:{" "}
          <span className="text-blue-500 uppercase text-lg">
            #{datos?.remito}
          </span>
        </div>
        <div className="font-bold mb-12 text-xl">
          TOTAL ABERTURAS ENTREGADAS:{" "}
          <span className="text-blue-500 uppercase text-lg">
            {totalAberturas()}
          </span>
        </div>
        <article className="w-[1220px] mx-auto border-[1px] shadow py-5 px-10 rounded flex flex-col gap-12">
          <div className="flex justify-around gap-10 items-center border-[1px] border-gray-300 py-5 shadow">
            {/* logo */}
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <img className="w-[200px]" src={logo} />
              <div>
                <p className="font-semibold">Marcos Ciani 3255</p>
                <p className="font-semibold">Venado Tuerto Sta.Fe - CP 2600</p>
                <p className="font-semibold">IVA: Responsable Inscripto</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-center">
              <div className="">
                <h4 className="font-bold text-xl">REMITO {datos?.tipo}</h4>
                <p className="font-semibold text-lg">
                  N°: <span className="font-bold">{datos?.remito}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  <span className="font-bold">FECHA</span>: 16/12/23
                </p>
                <p className="font-semibold">
                  <span className="font-bold">CUIT</span>: 30-71083448-9
                </p>
                <p className="font-semibold">
                  <span className="font-bold uppercase">Ing.Brutos</span>:
                  032-03413-4 D.R.I:008840/4{" "}
                </p>
                <p className="font-semibold">
                  <span className="font-bold uppercase">Inic.Act</span>:
                  01/12/2008
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-around gap-10 items-center border-[1px] border-gray-300 py-5 shadow">
            <div className="flex flex-col gap-1">
              <p className="font-bold">
                ENTREGA A:{" "}
                <span className="uppercase font-semibold text-sm">
                  {datos?.direccion}
                </span>{" "}
              </p>
              <p className="font-bold">
                FABRICA: <span>-</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">
                SOLICITADO POR:{" "}
                <span className="font-semibold uppercase text-sm">
                  {datos?.cliente}
                </span>{" "}
              </p>
              <p className="font-bold">
                NOMBRE Y APELLIDO:{" "}
                <span className="font-semibold uppercase text-sm">
                  {datos?.cliente}
                </span>{" "}
              </p>
              <p className="font-semibold">Condición de entrega: -</p>
              <p className="font-bold">
                DIRECCIÓN DE ENTREGA:{" "}
                <span className="font-semibold uppercase text-sm">
                  {datos?.direccion}
                </span>{" "}
              </p>
            </div>
          </div>

          <div className="overflow-y-scroll h-[600px]">
            <table className="border-[1px]  p-[5px] table-auto w-full rounded shadow border-gray-300 uppercase text-sm">
              <thead>
                <tr>
                  <th className="p-3">Cliente - Casa</th>
                  <th className="p-3">Detalle</th>
                  <th className="p-3">Ancho x Alto</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {datos?.productos?.respuesta?.map((p) => (
                  <tr key={p?.id}>
                    <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                      {p?.cliente}
                    </th>
                    <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                      {p?.detalle}
                    </th>
                    <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                      {p?.ancho}x{p?.alto}
                    </th>
                    <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                      {p?.color}
                    </th>
                    <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                      {p?.categoria}
                    </th>
                    <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                      {p?.cantidad}
                    </th>
                  </tr>
                ))}
              </tbody>
              <div className="flex gap-0">
                <p className="bg-white py-1 px-6 font-bold">Total</p>{" "}
                <span className="bg-gray-300 py-1 px-6 font-bold">{data}</span>
              </div>
            </table>
          </div>
          <div className="flex justify-around w-full gap-12">
            <div className="border-[1px] border-gray-300 w-full">
              <div>
                <p className="bg-gray-300 py-1 px-1 text-center font-bold">
                  AUTORIZACIÓN
                </p>
              </div>
              <div className="py-14"></div>
            </div>
            <div className="border-[1px] border-gray-300 w-full">
              <div>
                <p className="bg-gray-300 py-1 px-1 text-center font-bold h-auto">
                  TRASLADADO POR
                </p>
                <p className="text-center mt-5 font-bold text-2xl  uppercase"></p>
              </div>
              <div className="py-6"></div>
              <div>
                <p className="bg-gray-300 py-1 px-1 text-center font-bold">
                  RECIBE CONFORME
                </p>
              </div>
              <div className="py-6"></div>
            </div>
          </div>
        </article>
      </div>

      {console.log(datos)}
      <div className="mt-5">
        <PDFDownloadLink
          fileName={`REMITO N° ${datos?.remito}`}
          document={<DescargarPdfPedidoTres datos={datos} />}
          className="bg-green-500 py-1 px-5 rounded text-white font-semibold max-md:text-sm capitalize cursor-pointer"
        >
          Descargar remito
        </PDFDownloadLink>
      </div>
    </section>
  );
};
