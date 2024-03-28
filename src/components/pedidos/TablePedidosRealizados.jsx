import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { SyncLoader } from "react-spinners";
import * as XLSX from "xlsx";

export const TablePedidosRealizados = ({
  dataNew,
  loading,
  resultadoFiltrados,
}) => {
  const [clickState, setClickState] = useState(dataNew?.map(() => false));

  useEffect(() => {
    setClickState(dataNew.map(() => true));
    setTimeout(() => {
      setClickState(dataNew.map(() => false));
    }, 100);
  }, [dataNew]);

  const handleToggle = (index) => {
    setClickState((prevClickStates) =>
      prevClickStates?.map((state, i) => (i === index ? !state : state))
    );
  };

  const descargarExcel = () => {
    const wsData = dataNew.flatMap((p) =>
      p.productos.respuesta.map((producto) => ({
        NUMERO: p.id,
        CLIENTE: p.cliente.toUpperCase(), // Mantenido como p.cliente para mostrar el cliente original (fábrica)
        DETALLE: producto.detalle.toUpperCase(),
        "TOTAL ABERTURAS": producto.cantidad,
        ANCHO: producto.ancho,
        ALTO: producto.alto,
        "CLIENTE UNICO": producto.cliente.toUpperCase(), // Cambiado para mostrar el cliente del producto
        "FECHA DE CREACIÓN": new Date(p.created_at).toLocaleDateString("es-AR"),
        "ESTADO DEL PEDIDO":
          producto.cantidad === producto.cantidadFaltante
            ? "REALIZADO"
            : "PENDIENTE",
      }))
    );

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosPedidos");
    XLSX.writeFile(wb, "datos_pedidos.xlsx");
  };

  return (
    <div>
      <button
        className="bg-black rounded-xl text-white py-2 px-6 shadow uppercase text-sm"
        onClick={descargarExcel}
        type="button"
      >
        Descargar Excel Pedido Completo
      </button>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5">
        {loading ? (
          <div className="flex justify-center items-center w-full mx-auto h-40">
            <SyncLoader color="#4A90E2" size={6} margin={6} />
            <p className="animate-blink text-slate-700 text-sm">
              Buscando los datos...
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-3 max-md:flex md:hidden">
              {resultadoFiltrados.map((p, index) => (
                <div
                  className="border-slate-300 border-[1px] shadow rounded-xl py-3 px-2 flex justify-between items-center"
                  key={p.id}
                >
                  <div className="w-full">
                    <p className="font-bold text-slate-700 text-xs">{p.id}</p>
                    <p className="font-bold text-slate-700 text-xs uppercase">
                      - Cliente:{" "}
                      <span className="font-normal">{p.cliente}</span>
                    </p>
                    <p className="font-bold text-slate-700 text-xs uppercase">
                      Linea: <span className="font-normal">{p.detalle}</span>
                    </p>
                    <div
                      onClick={() => handleToggle(index)}
                      className="py-3 px-3 text-sm text-left text-slate-700 uppercase"
                    >
                      {!clickState[index] ? (
                        <p className="p-3 max-md:text-xs max-md:py-3  border-slate-300 border-[1px] rounded-xl shadow cursor-pointer text-center">
                          VER CLIENTE - CLICK
                        </p>
                      ) : (
                        <div className="relative">
                          <div className="absolute top-0 right-3 cursor-pointer">
                            <IoCloseCircle className="text-2xl text-red-500 border-red-800 border-[1px] rounded-full" />
                          </div>
                          {Array.from(
                            new Set(
                              p?.productos?.respuesta?.map(
                                (item) => item.cliente
                              )
                            )
                          ).map((uniqueClient, i) => {
                            const hasF = p?.productos?.respuesta?.some(
                              (item) =>
                                item.cliente === uniqueClient &&
                                item.cantidad !== item.cantidadFaltante
                            );

                            return (
                              <div className="pt-3 cursor-pointer" key={i}>
                                {i > 0 ? " - " : ""}
                                {uniqueClient}
                                <span className="font-bold underline text-red-500 mx-1">
                                  {hasF && "FALTA REALIZAR"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <p className="mb-2 mt-2">
                      <Link
                        to={`/pedido/${p?.id}`}
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className="bg-indigo-500 py-2 px-6 text-white rounded-xl text-sm cursor-pointer max-md:text-sm"
                      >
                        Ver pedido
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm max-md:hidden md:block">
              <thead>
                <tr>
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Numero
                  </th>
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Cliente
                  </th>
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Detalle de linea - categoria
                  </th>
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Total aberturas
                  </th>
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Clientes
                  </th>
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Fecha de creación
                  </th>
                  {/* <th className="p-3 max-md:py-1 max-md:px-3 max-md:text-sm">Remito</th> */}
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Estado del pedido
                  </th>{" "}
                  {/* <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Eliminar
              </th> */}
                  <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                    Ver pedido
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultadoFiltrados?.map((p, index) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer"
                  >
                    <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                      {p?.id}
                    </td>
                    <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                      {p?.cliente}
                    </td>
                    <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                      {p?.detalle}
                    </td>
                    <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                      {p?.productos.respuesta.reduce((sum, b) => {
                        return sum + Number(b?.cantidad);
                      }, 0)}
                    </td>
                    <td
                      onClick={() => handleToggle(index)}
                      className="py-3 px-3 text-sm text-left text-slate-700 uppercase"
                    >
                      {!clickState[index] ? (
                        <p className="p-3 border-slate-300 border-[1px] rounded-xl shadow cursor-pointer text-center">
                          VER CLIENTE - CLICK
                        </p>
                      ) : (
                        <div className="relative">
                          <div className="absolute top-0 right-3 cursor-pointer">
                            <IoCloseCircle className="text-2xl text-red-500 border-red-800 border-[1px] rounded-full" />
                          </div>
                          {Array.from(
                            new Set(
                              p?.productos?.respuesta?.map(
                                (item) => item.cliente
                              )
                            )
                          ).map((uniqueClient, i) => {
                            const hasF = p?.productos?.respuesta?.some(
                              (item) =>
                                item.cliente === uniqueClient &&
                                item.cantidad !== item.cantidadFaltante
                            );

                            return (
                              <div className="pt-3 cursor-pointer" key={i}>
                                {i > 0 ? " - " : ""}
                                {uniqueClient}
                                <span className="font-bold underline text-red-500 mx-1">
                                  {hasF && "FALTA REALIZAR"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                      {new Date(p?.created_at).toLocaleDateString("es-AR")}
                    </td>
                    <th
                      className={`font-bold max-md:text-xs text-sm uppercase rounded-lg text-center`}
                    >
                      {p?.productos.respuesta.reduce((sum, b) => {
                        return sum + Number(b?.cantidad);
                      }, 0) ===
                      p?.productos.respuesta.reduce((sum, b) => {
                        return sum + Number(b?.cantidadFaltante);
                      }, 0) ? (
                        <p className="bg-green-500 text-white py-3 rounded-xl">
                          realizado
                        </p>
                      ) : (
                        <p className="bg-orange-500 text-white py-3 rounded-xl">
                          pendiente
                        </p>
                      )}
                    </th>

                    <td className="py-3 px-3 text-sm text-left text-slate-700">
                      <Link
                        to={`/pedido/${p?.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600/10 border-indigo-300 border-[1px] py-2 px-4 text-indigo-600 rounded-xl text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                      >
                        Ver pedido
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
