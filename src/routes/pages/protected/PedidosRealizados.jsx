import { usePedidoContext } from "../../../context/PedidosMensualesProvider";
import { useState } from "react";
import { Search } from "../../../components/ui/Search";
import "moment/locale/es";
import { TablePedidosRealizados } from "../../../components/pedidos/TablePedidosRealizados";

export const PedidosRealizados = () => {
  const {
    resultadosFiltrados,
    handleMesChange,
    mesSeleccionado,
    datosPresupuesto,
    search,
    searcher,
  } = usePedidoContext();

  const datos = datosPresupuesto?.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  const datosTwo = datosPresupuesto?.map((c) =>
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

  return (
    <section className="w-full py-14 px-14 max-md:px-2 overflow-x-scroll">
      <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow py-10 px-12 max-md:px-4 max-md:py-6 w-full">
        <div>
          <p className="font-semibold text-[20px]">Pedidos Realizados</p>
        </div>

        <div className="mt-5 flex gap-5 max-md:flex-col">
          <div className="border-[1px] py-5 px-5 flex gap-2 items-center  shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Pedidos generados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {datosPresupuesto?.length}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center  shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Fecha del mes:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {nombreMes}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center  shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Total aberturas generadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {resultado}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center  shadow max-md:justify-center max-md:py-2 max-md:px-3 max-md:text-sm">
            <p>Total aberturas realizadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg max-md:text-sm">
              {resultadoTwo}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <Search search={search} searcher={searcher} />
        </div>

        <div className="flex gap-2 items-center my-4">
          <label className="font-bold text-lg" htmlFor="mes">
            Selecciona el mes:
          </label>
          <select
            className="font-semibold py-1 px-4 rounded shadow uppercase"
            id="mes"
            onChange={handleMesChange}
            value={mesSeleccionado}
          >
            <option value="">Todos los meses</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
            {/* Agregar opciones para los demás meses */}
          </select>
        </div>

        <div className="mt-5 h-[500px] overflow-y-scroll w-full">
          <TablePedidosRealizados />
        </div>
      </div>
    </section>
  );
};
