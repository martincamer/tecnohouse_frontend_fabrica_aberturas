import { useEffect } from "react";
import { ModalCrearPedido } from "../../../components/pedidos/ModalCrearPedido";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { useState } from "react";
import { Search } from "../../../components/ui/Search";
import { Link } from "react-router-dom";

export const Pedidos = () => {
  const { isOpen, openModal, closeModal, datosMensuales } = usePedidoContext();

  const datos = datosMensuales.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );
  const datosTwo = datosMensuales.map((c) =>
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

  const [search, setSearch] = useState("");
  const [resultadoFiltrados, setResultadosFiltrados] = useState([]);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    // Filtrar los resultados por término de búsqueda y mes seleccionado
    const filteredResults = datosMensuales.filter((dato) =>
      dato?.cliente?.toLowerCase().includes(searchTerm)
    );

    setResultadosFiltrados(
      searchTerm === "" ? datosMensuales : filteredResults
    );
  };

  // Use useEffect to update filtered results when the search term changes
  useEffect(() => {
    setResultadosFiltrados(search === "" ? datosMensuales : resultadoFiltrados);
  }, [datosMensuales, search]);

  return (
    <>
      <div className="max-md:hidden h-full w-full">
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
            Bienvenido a la parte de aberturas/stock/fabrica 🖐️🚀.
          </p>
        </div>
        <section className="flex flex-col gap-10 min-h-screen px-10">
          <div>
            <div className="mt-5 max-md:overflow-x-scroll">
              <div className="grid grid-cols-4 uppercase gap-3">
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
                      {datosMensuales.length % 100}%
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
                        {datosMensuales.length}{" "}
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

            <Search search={search} searcher={searcher} />

            <TablePedidos
              resultadoFiltrados={resultadoFiltrados}
              datosMensuales={datosMensuales}
            />

            <ModalCrearPedido isOpen={isOpen} closeModal={closeModal} />
          </div>
        </section>
      </div>
    </>
  );
};
