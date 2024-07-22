import { ModalCrearPedido } from "../../../components/pedidos/ModalCrearPedido";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import XLSX from "xlsx";

export const Pedidos = () => {
  const { isOpen, openModal, closeModal, datosMensuales } = usePedidoContext();

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

  const [searchTerm, setSearchTerm] = useState("");

  // Obtener el primer día del mes actual
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Convertir las fechas en formato YYYY-MM-DD para los inputs tipo date
  const fechaInicioPorDefecto = firstDayOfMonth.toISOString().split("T")[0];
  const fechaFinPorDefecto = lastDayOfMonth.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(fechaInicioPorDefecto);
  const [endDate, setEndDate] = useState(fechaFinPorDefecto);

  // Filtrar por fabrica_sucursal
  const filteredPedidos = datosMensuales.filter((orden) =>
    orden.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar pedidos del mes actual
  const currentMonth = new Date().getMonth() + 1;

  const filteredByMonth = datosMensuales.filter((orden) => {
    const createdAtMonth = new Date(orden.created_at).getMonth() + 1;
    return createdAtMonth === currentMonth;
  });

  const filteredByDateRange = filteredPedidos.filter((orden) => {
    const createdAt = new Date(orden.created_at);
    return (
      (!startDate || createdAt >= new Date(startDate)) &&
      (!endDate || createdAt <= new Date(endDate))
    );
  });

  const datos = filteredByDateRange.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );
  const datosTwo = filteredByDateRange.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  let data = datos.map((c) =>
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

  const handleDescargarExcel = () => {
    // Preparar datos para exportar a Excel
    const dataToExport = filteredByDateRange.flatMap((pedido) => {
      return pedido.productos.respuesta.map((producto) => ({
        "FABRICA/PEDIDO": pedido.cliente.toUpperCase(),
        CLIENTE: producto.cliente.toUpperCase(),
        DETALLE: producto.detalle.toUpperCase(),
        ANCHOXALTO: `${producto.ancho} x ${producto.alto}`,
        "CATEGORIA/COLOR":
          producto.categoria.toUpperCase() + "/" + producto.color.toUpperCase(),
        CANTIDAD: producto.cantidad,
      }));
    });

    // Crear el libro de trabajo de Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");

    // Escribir el archivo Excel y descargarlo
    XLSX.writeFile(wb, "pedidos.xlsx");
  };

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

  const datosAgrupados = agruparPorDetalle(filteredByDateRange);

  const datosFiltrados = datosAgrupados.filter((producto) =>
    producto?.detalle?.toLowerCase()?.includes(busqueda.toLowerCase())
  );

  const totalCantidad = datosFiltrados?.reduce((sum, b) => {
    return sum + Number(b.cantidad_total);
  }, 0);

  console.log("aberturas", datosFiltrados);

  return (
    <>
      <div className="h-full w-full">
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

        <div className="px-10 md:mt-6  max-md:pt-5 max-md:px-5">
          <p className="font-bold text-2xl text-slate-600 max-md:text-lg">
            Bienvenido a la parte de pedidos 🖐️🚀.
          </p>
        </div>
        <section className="flex flex-col gap-10 min-h-screen px-10 max-md:px-5">
          <div>
            <div className="mt-5">
              <div className="grid grid-cols-4 uppercase gap-3 max-md:grid-cols-1">
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
                      {filteredByDateRange.length % 100}%
                    </span>
                  </div>

                  <div>
                    <strong class="block text-sm text-gray-500 max-md:text-xs uppercase font-semibold">
                      {" "}
                      Pedidos generados{" "}
                    </strong>

                    <p>
                      <span class="text-2xl font-bold text-gray-900 max-md:text-base uppercase">
                        {" "}
                        {filteredByDateRange.length}{" "}
                      </span>

                      <span class="text-xs text-gray-500 max-md:text-xs">
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
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>

                    <span class="text-xs font-bold uppercase">
                      {" "}
                      {nombreMes}
                    </span>
                  </div>

                  <div>
                    <strong class="block text-sm text-gray-500 max-md:text-xs uppercase font-semibold">
                      {" "}
                      Fecha del mes{" "}
                    </strong>

                    <p>
                      <span class="text-2xl font-bold text-gray-900 max-md:text-base uppercase">
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

                    <span class="text-xs font-bold uppercase">
                      {" "}
                      {resultado % 100}%
                    </span>
                  </div>

                  <div>
                    <strong class="block text-sm font-semibold text-gray-500 max-md:text-xs uppercase">
                      {" "}
                      Aberturas generadas{" "}
                    </strong>

                    <p>
                      <span class="text-2xl font-bold text-gray-900 max-md:text-base uppercase">
                        {" "}
                        {resultado}{" "}
                      </span>

                      <span class="text-xs text-gray-500 uppercase">
                        {" "}
                        {"Generadas hasta ahora"}{" "}
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

                    <span class="text-xs font-bold uppercase">
                      {" "}
                      {resultadoTwo % 100}%
                    </span>
                  </div>

                  <div>
                    <strong class="block text-sm font-semibold text-gray-500 max-md:text-xs uppercase">
                      {" "}
                      Aberturas realizadas{" "}
                    </strong>

                    <p>
                      <span class="text-2xl font-bold text-gray-900 max-md:text-base uppercase">
                        {" "}
                        {resultadoTwo}{" "}
                      </span>

                      <span class="text-xs text-gray-500 uppercase">
                        {" "}
                        {"Realizadas hasta ahora"}{" "}
                      </span>
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div className="mt-5 py-5 px-5 max-md:px-2 max-md:mt-1">
              <button
                type="button"
                onClick={openModal}
                className="uppercase py-2.5 px-6 bg-indigo-500 rounded-full shadow font-semibold text-sm text-white flex gap-2 text-center items-center max-md:text-xs"
              >
                Crear nuevo pedido
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </button>
            </div>

            {/* <Search search={search} searcher={searcher} />
             */}

            <div className="max-md:w-full w-1/4 shadow rounded-xl mb-3 mt-3 bg-white py-2 px-3 text-sm font-semibold flex items-center justify-between">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Buscar por pedidos por el cliente/suc/fabrica..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CgSearch className="text-indigo-500 text-lg" />
            </div>

            <div className="w-auto flex items-center max-md:w-full max-md:flex-col gap-2">
              <div className="rounded-xl bg-white py-1.5 px-5 text-sm max-md:w-full max-md:overflow-x-scroll font-bold flex max-md:gap-2 scrollbar-hidden">
                {/* Filtrador por fecha específica */}
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    Fecha anterior{" "}
                    <input
                      className="border border-indigo-500 py-1 px-3 outline-none rounded-md"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    Fecha actual{" "}
                    <input
                      className="border border-indigo-500 py-1 px-3 outline-none rounded-md"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* <button
                  className="bg-indigo-500 text-white px-4 py-1 ml-4 rounded-full text-xs hover:bg-orange-500 transition-all"
                  onClick={() => setStartDate("")}
                >
                  Mostrar del mes actual
                </button> */}
              </div>

              <div>
                <button
                  className="bg-green-500 py-1 text-white rounded-full font-semibold px-5"
                  onClick={handleDescargarExcel}
                >
                  Descargar pedidos filtrados formato excel.
                </button>
              </div>
              <div>
                <button className="bg-indigo-500 py-1 text-white rounded-full font-semibold px-5">
                  Ver aberturas/ventanas/realizadas.
                </button>
              </div>
            </div>

            <TablePedidos
              resultadoFiltrados={filteredByDateRange}
              datosMensuales={datosMensuales}
            />

            <ModalCrearPedido isOpen={isOpen} closeModal={closeModal} />
          </div>
        </section>
      </div>
    </>
  );
};
