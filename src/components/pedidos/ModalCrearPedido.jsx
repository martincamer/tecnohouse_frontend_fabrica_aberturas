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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <div className="inline-block w-[1220px] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Crear el pedido
                </Dialog.Title>
                <form className="mt-2 border-t pt-4 pb-4 space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">Cliente:</label>
                    <input
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none w-[300px]"
                      type="text"
                      placeholder="nombre del cliente"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">
                      Categoria del pedido:
                    </label>
                    <select
                      value={detalle}
                      onChange={(e) => setDetalle(e.target.value)}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none w-[300px] bg-white"
                      type="text"
                      placeholder="detalle"
                    >
                      <option>seleccionar</option>
                      <option>herrero</option>
                      <option>modena</option>
                    </select>
                  </div>

                  <div>
                    <button
                      className="font-semibold bg-green-500 py-2 px-6 rounded text-white shadow"
                      type="button"
                      onClick={openModalProductos}
                    >
                      Seleccionar aberturas pedido
                    </button>
                  </div>

                  <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
                    <table className="border-[1px]  p-[5px] table-auto w-full rounded">
                      <thead>
                        <tr>
                          <th className="p-2 text-sm font-extrabold text-center w-[20px]">
                            Numero
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Codigo
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Detalle
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Color
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Ancho - Alto
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Categoria
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Cliente
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Cantidad Aberturas
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productoSeleccionado.map((p) => (
                          <tr key={p.id}>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                              {p.id}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              {p.nombre}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              {p.detalle}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              {p.color}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              {p.ancho}x{p.alto}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              {p.categoria}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              {p.cliente}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              {p?.cantidad}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                              <button
                                className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer font-bold text-center"
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

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        {
                          closeModal(), handlePedido();
                        }
                      }}
                      className="bg-green-500 py-2 px-2 rounded text-white font-bold shadow-md hover:translate-x-1 transition-all ease-in-out"
                    >
                      Generar pedido
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                    onClick={closeModal}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
          <ModalSeleccionarAberturas />
        </Dialog>
      </Transition>
    </Menu>
  );
};
