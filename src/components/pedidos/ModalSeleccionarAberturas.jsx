import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Search } from "../ui/Search";
import { Link } from "react-router-dom";
import { usePedidoContext } from "../../context/PedidoProvider";
import { useAberturasContext } from "../../context/AluminioAberturas";
import { ModalSeleccionarCantidadProductoPedido } from "./ModalSeleccionarCantidadProductoPedido";
// import { ModalSeleccionarCantidadProductoFacturacion } from "./ModalSeleccionarCantidadProductoFacturacion";

export const ModalSeleccionarAberturas = () => {
  const { search, searcher, results } = useAberturasContext();
  const {
    handleSeleccionarProducto,
    errorProducto,
    isOpenProductos,
    closeModalProductos,
  } = usePedidoContext();

  let [isOpenModalCantidad, setIsModalCantidad] = useState(false);

  function closeModalCantidad() {
    setIsModalCantidad(false);
  }

  function openModalCantidad() {
    setIsModalCantidad(true);
  }

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenProductos} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[102] overflow-y-auto"
          onClose={closeModalProductos}
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
                    onClick={closeModalProductos}
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
                  ELEGIR UNA ABERTURA Y PONER LA CANTIDAD.
                </Dialog.Title>
                <Search
                  variable="w-2/5 border border-gray-300 shadow-none"
                  search={search}
                  searcher={searcher}
                />
                {errorProducto && (
                  <div>
                    <span className="bg-red-500 py-2 px-2 text-white font-bold rounded-md">
                      ¡El producto ya existe!
                    </span>
                  </div>
                )}
                <div className="border-[1px] border-gray-200 rounded-xl shadow-black/10 shadow w-full h-[60vh] overflow-y-scroll scroll-bar cursor-pointer">
                  <table className="p-[5px] table-auto w-full rounded uppercase divide-gray-300 divide-y-[1px] table">
                    <thead>
                      <tr>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold text-indigo-500 text-left">
                          Detalle
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold text-indigo-500 text-left">
                          Color
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold text-indigo-500 text-left">
                          Ancho - Alto
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold text-indigo-500 text-left">
                          Categoria
                        </th>
                        <th className="py-4 px-3 text-sm max-md:text-xs font-bold text-indigo-500 text-left">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    {results.map((c) => (
                      <tbody
                        className="divide-y-[1px] divide-gray-300"
                        key={c.id}
                      >
                        <tr>
                          <th className="py-4 px-4 text-sm max-md:text-xs text-left font-bold">
                            {c.descripcion}
                          </th>
                          <th className="py-4 px-4 text-sm max-md:text-xs text-left font-bold">
                            {c.color}
                          </th>
                          <th className="py-4 px-4 text-sm max-md:text-xs text-left font-bold">
                            {c.ancho}x{c.alto}
                          </th>
                          <th className="py-4 px-4 text-sm max-md:text-xs text-left font-bold">
                            {c.categoria}
                          </th>
                          <th className="py-4 px-4 text-sm max-md:text-xs w-[120px] text-left font-bold">
                            <Link
                              onClick={() => {
                                openModalCantidad(),
                                  handleSeleccionarProducto(c.id);
                              }}
                              className="bg-green-500 py-2 px-4 text-white rounded-full text-left text-sm"
                            >
                              Seleccionar
                            </Link>
                          </th>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
                <ModalSeleccionarCantidadProductoPedido
                  isOpenModalCantidad={isOpenModalCantidad}
                  closeModalCantidad={closeModalCantidad}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
