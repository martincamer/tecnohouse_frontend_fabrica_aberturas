import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { SyncLoader } from "react-spinners";

export const TablePedidosRealizados = ({ dataNew, loading }) => {
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

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5">
      {loading ? (
        <div className="flex justify-center items-center w-full mx-auto h-40">
          <SyncLoader color="#4A90E2" size={6} margin={6} />
          <p className="animate-blink text-slate-700 text-sm">
            Buscando los datos...
          </p>
        </div>
      ) : (
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
            {dataNew?.map((p, index) => (
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
                          p?.productos?.respuesta?.map((item) => item.cliente)
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
                {/* <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  <button
                    className="bg-red-500/10 border-red-200 border-[1px] py-2 px-4 text-red-500 rounded-xl text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                    onClick={() => {
                      handleBorrarAccesorioOpen(), setGuardarId(p.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td> */}

                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <Link
                    to={`/pedido/${p?.id}`}
                    className="bg-indigo-600/10 border-indigo-300 border-[1px] py-2 px-4 text-indigo-600 rounded-xl text-sm cursor-pointer max-md:py-1 max-md:px-4 max-md:text-xs"
                  >
                    Ver pedido
                  </Link>
                </td>
              </tr>
            ))}

            {/* <ModalEliminarPedidoRealizado
            p={p.id}
            handleEliminar={handleDeletePresupuesto}
            openBorrarAccesorio={openBorrarAccesorio}
            handleBorrarAccesorioClose={handleBorrarAccesorioClose}
          /> */}
          </tbody>
        </table>
      )}
    </div>
  );
};
