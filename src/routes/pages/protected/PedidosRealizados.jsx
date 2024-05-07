import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../../components/ui/Search";
import { TablePedidosRealizados } from "../../../components/pedidos/TablePedidosRealizados";
import { DescargarPedidoCompletoJefeFabrica } from "../../../components/pedidos/DescargarPedidoIncompletoJefeFabrica";
import { PDFDownloadLink } from "@react-pdf/renderer";
import client from "../../../api/axios";
import "moment/locale/es";
import * as XLSX from "xlsx";

export const PedidosRealizados = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [dataNew, setDatos] = useState(
    JSON.parse(localStorage.getItem("dataNew")) || []
  );

  useEffect(() => {
    const fechaInicioLocal = localStorage.getItem("fechaInicio");
    const fechaFinLocal = localStorage.getItem("fechaFin");
    const dataNewLocal = localStorage.getItem("dataNew");

    if (fechaInicioLocal) {
      setFechaInicio(fechaInicioLocal); // Establecer la fecha de inicio desde el Local Storage
    }

    if (fechaFinLocal) {
      setFechaFin(fechaFinLocal); // Establecer la fecha de fin desde el Local Storage
    }

    if (dataNewLocal) {
      setDatos(JSON.parse(dataNewLocal)); // Establecer `dataNew` desde el Local Storage
    }
  }, []); // Se ejecuta una vez al montar el componente

  // Efecto para guardar datos en el Local Storage cuando las dependencias cambian
  useEffect(() => {
    localStorage.setItem("fechaInicio", fechaInicio); // Guardar fecha de inicio
    localStorage.setItem("fechaFin", fechaFin); // Guardar fecha de fin
    localStorage.setItem("dataNew", JSON.stringify(dataNew)); // Guardar `dataNew`
  }, [fechaInicio, fechaFin, dataNew]); // Se ejecuta cuando estas variables cambian

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

  const descargarExcel = () => {
    const wsData = datosAgrupados.flatMap((grupo) =>
      grupo.productos.map((producto) => ({
        DETALLE: producto.detalle.toUpperCase(),
        ANCHO: producto.ancho,
        ALTO: producto.alto,
        CATEGORIA: producto.categoria.toUpperCase(),
        COLOR: producto.color.toUpperCase(),
        CANTIDAD: producto.cantidad_total,
      }))
    );

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosAgrupados");
    XLSX.writeFile(wb, "datos_agrupados.xlsx");
  };

  const [search, setSearch] = useState("");
  const [resultadoFiltrados, setResultadosFiltrados] = useState([]);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    // Filtrar los resultados por término de búsqueda y mes seleccionado
    const filteredResults = dataNew.filter((dato) =>
      dato?.cliente?.toLowerCase().includes(searchTerm)
    );

    setResultadosFiltrados(searchTerm === "" ? dataNew : filteredResults);
  };

  // Use useEffect to update filtered results when the search term changes
  useEffect(() => {
    setResultadosFiltrados(search === "" ? dataNew : resultadoFiltrados);
  }, [dataNew, search]);

  const [busqueda, setBusqueda] = useState("");

  // Función para manejar cambios en el campo de búsqueda
  const handleChangeBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  function agruparPorDetalle(datos) {
    const mapaProductos = {};

    datos.forEach((pedido) => {
      const productos = pedido.productos.respuesta;

      productos.forEach((producto) => {
        const clave = `${producto.detalle}-${producto.categoria}-${producto.ancho}-${producto.alto}-${producto.color}`;

        if (mapaProductos[clave]) {
          // If the product with this unique key already exists, increment the quantity
          mapaProductos[clave].cantidad_total += parseInt(
            producto.cantidad,
            10
          );
        } else {
          // If it's a new product, add it to the map
          mapaProductos[clave] = {
            detalle: producto.detalle,
            categoria: producto.categoria,
            ancho: producto.ancho,
            alto: producto.alto,
            color: producto.color,
            cantidad_total: parseInt(producto.cantidad, 10),
          };
        }
      });
    });

    // Convert the map to an array of unique products
    const resultado = Object.values(mapaProductos);

    return resultado;
  }

  const datosAgrupados = agruparPorDetalle(dataNew);

  const datosFiltrados = datosAgrupados.filter((producto) =>
    producto?.detalle?.toLowerCase()?.includes(busqueda.toLowerCase())
  );

  const totalCantidad = datosFiltrados?.reduce((sum, b) => {
    return sum + Number(b.cantidad_total);
  }, 0);

  return (
    <>
      <section className="w-full">
        <div className="w-full bg-white flex max-md:hidden">
          <Link className="text-slate-500 px-6 py-3.5 font-bold text-lg" to="/">
            Inicio
          </Link>
          <Link
            className="text-indigo-500 bg-indigo-100 px-6 py-3.5 font-bold text-lg"
            to="/pedidos"
          >
            Pedidos
          </Link>
        </div>

        <div className="px-10">
          <div className="px-0 md:mt-6  max-md:pt-5 max-md:px-5">
            <p className="font-bold text-2xl text-slate-600 max-md:text-lg">
              Bienvenido filtra tu estadistica de entregas por mes o
              semanalmente 🖐️🚀.
            </p>
          </div>
          <div>
            <div className="mt-5 grid grid-cols-4 gap-5 max-md:flex-col max-md:grid-cols-1 uppercase">
              <article class="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-xl">
                <div class="inline-flex gap-2 self-end rounded-2xl bg-green-500/90 py-2 px-3 text-white">
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

                  <span class="text-xs font-bold">
                    {" "}
                    {dataNew.length % 100}%
                  </span>
                </div>

                <div>
                  <strong class="block text-sm font-bold text-gray-500 max-md:text-xs">
                    {" "}
                    Pedidos generados{" "}
                  </strong>

                  <p>
                    <span class="text-2xl font-bold text-gray-900 max-md:text-base">
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

              <article class="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-xl">
                <div class="inline-flex gap-2 self-end rounded-2xl bg-green-500/90 py-2 px-3 text-white">
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

                  <span class="text-xs font-bold">{nombreMes}</span>
                </div>

                <div>
                  <strong class="block text-sm font-bold text-gray-500 max-md:text-xs">
                    {" "}
                    Mes Actual{" "}
                  </strong>

                  <p>
                    <span class="text-2xl font-bold text-gray-900 max-md:text-base">
                      {" "}
                      {nombreMes}{" "}
                    </span>
                  </p>
                </div>
              </article>

              <article class="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-xl">
                <div class="inline-flex gap-2 self-end rounded-2xl bg-green-500/90 py-2 px-3 text-white">
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

                  <span class="text-xs font-bold"> {resultado % 100}%</span>
                </div>

                <div>
                  <strong class="block text-sm font-bold text-gray-500">
                    {" "}
                    Total aberturas generadas{" "}
                  </strong>

                  <p>
                    <span class="text-2xl font-bold text-gray-900 max-md:text-base">
                      {" "}
                      {resultado}{" "}
                    </span>
                  </p>
                </div>
              </article>

              <article class="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-xl">
                <div class="inline-flex gap-2 self-end rounded-2xl bg-green-500/90 py-2 px-3 text-white">
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

                  <span class="text-xs font-bold"> {resultadoTwo % 100}%</span>
                </div>

                <div>
                  <strong class="block text-sm font-bold text-gray-500 max-md:text-xs">
                    {" "}
                    Total aberturas realizadas{" "}
                  </strong>

                  <p>
                    <span class="text-2xl font-bold text-gray-900 max-md:text-base">
                      {" "}
                      {resultadoTwo}{" "}
                    </span>
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-0 flex flex-col gap-4">
              <div className="mt-10 max-md:mt-2">
                <div className="flex gap-4 items-center max-md:flex-col max-md:items-start max-md:gap-2">
                  <div className="flex gap-2 items-center">
                    <label className="text-sm text-slate-600 font-bold max-md:uppercase uppercase">
                      Fecha de inicio
                    </label>
                    <input
                      className="text-sm bg-white py-1.5 font-bold uppercase px-3 rounded-xl shadow-xl cursor-pointer text-slate-700 outline-none"
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-sm text-slate-600 font-bold max-md:uppercase uppercase">
                      Fecha de fin
                    </label>
                    <input
                      className="text-sm bg-white py-1.5 font-bold uppercase px-3 rounded-xl shadow-xl cursor-pointer text-slate-700 outline-none"
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={buscarIngresosPorFecha}
                    className="bg-indigo-500 text-white text-sm  font-bold px-5 py-1 rounded-xl shadow flex items-center gap-2"
                  >
                    BUSCAR...
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
            </div>

            <div className="mt-5 flex gap-3 w-full items-center max-md:flex-col max-md:items-start">
              <Search search={search} searcher={searcher} />
              <PDFDownloadLink
                fileName="Pedido Completo Fabrica Aberturas"
                className=" bg-indigo-500 px-8 py-2.5 text-sm rounded-full shadow text-white uppercase font-bold"
                document={
                  <DescargarPedidoCompletoJefeFabrica datos={dataNew} />
                }
              >
                Descargar pedido completo PDF
              </PDFDownloadLink>
            </div>

            <TablePedidosRealizados
              resultadoFiltrados={resultadoFiltrados}
              loading={loading}
              dataNew={dataNew}
            />
          </div>

          <div className="px-4 mt-12 font-semibold text-base text-slate-600 flex">
            <h3 className="border-b-[3px] border-slate-600 uppercase text-sm">
              Aberturas total realizadas/entregadas.
            </h3>
          </div>

          <div className="w-full mt-4">
            <div className="w-1/4 max-md:w-full mb-0 px-4 font-bold py-2 rounded-full shadow-xl flex items-center bg-white">
              <input
                type="text"
                placeholder="Buscar por abertura por el detalle..."
                value={busqueda}
                onChange={handleChangeBusqueda}
                className="w-full max-w-full  uppercase text-sm outline-none bg-white"
              />
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
            </div>

            <div className="mb-5 flex">
              <p className="py-3 px-4 rounded-xl text-slate-700 font-bold flex gap-3 items-center">
                TOTAL ENCONTRADAS
                <span className="bg-indigo-500 text-lg text-white px-2 py-1 rounded-xl">
                  {totalCantidad}
                </span>
              </p>
            </div>

            <div className="overflow-y-scroll scroll-bar px-2 h-[50vh] py-2">
              <div className="bg-white shadow-xl rounded-2xl">
                {/* Tabla */}
                <table className="w-full table">
                  <thead>
                    <tr>
                      <th className="py-6 px-3 max-md:text-xs font-bold uppercase text-indigo-500 text-sm text-left">
                        Detalle
                      </th>
                      <th className="py-6 px-3 max-md:text-xs font-bold uppercase text-indigo-500 text-sm text-left">
                        AnchoxAlto
                      </th>
                      <th className="py-6 px-3 max-md:text-xs font-bold uppercase text-indigo-500 text-sm text-left">
                        Categoria
                      </th>
                      <th className="py-6 px-3 max-md:text-xs font-bold uppercase text-indigo-500 text-sm text-left">
                        Color
                      </th>
                      <th className="py-6 px-3 max-md:text-xs font-bold uppercase text-indigo-500 text-sm text-left">
                        Cantidad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosFiltrados.map((producto, index) => (
                      <tr key={index}>
                        <th className="p-2 max-md:text-xs text-sm font-bold py-4 uppercase">
                          {producto.detalle}
                        </th>
                        <th className="p-2 max-md:text-xs text-sm py-4 uppercase">
                          {producto.ancho}x{producto.alto}
                        </th>
                        <th className="p-2 max-md:text-xs text-sm font-bold py-4 uppercase">
                          {producto.categoria}
                        </th>
                        <th className="p-2 max-md:text-xs text-sm font-bold py-4 uppercase">
                          {producto.color}
                        </th>
                        <th className="p-2 max-md:text-xs text-sm font-bold py-4">
                          <span className="bg-green-600 text-white shadow py-2 px-3 rounded-xl">
                            {" "}
                            {producto.cantidad_total}
                          </span>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="my-5 w-full">
            <button
              className="bg-indigo-500 rounded-full max-md:text-xs text-white py-2.5 px-6 shadow font-semibold uppercase text-sm"
              type="button"
              onClick={descargarExcel}
            >
              Descargar excel aberturas entregadas
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
