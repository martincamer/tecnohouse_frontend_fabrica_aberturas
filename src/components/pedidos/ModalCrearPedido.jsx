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
    setRemito,
    remito,
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
              <div className="inline-block w-[1220px] max-md:px-3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-md:w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 max-md:text-md"
                >
                  Crear el pedido
                </Dialog.Title>
                <form className="mt-2 border-t pt-4 pb-4 space-y-5">
                  <div className="flex items-center gap-2">
                    <label className="text-[14px] font-normal max-md:text-sm text-slate-700">
                      Cliente:
                    </label>
                    <select
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      className="border-slate-300 border-[1px] text-sm py-2 px-2 rounded-xl text-slate-700 shadow shadow-black/10 outline-none w-[300px] bg-white max-md:text-sm uppercase"
                    >
                      <option>SELECCIONAR</option>
                      <option>IRAOLA</option>
                      <option>BURZACO</option>
                      <option>LONG</option>
                      <option>BARRANQUERAS</option>
                      <option>MAR DEL PLATA</option>
                      <option>URUGUAY</option>
                      <option>POST VENTA</option>
                      <option>OSVALDO - DUEÑO</option>
                      <option>VENTA</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal max-md:text-sm text-slate-700">
                      Categoria del pedido:
                    </label>
                    <select
                      value={detalle}
                      onChange={(e) => setDetalle(e.target.value)}
                      className="border-slate-300 border-[1px] text-sm py-2 px-2 rounded-xl text-slate-700 shadow shadow-black/10 outline-none w-[300px] bg-white max-md:text-sm uppercase"
                      type="text"
                      placeholder="detalle"
                    >
                      <option>SELECCIONAR</option>
                      <option>HERRERO</option>
                      <option>MODENA</option>
                      <option>MODENA A30</option>
                    </select>
                  </div>

                  <div>
                    <button
                      className="font-normal bg-indigo-500 py-2 px-6 rounded-xl text-white shadow max-md:text-xs"
                      type="button"
                      onClick={openModalProductos}
                    >
                      Seleccionar aberturas pedido
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                      <thead>
                        <tr>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Numero
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Codigo
                          </th>
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
                          <tr
                            key={p.id}
                            className="hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer"
                          >
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.id}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.nombre}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
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
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.cliente}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p?.cantidad}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              <button
                                className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 rounded-xl hover:bg-red-50 duration-300 cursor-pointer font-normal text-center border-red-900 border-[1px]"
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
                      className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 rounded-xl hover:bg-red-50 duration-300 cursor-pointer font-normal text-center border-red-900 border-[1px]"
                    >
                      Resetear productos
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal max-md:text-sm">
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

                  {/* <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold max-md:text-sm">
                      Numero del remito:
                    </label>
                    <input
                      type="text"
                      value={remito}
                      onChange={(e) => setRemito(e.target.value)}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none w-[300px] bg-white max-md:text-sm"
                      placeholder="Numero del remito"
                    />
                  </div> */}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        {
                          closeModal(), handlePedido();
                        }
                      }}
                      className="bg-indigo-500 py-2 px-6 rounded-xl text-white font-normal shadow-md hover:translate-x-1 transition-all ease-in-out max-md:text-xs"
                    >
                      Generar pedido
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
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
