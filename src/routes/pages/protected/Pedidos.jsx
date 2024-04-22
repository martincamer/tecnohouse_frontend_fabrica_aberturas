import { useEffect } from "react";
import { ModalCrearPedido } from "../../../components/pedidos/ModalCrearPedido";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { useState } from "react";
import { Search } from "../../../components/ui/Search";

export const Pedidos = () => {
  const { isOpen, openModal, closeModal, datosMensuales } = usePedidoContext();

  const datos = datosMensuales.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );
  const datosTwo = datosMensuales.map((c) =>
    c.productos.respuesta.map((c) => c.cantidadFaltante)
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <section className="w-full h-full min-h-full max-h-full px-12 max-md:px-4 flex flex-col gap-12 max-md:gap-8 py-24 max-md:py-8">
      <div className="w-[300px] py-5 rounded-2xl bg-slate-300 animate-pulse shadow "></div>

      <div className="rounded-xl bg-white grid grid-cols-4 gap-3 max-md:grid-cols-1 max-md:border-none max-md:shadow-none max-md:py-2 max-md:px-0">
        {[1, 2, 3, 4].map((index) => (
          <article
            key={index}
            className="animate-pulse flex items-center justify-between gap-4 rounded-2xl border-[1px] border-slate-200 bg-white py-12 px-8 hover:shadow-md transition-all ease-linear cursor-pointer"
          >
            <div className="flex gap-4 items-center">
              <div className="rounded-full bg-gray-200 animate-pulse w-9 h-9"></div>
              <div>
                <div className="bg-gray-200 animate-pulse h-8 w-24"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-20"></div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/4 py-5 px-4"></div>
        <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/5 py-5 px-4"></div>
      </div>

      <div className="border-[1px] border-slate-200 animate-pulse rounded-2xl  max-md:hidden md:block hover:shadow-md transition-all ease-linear ">
        <table className="min-w-full  uppercase">
          <thead className="bg-slate-200 rounded-xl">
            <tr>
              <th className="py-9 px-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <tr key={index}>
                <th className="py-9 px-3"></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  ) : (
    <section className="w-full py-20 max-md:py-2">
      <div className="px-5 max-md:px-4 max-md:py-6 w-full max-md:border-none max-md:shadow-none">
        <div className="flex max-md:justify-center">
          <p className="max-md:font-bold uppercase max-md:text-sm font-normal text-lg border-b-[3px] border-indigo-500 text-slate-700">
            Crear nuevos pedido fabricas/editar/ver
          </p>
        </div>

        <div className="mt-5 max-md:overflow-x-scroll">
          <div className="grid grid-cols-4 max-md:w-[1000px] gap-3 uppercase">
            <article class="flex flex-col gap-4 rounded-2xl border border-slate-300 max-md:p-3 hover:shadow-md transition-all ease-linear cursor-pointer bg-white p-5">
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

                <span class="text-xs font-medium">
                  {" "}
                  {datosMensuales.length}%
                </span>
              </div>

              <div>
                <strong class="block text-sm font-medium text-gray-500 max-md:text-xs uppercase">
                  {" "}
                  Pedidos generados{" "}
                </strong>

                <p>
                  <span class="text-2xl font-medium text-gray-900 max-md:text-base uppercase">
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

            <article class="flex flex-col gap-4 rounded-2xl border border-slate-300 max-md:p-3 hover:shadow-md transition-all ease-linear cursor-pointer bg-white p-5">
              <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
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

                <span class="text-xs font-medium uppercase"> {nombreMes}</span>
              </div>

              <div>
                <strong class="block text-sm font-medium text-gray-500 max-md:text-xs uppercase">
                  {" "}
                  Fecha del mes{" "}
                </strong>

                <p>
                  <span class="text-2xl font-medium text-gray-900 max-md:text-base uppercase">
                    {" "}
                    {nombreMes}{" "}
                  </span>
                </p>
              </div>
            </article>

            <article class="flex flex-col gap-4 rounded-2xl border border-slate-300 max-md:p-3 hover:shadow-md transition-all ease-linear cursor-pointer bg-white p-5">
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

                <span class="text-xs font-medium uppercase"> {resultado}%</span>
              </div>

              <div>
                <strong class="block text-sm font-medium text-gray-500 max-md:text-xs uppercase">
                  {" "}
                  Aberturas generadas{" "}
                </strong>

                <p>
                  <span class="text-2xl font-medium text-gray-900 max-md:text-base uppercase">
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

            <article class="flex flex-col gap-4 rounded-2xl border border-slate-300 max-md:p-3 hover:shadow-md transition-all ease-linear cursor-pointer bg-white p-5">
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

                <span class="text-xs font-medium uppercase">
                  {" "}
                  {resultadoTwo}%
                </span>
              </div>

              <div>
                <strong class="block text-sm font-medium text-gray-500 max-md:text-xs uppercase">
                  {" "}
                  Aberturas realizadas{" "}
                </strong>

                <p>
                  <span class="text-2xl font-medium text-gray-900 max-md:text-base uppercase">
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
            className="uppercase py-2 px-5 bg-indigo-500 rounded-xl shadow font-normal text-sm text-white flex gap-2 text-center items-center max-md:text-xs"
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

        <div>
          <Search search={search} searcher={searcher} />
        </div>

        <div className="mt-5 h-[500px] overflow-y-scroll w-full">
          <TablePedidos
            resultadoFiltrados={resultadoFiltrados}
            datosMensuales={datosMensuales}
          />
        </div>

        <ModalCrearPedido isOpen={isOpen} closeModal={closeModal} />
      </div>
    </section>
  );
};
