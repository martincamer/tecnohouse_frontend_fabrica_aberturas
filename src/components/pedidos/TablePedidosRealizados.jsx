import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { SyncLoader } from "react-spinners";
import * as XLSX from "xlsx";
import { ModalVerClientes } from "./ModalVerClientes";

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

  const [isClientes, setIsClientes] = useState(false);
  const [obtenerId, setObtenerId] = useState(null);

  const openClientes = () => {
    setIsClientes(true);
  };

  const closeClientes = () => {
    setIsClientes(false);
  };

  const handleID = (id) => {
    setObtenerId(id);
  };

  return (
    <div className="w-full max-w-full mt-6">
      <button
        className="bg-green-500/90 rounded-full font-bold text-white py-2.5 px-6 shadow uppercase text-sm"
        onClick={descargarExcel}
        type="button"
      >
        Descargar Excel Pedido Completo
      </button>
      <div className="overflow-y-auto scroll-bar bg-white rounded-2xl shadow-xl transition-all ease-in-out mt-5 md:block max-md:hidden">
        {loading ? (
          <div className="flex justify-center items-center w-full mx-auto h-40">
            <SyncLoader color="#4A90E2" size={6} margin={6} />
            <p className="animate-blink text-slate-700 text-sm">
              Buscando los datos...
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table">
            <thead>
              <tr>
                <th className="py-4 px-2 font-bold uppercase text-sm text-indigo-600 text-left">
                  Numero
                </th>
                <th className="py-4 px-2 font-bold uppercase text-sm text-indigo-600 text-left">
                  Fabrica/Suc.
                </th>
                <th className="py-4 px-2 font-bold uppercase text-sm text-indigo-600 text-left">
                  Total aberturas
                </th>
                <th className="py-4 px-2 font-bold uppercase text-sm text-indigo-600 text-left">
                  Clientes/Contratos
                </th>
                <th className="py-4 px-2 font-bold uppercase text-sm text-indigo-600 text-left">
                  Fecha de creación
                </th>
                <th className="py-4 px-2 font-bold uppercase text-sm text-indigo-600 text-left">
                  Ver pedido
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {resultadoFiltrados?.map((p) => (
                <tr key={p.id} className="cursor-pointer">
                  <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.id}
                  </th>
                  <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                    {p?.cliente}
                  </th>

                  <th className="py-3 px-3 text-sm text-left uppercase font-bold flex">
                    <p className="bg-green-500 text-white shadow py-2 px-3.5 rounded-xl">
                      {p?.productos.respuesta.reduce((sum, b) => {
                        return sum + Number(b?.cantidad);
                      }, 0)}
                    </p>
                  </th>

                  <th>
                    <div className="flex">
                      <button
                        onClick={() => {
                          handleID(p?.id), openClientes();
                        }}
                        type="button"
                        className="bg-indigo-100 text-indigo-600 py-2 px-6 rounded-full flex gap-2 items-center"
                      >
                        VER CLIENTES
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
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </th>

                  <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {new Date(p?.created_at).toLocaleDateString("es-AR")}
                  </th>
                  <th className="py-3 px-3 text-sm text-left text-slate-700">
                    <Link
                      to={`/pedido/${p?.id}`}
                      // // target="_blank"
                      // rel="noopener noreferrer"
                      className="bg-indigo-600/10 uppercase hover:bg-indigo-500 hover:text-white transition-all ease-in-out py-2 px-4 text-indigo-600 rounded-xl text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                    >
                      Ver pedido
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ModalVerClientes
        obtenerId={obtenerId}
        isOpen={isClientes}
        closeModal={closeClientes}
      />
    </div>
  );
};
