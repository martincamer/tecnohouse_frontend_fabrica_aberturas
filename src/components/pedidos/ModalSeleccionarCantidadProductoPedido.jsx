import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { usePedidoContext } from "../../context/PedidoProvider";

export const ModalSeleccionarCantidadProductoPedido = ({
  isOpenModalCantidad,
  closeModalCantidad,
}) => {
  const [cantidad, setCantidad] = useState(0);
  const [cantidadFaltante, setCantidadFaltante] = useState(0);
  const [cliente, setCliente] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [detalleProducto, setDetalleProducto] = useState("");
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const { productoUnicoState, addToProductos } = usePedidoContext();

  useEffect(() => {
    setNombreProducto(productoUnicoState.nombre || "");
    setDetalleProducto(productoUnicoState.descripcion || "");
    setAncho(productoUnicoState.ancho || "");
    setAlto(productoUnicoState.alto || "");
  }, [productoUnicoState.id]);

  const randomIdString = Math.random().toString().substring(2);
  const randomIdNumber = parseInt(randomIdString, 10);

  // Actualizar el nombre del producto cuando el usuario modifique el campo
  const handleNombreProductoChange = (e) => {
    setNombreProducto(e.target.value);
  };

  // Actualizar el detalle del producto cuando el usuario modifique el campo
  const handleDetalleProductoChange = (e) => {
    setDetalleProducto(e.target.value);
  };

  // Actualizar el nombre del producto cuando el usuario modifique el campo
  const handleAnchoProductoChange = (e) => {
    setAncho(e.target.value);
  };

  // Actualizar el detalle del producto cuando el usuario modifique el campo
  const handleAltoProductoChange = (e) => {
    setAlto(e.target.value);
  };

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenModalCantidad} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[103] overflow-y-auto"
          onClose={closeModalCantidad}
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
                <div className="py-0 flex justify-end">
                  <div
                    onClick={closeModalCantidad}
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
                  Elegir Cantidad Producto
                </Dialog.Title>

                <div className="flex flex-col gap-3 w-full">
                  <table className="table">
                    <thead>
                      <tr className="border-b-[1px] border-slate-300">
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold uppercase text-slate-700 text-left">
                          Detalle
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold uppercase text-slate-700 text-center">
                          Color
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold uppercase  text-slate-700 text-center">
                          Ancho
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold uppercase  text-slate-700 text-center">
                          Alto
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold uppercase text-slate-700 text-center">
                          Cliente
                        </th>
                        <th className="w-1/4 py-4 px-3 text-sm max-md:text-xs font-bold uppercase text-slate-700 text-center">
                          Seleccionar cantidad aberturas
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <th className="p-2 text-sm max-md:text-xs text-center font-normal text-slate-800">
                        <textarea
                          value={detalleProducto}
                          onChange={handleDetalleProductoChange}
                          type="text"
                          className="rounded-xl border-slate-300 font-bold border-[1px] shadow p-2 outline-none w-full uppercase"
                          placeholder="Detalle"
                        />
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center text-slate-800 uppercase font-bold">
                        {productoUnicoState.color}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center font-normal text-slate-800">
                        <input
                          value={ancho}
                          onChange={handleAnchoProductoChange}
                          type="text"
                          className="rounded-xl border-slate-300 border-[1px] shadow p-2 w-[60px]  text-center outline-none font-bold"
                          placeholder="ancho"
                        />
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center font-normal text-slate-800">
                        <input
                          value={alto}
                          onChange={handleAltoProductoChange}
                          type="text"
                          className="rounded-xl border-slate-300 border-[1px] shadow p-2 w-[60px] text-center outline-none font-bold"
                          placeholder="alto"
                        />
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[100px] font-normal text-slate-800">
                        <textarea
                          onChange={(e) => setCliente(e.target.value)}
                          type="text"
                          className="rounded-xl border-slate-300 border-[1px] shadow p-2 outline-none uppercase font-bold"
                          placeholder="Cliente"
                        />
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[100px] font-normal text-slate-800">
                        <input
                          onChange={(e) => setCantidad(e.target.value)}
                          type="number"
                          className="rounded-xl uppercase border-slate-300 border-[1px] shadow p-2 w-[120px] text-center outline-none font-bold"
                          placeholder="cantidad"
                        />
                      </th>
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    onClick={() => {
                      addToProductos(
                        productoUnicoState.id + randomIdNumber,
                        nombreProducto || productoUnicoState.nombre,
                        detalleProducto || productoUnicoState.descripcion,
                        productoUnicoState.color,
                        productoUnicoState.categoria,
                        ancho || productoUnicoState.ancho,
                        alto || productoUnicoState.alto,
                        cliente,
                        cantidad,
                        cantidadFaltante
                      );
                      closeModalCantidad();
                    }}
                    className="bg-indigo-500 uppercase max-md:text-xs text-white py-2 px-5 text-sm rounded-xl font-normal hover:shadow-md hover:shadow-black/20 hover:translate-x-1 transition-all ease-in-out"
                  >
                    Crear el producto para el pedido.
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
