import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePedidoContext } from "../../context/PedidoProvider";

export const ModalSeleccionarCantidadProductoPedido = ({
  isOpenModalCantidad,
  closeModalCantidad,
  closeModal,
}) => {
  const [cantidad, setCantidad] = useState(0);
  const [cantidadFaltante, setCantidadFaltante] = useState(0);
  const [cliente, setCliente] = useState("");
  const { productoUnicoState, addToProductos } = usePedidoContext();

  // const generateRandomIdAsNumber = () => {
  //   const randomIdString = Math.random().toString().substring(2); // Get the random part as a string
  //   const randomIdNumber = parseInt(randomIdString, 10); // Convert the string to a base-10 integer
  //   console.log("Generated Random ID as Number:", randomIdNumber);
  // };
  const randomIdString = Math.random().toString().substring(2); // Get the random part as a string
  const randomIdNumber = parseInt(randomIdString, 10);

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenModalCantidad} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="w-2/3 max-md:w-full inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Elegir Cantidad Producto
                </Dialog.Title>

                <div className="border-[1px] border-slate-300 rounded-xl shadow-black/10 shadow flex flex-col gap-3 w-full max-md:overflow-y-scroll">
                  <table className="">
                    <thead>
                      <tr className="border-b-[1px] border-slate-300">
                        <th className="py-3 px-2 text-sm max-md:text-xs font-normal text-slate-700 text-center">
                          Numero
                        </th>
                        <th className="py-3 px-2 text-sm max-md:text-xs font-normal text-slate-700 text-center">
                          Codigo
                        </th>
                        <th className="py-3 px-2 text-sm max-md:text-xs font-normal text-slate-700 text-center">
                          Detalle
                        </th>
                        <th className="py-3 px-2 text-sm max-md:text-xs font-normal text-slate-700 text-center">
                          Color
                        </th>
                        <th className="py-3 px-2 text-sm max-md:text-xs font-normal text-slate-700 text-center">
                          Ancho x Alto
                        </th>
                        <th className="py-3 px-2 text-sm max-md:text-xs font-normal text-slate-700 text-center">
                          Cliente
                        </th>
                        <th className="py-3 px-2 text-sm max-md:text-xs font-normal text-slate-700 text-center">
                          Seleccionar cantidad aberturas
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[20px] font-normal text-slate-800">
                        {productoUnicoState.id}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[20px] font-normal text-slate-800">
                        {productoUnicoState.nombre}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[50px] font-normal text-slate-800">
                        {productoUnicoState.descripcion}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[20px] font-normal text-slate-800">
                        {productoUnicoState.color}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[20px] font-normal text-slate-800">
                        {productoUnicoState.ancho}x{productoUnicoState.alto}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[100px] font-normal text-slate-800">
                        <input
                          onChange={(e) => setCliente(e.target.value)}
                          type="text"
                          className="rounded-xl border-slate-300 border-[1px] shadow p-2 w-[180px] outline-none"
                          placeholder="Cliente"
                        />
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[100px] font-normal text-slate-800">
                        <input
                          onChange={(e) => setCantidad(e.target.value)}
                          type="number"
                          className="rounded-xl border-slate-300 border-[1px] shadow p-2 w-[180px] outline-none"
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
                        productoUnicoState.nombre,
                        productoUnicoState.descripcion,
                        productoUnicoState.color,
                        productoUnicoState.categoria,
                        productoUnicoState.ancho,
                        productoUnicoState.alto,
                        cliente,
                        cantidad,
                        cantidadFaltante
                      ),
                        closeModalCantidad();
                      // closeModal();
                    }}
                    className="bg-indigo-500 max-md:text-xs text-white py-2 px-5 text-sm rounded-xl font-normal hover:shadow-md hover:shadow-black/20 hover:translate-x-1 transition-all ease-in-out"
                  >
                    Crear producto facturar
                  </button>
                </div>
                <button
                  type="button"
                  className="max-md:text-xs inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={closeModalCantidad}
                >
                  Cerrar Ventana
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
