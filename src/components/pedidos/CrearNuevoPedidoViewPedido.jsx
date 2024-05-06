import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import { usePedidoContext } from "../../context/PedidoProvider";
import { ModalSeleccionarAberturas } from "./ModalSeleccionarAberturas";
import { crearValorPedidoUnicos } from "../../api/factura.api";

export const CrearNuevoPedidoViewPedido = ({
  isOpenCrarPedido,
  closeModalCrearPedidos,
  datosCliente,
  setDatos,
  datos,
}) => {
  const {
    openModalProductos,
    productoSeleccionado,
    deleteProducto,
    deleteToResetProductos,
  } = usePedidoContext();

  console.log(datos);

  const onSubmit = async () => {
    try {
      const res = await crearValorPedidoUnicos(
        datosCliente.id,
        productoSeleccionado
      );

      console.log(res.data);

      // Reemplazar el arreglo de datos existente con el nuevo arreglo de productos
      const nuevosDatos = res.data.updatedResult.productos.respuesta;
      setDatos(nuevosDatos);

      // Mostrar una notificación de éxito
      toast.success(
        "¡Productos agregados exitosamente al registro existente!",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            padding: "15px",
            borderRadius: "15px",
            boxShadow: "none",
            border: "1px solid rgb(203 213 225)",
          },
        }
      );

      closeModalCrearPedidos();
    } catch (error) {
      console.error("Error durante la solicitud:", error.message);
    }
  };

  return (
    <Menu as="div" className="z-100">
      <Transition appear show={isOpenCrarPedido} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[101] overflow-y-auto scrooll-bar"
          onClose={closeModalCrearPedidos}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-10" />
          </Transition.Child>

          <div className="text-center h-full max-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-full align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full p-6 my-0 px-5 text-left align-middle transition-all transform bg-white shadow-xl rounded-none max-w-full z-[101] h-full min-h-full max-h-full">
                <div className="py-0 flex justify-end">
                  <div
                    onClick={closeModalCrearPedidos}
                    className="bg-red-100 text-red-700 py-1.5 px-1.5 rounded-xl cursor-pointer"
                  >
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
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-sm uppercase font-bold leading-6 text-gray-700"
                >
                  Crear nuevas aberturas/clientes
                </Dialog.Title>
                <form className="mt-2 border-t pt-4 pb-4 space-y-5">
                  <div>
                    <button
                      className="bg-green-500 text-white py-2.5 px-6 rounded-full font-bold uppercase text-sm max-md:text-xs hover:bg-green-500 hover:text-white hover:shadow-md transition-all ease-linear"
                      type="button"
                      onClick={openModalProductos}
                    >
                      Seleccionar aberturas pedido
                    </button>
                  </div>

                  <div className="rounded-xl shadow-lg md:block bg-white max-md:overflow-x-auto scrollbar-hidden border">
                    <table className="w-full uppercase divide-y-[1px] divide-slate-300 table">
                      <thead>
                        <tr className="divide-gray-100">
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600">
                            Detalle
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600">
                            Color
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600">
                            Ancho - Alto
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600">
                            Categoria
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600">
                            Cliente
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600">
                            Cantidad
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-left">
                        {productoSeleccionado.map((p) => (
                          <tr key={p.id} className="cursor-pointer">
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.detalle}
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.color}
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.ancho}x{p.alto}
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.categoria}
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.cliente}
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              <span className="bg-indigo-500 py-1.5 px-2.5 rounded-xl text-white shadow">
                                {p?.cantidad}
                              </span>
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              <button
                                className="justify-center px-4 py-2 text-xs text-white bg-red-500 font-semibold rounded-xl uppercase text-center flex items-center gap-2"
                                onClick={() => deleteProducto(p.id)}
                              >
                                Eliminar producto
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
                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button
                      onClick={deleteToResetProductos}
                      type="button"
                      className="bg-red-100 uppercase text-sm text-red-900 font-semibold rounded-full py-2.5 px-6 mt-2 max-md:text-sm"
                    >
                      Resetear productos
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => onSubmit()}
                      className="bg-indigo-500 rounded-full py-2.5 px-6 text-white font-semibold shadow-md hover:translate-x-1 transition-all ease-in-out max-md:text-xs uppercase text-sm"
                    >
                      Generar aberturas
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
          <ModalSeleccionarAberturas />
        </Dialog>
      </Transition>
    </Menu>
  );
};
