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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[101] overflow-y-auto"
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="min-h-full h-full w-full text-center">
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
              className="inline-block h-full min-h-full align-middle"
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
              <div className="inline-block p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl space-y-6 w-full h-full">
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
                  className="text-sm font-bold leading-6 text-gray-700 uppercase border-b"
                >
                  Crear el pedido
                </Dialog.Title>
                <form className="space-y-4">
                  <div className="flex items-start flex-col gap-2">
                    <label className="text-[14px] font-bold max-md:text-sm text-slate-700 uppercase">
                      Fabrica/Sucursal
                    </label>
                    <select
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      className="border-slate-300 border-[1px] text-sm py-2 px-2 rounded-xl text-slate-700 shadow shadow-black/10 outline-none w-[300px] bg-white max-md:text-sm uppercase font-bold cursor-pointer"
                    >
                      <option>SELECCIONAR FABRICA/SUC.</option>
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
                      <option>ABERTURAS</option>
                      <option>-</option>
                    </select>
                  </div>

                  <div>
                    <button
                      className="font-bold bg-indigo-500 py-2.5 px-6 rounded-full text-white shadow max-md:text-xs uppercase text-sm"
                      type="button"
                      onClick={openModalProductos}
                    >
                      Seleccionar aberturas pedido
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200 mt-5 hover:shadow cursor-pointer shadow-gray-300 transition-all ease-linear h-[40vh] overflow-y-scroll scroll-bar">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table">
                      <thead>
                        <tr>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                            Cliente
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                            Detalle
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                            Color
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                            Ancho - Alto
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                            Categoria
                          </th>

                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                            Cantidad
                          </th>
                          <th className="py-6 px-3 font-bold uppercase text-sm text-indigo-600 text-left">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productoSeleccionado.map((p) => (
                          <tr key={p.id}>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                              {p.cliente}
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
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

                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                              <span className="bg-green-500 py-1.5 px-2.5 rounded-xl text-white shadow">
                                {p?.cantidad}
                              </span>
                            </th>
                            <th className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              <button
                                className="inline-flex justify-center px-6 py-3 text-white bg-red-500 rounded-full font-semibold uppercase text-sm"
                                onClick={() => deleteProducto(p.id)}
                              >
                                eliminar producto
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
                      className="inline-flex justify-center px-6 py-3 text-white bg-red-500 rounded-full font-semibold uppercase text-sm"
                    >
                      Resetear productos
                    </button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        {
                          closeModal(), handlePedido();
                        }
                      }}
                      className="bg-indigo-500 py-2.5 px-6 rounded-full text-white font-normal shadow-md hover:translate-x-1 transition-all ease-in-out max-md:text-xs uppercase text-sm flex items-center gap-2"
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
