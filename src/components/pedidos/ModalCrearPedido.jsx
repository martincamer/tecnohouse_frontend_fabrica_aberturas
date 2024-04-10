import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { usePedidoContext } from "../../context/PedidoProvider";
import { ModalSeleccionarAberturas } from "./ModalSeleccionarAberturas";

export const ModalCrearPedido = ({ closeModal, isOpen }) => {
  const {
    openModalProductos,
    productoSeleccionado,
    setCliente,
    setDetalle,
    cliente,
    detalle,
    handlePedido,
    deleteProducto,
    fecha,
    setFecha,
    deleteToResetProductos,
  } = usePedidoContext();

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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

          <div className="min-h-screen px-4 text-center">
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
              className="inline-block h-screen align-middle"
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
              <div className="inline-block w-[1350px] max-md:px-3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-md:w-full">
                <div className="py-3 pb-6 flex justify-end">
                  <div
                    onClick={closeModal}
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
                  className="text-sm font-bold leading-6 text-gray-700 uppercase"
                >
                  Crear el pedido
                </Dialog.Title>
                <form className="mt-2 border-t pt-4 pb-4 space-y-5">
                  <div className="flex items-start flex-col gap-2">
                    <label className="text-[14px] font-normal max-md:text-sm text-slate-700 uppercase">
                      Cliente
                    </label>
                    <select
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      className="border-slate-300 border-[1px] text-sm py-2 px-2 rounded-xl text-slate-700 shadow shadow-black/10 outline-none w-[300px] bg-white max-md:text-sm uppercase"
                    >
                      <option>SELECCIONAR</option>
                      <option>IRAOLA</option>
                      <option>BURZACO</option>
                      <option>LA PAMPA TOAY</option>
                      <option>LONG</option>
                      <option>BARRANQUERAS</option>
                      <option>MAR DEL PLATA</option>
                      <option>URUGUAY</option>
                      <option>POST VENTA</option>
                      <option>OSVALDO - DUEÑO</option>
                      <option>VENTA</option>
                    </select>
                  </div>

                  <div>
                    <button
                      className="font-normal bg-indigo-500 py-2 px-6 rounded-xl text-white shadow max-md:text-xs uppercase text-sm"
                      type="button"
                      onClick={openModalProductos}
                    >
                      Seleccionar aberturas pedido
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200 mt-5 hover:shadow cursor-pointer shadow-gray-300 transition-all ease-linear h-[30vh] overflow-y-scroll">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                      <thead>
                        <tr>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Detalle
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Color
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Ancho - Alto
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Categoria
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Cliente
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Cantidad
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productoSeleccionado.map((p) => (
                          <tr key={p.id}>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                              {p.detalle}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.color}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.ancho}x{p.alto}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.categoria}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                              {p.cliente}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                              {p?.cantidad}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              <button
                                className="inline-flex justify-center px-4 py-2 text-red-800 bg-red-100 rounded-xl hover:bg-red-200 duration-300 cursor-pointer font-normal text-center uppercase text-sm"
                                onClick={() => deleteProducto(p.id)}
                              >
                                eliminar producto
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button
                      onClick={deleteToResetProductos}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm text-red-800 bg-red-100 rounded-xl hover:bg-red-50 duration-300 cursor-pointer font-normal text-center uppercase"
                    >
                      Resetear productos
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal max-md:text-sm uppercase">
                      Fecha de entrega del pedido/estimado:
                    </label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none w-[300px] bg-white max-md:text-sm"
                      placeholder="fecha"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        {
                          closeModal(), handlePedido();
                        }
                      }}
                      className="bg-indigo-500 py-2 px-6 rounded-xl text-white font-normal shadow-md hover:translate-x-1 transition-all ease-in-out max-md:text-xs uppercase text-sm flex items-center gap-2"
                    >
                      Generar pedido{" "}
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
                          d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                        />
                      </svg>
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
