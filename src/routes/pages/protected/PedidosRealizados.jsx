import { usePedidoContext } from "../../../context/PedidosMensualesProvider";
import { useState } from "react";
import { Search } from "../../../components/ui/Search";
import "moment/locale/es";
import { TablePedidosRealizados } from "../../../components/pedidos/TablePedidosRealizados";
import { DescargarPedidoCompletoJefeFabrica } from "../../../components/pedidos/DescargarPedidoIncompletoJefeFabrica";
import { PDFDownloadLink } from "@react-pdf/renderer";
import client from "../../../api/axios";

export const PedidosRealizados = () => {
  const { search, searcher } = usePedidoContext();

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [dataNew, setDatos] = useState([]);

  const [loading, setLoading] = useState(false);

  const obtenerIngresoRangoFechas = async (fechaInicio, fechaFin) => {
    try {
      // Setea el estado de loading a true para mostrar el spinner
      setLoading(true);

      // Validación de fechas
      if (!fechaInicio || !fechaFin) {
        console.error("Fechas no proporcionadas");
        return;
      }

      // Verifica y formatea las fechas
      fechaInicio = new Date(fechaInicio).toISOString().split("T")[0];
      fechaFin = new Date(fechaFin).toISOString().split("T")[0];

      const response = await client.post("/pedido/rango-fechas", {
        fechaInicio,
        fechaFin,
      });

      setDatos(response.data); // Maneja la respuesta según tus necesidades
    } catch (error) {
      console.error("Error al obtener ingresos:", error);
      // Maneja el error según tus necesidades
    } finally {
      // Independientemente de si la solicitud es exitosa o falla, establece el estado de loading a false
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const buscarIngresosPorFecha = () => {
    obtenerIngresoRangoFechas(fechaInicio, fechaFin);
  };

  const datos = dataNew?.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  const datosTwo = dataNew?.map((c) =>
    c.productos.respuesta.map((c) => c.cantidadFaltante)
  );

  let data = datos?.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  let dataTwo = datosTwo.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultado = data?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  const resultadoTwo = dataTwo?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  let fechaActualNew = new Date();

  let nombresMeses = [
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

  let indiceMes = fechaActualNew.getMonth();

  let nombreMes = nombresMeses[indiceMes];

  console.log(dataNew);

  function agruparPorDetalle(datos) {
    const resultado = [];

    datos.forEach((pedido) => {
      const existente = resultado.find(
        (grupo) => grupo.detalle === pedido.detalle
      );

      if (existente) {
        pedido.productos.respuesta.forEach((producto) => {
          const existenteProducto = existente.productos.find(
            (p) =>
              p.categoria === producto.categoria &&
              p.ancho === producto.ancho &&
              p.alto === producto.alto &&
              p.color === producto.color
          );

          if (existenteProducto) {
            existenteProducto.cantidad_total += parseInt(producto.cantidad);
          } else {
            existente.productos.push({
              categoria: producto.categoria,
              ancho: producto.ancho,
              alto: producto.alto,
              color: producto.color,
              detalle: producto.detalle,
              cantidad_total: parseInt(producto.cantidad),
            });
          }
        });
      } else {
        const nuevoGrupo = {
          detalle: pedido.detalle,
          productos: [],
        };

        pedido.productos.respuesta.forEach((producto) => {
          nuevoGrupo.productos.push({
            categoria: producto.categoria,
            ancho: producto.ancho,
            alto: producto.alto,
            color: producto.color,
            cantidad_total: parseInt(producto.cantidad),
            detalle: producto.detalle,
          });
        });

        resultado.push(nuevoGrupo);
      }
    });

    return resultado;
  }

  function mostrarAgrupacion(datosAgrupados) {
    datosAgrupados.forEach((grupo) => {
      console.log(`Detalle: ${grupo.detalle}`);
      grupo.productos.forEach((producto) => {
        console.log(
          `  Categoria: ${producto.categoria}, Ancho: ${producto.ancho}, Alto: ${producto.alto}, Color: ${producto.color}, Cantidad Total: ${producto.cantidad_total}`
        );
      });
      console.log("\n");
    });
  }

  const datosAgrupados = agruparPorDetalle(dataNew);

  console.log(datosAgrupados);

  return (
    <section className="w-full py-20 px-14 max-md:px-2 overflow-x-scroll">
      <div className="border-[1px] border-slate-300 shadow-black/10 shadow py-10 px-12 max-md:px-4 max-md:py-6 w-full rounded-xl">
        <div className="flex">
          <p className="font-normal text-lg border-b-[3px] border-indigo-500 text-slate-700 max-md:text-lg">
            Filtrar o buscar pedidos realizados
          </p>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-5 max-md:flex-col">
          <article class="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium"> {dataNew.length}%</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500">
                {" "}
                Pedidos generados{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900">
                  {" "}
                  {dataNew.length}{" "}
                </span>

                <span class="text-xs text-gray-500">
                  {" "}
                  {"Ultimo creado el día"}{" "}
                </span>
              </p>
            </div>
          </article>

          <article class="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium">{nombreMes}</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500">
                {" "}
                Mes Actual{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900">
                  {" "}
                  {nombreMes}{" "}
                </span>
              </p>
            </div>
          </article>

          <article class="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium"> {resultado}%</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500">
                {" "}
                Total aberturas generadas{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900">
                  {" "}
                  {resultado}{" "}
                </span>
                {/* 
                <span class="text-xs text-gray-500">
                  {resultado} {"Ultimo creado el día"}{" "}
                </span> */}
              </p>
            </div>
          </article>

          <article class="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium"> {resultadoTwo}%</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500">
                {" "}
                Total aberturas realizadas{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900">
                  {" "}
                  {resultadoTwo}{" "}
                </span>
                {/* 
                <span class="text-xs text-gray-500">
                  {resultado} {"Ultimo creado el día"}{" "}
                </span> */}
              </p>
            </div>
          </article>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <div className="mt-10">
            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <label className="text-sm text-indigo-500">
                  Fecha de inicio
                </label>
                <input
                  className="text-sm bg-slate-100/10 py-1 px-2 rounded-lg shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-sm text-indigo-500">Fecha de fin</label>
                <input
                  className="text-sm bg-slate-100/10 py-1 px-2 rounded-lg shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>

              <button
                onClick={buscarIngresosPorFecha}
                className="bg-indigo-500/10 text-sm border-[1px] border-indigo-500 text-indigo-700 px-5 py-1 rounded-xl shadow flex items-center gap-2"
              >
                Buscar Ingresos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Search search={search} searcher={searcher} />
        </div>

        <div className="mt-5 flex gap-3">
          <PDFDownloadLink
            fileName="Pedido Completo Fabrica Aberturas"
            className=" bg-indigo-500 px-6 py-2 rounded-xl shadow text-white capitalize"
            document={<DescargarPedidoCompletoJefeFabrica datos={dataNew} />}
          >
            Descargar pedido completo
          </PDFDownloadLink>

          <PDFDownloadLink
            className=" bg-black/90 px-6 py-2 rounded-xl shadow text-white capitalize"
            document={<DescargarPedidoCompletoJefeFabrica datos={dataNew} />}
          >
            Descargar el total aberturas
          </PDFDownloadLink>
        </div>

        <div className="mt-5 h-[500px] overflow-y-scroll w-full">
          <TablePedidosRealizados loading={loading} dataNew={dataNew} />
        </div>
      </div>

      <div className="w-full h-full mt-10 rounded-xl">
        <div className="border-[1px] border-gray-200 rounded-xl shadow w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px2 font-bold uppercase text-indigo-500 text-sm">
                  Detalle
                </th>
                <th className="py-3 px2 font-bold uppercase text-indigo-500 text-sm">
                  Categoria
                </th>
                <th className="py-3 px2 font-bold uppercase text-indigo-500 text-sm">
                  Color
                </th>
                <th className="py-3 px2 font-bold uppercase text-indigo-500 text-sm">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {datosAgrupados.map((c) =>
                c.productos.map((c, index) => (
                  <tr key={index}>
                    <th className="border-[1px] border-gray-300 p-2 text-sm font-normal">
                      {c.detalle}
                    </th>
                    <th className="border-[1px] border-gray-300 p-2 text-sm font-normal">
                      {c.categoria}
                    </th>
                    <th className="border-[1px] border-gray-300 p-2 text-sm font-normal">
                      {c.color}
                    </th>
                    <th className="border-[1px] border-gray-300 p-2 text-sm font-bold">
                      {c.cantidad_total}
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
