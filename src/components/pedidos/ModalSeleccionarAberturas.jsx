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
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="w-3/4 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6 max-md:w-full">
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
                <Search variable="w-2/5" search={search} searcher={searcher} />
                {errorProducto && (
                  <div>
                    <span className="bg-red-500 py-2 px-2 text-white font-bold rounded-md">
                      ¡El producto ya existe!
                    </span>
                  </div>
                )}
                <div className="border-[1px] border-gray-200 rounded-xl shadow-black/10 shadow flex flex-col gap-3 w-full h-[300px] overflow-y-scroll ">
                  <table className="p-[5px] table-auto w-full rounded uppercase">
                    <thead className="divide-gray-300 divide-y-2">
                      <tr className="">
                        <th className="p-2 max-md:py-1 max-md:px-3 text-sm max-md:text-xs font-normal text-indigo-500 text-center">
                          Detalle
                        </th>
                        <th className="p-2 max-md:py-1 max-md:px-3 text-sm max-md:text-xs font-normal text-indigo-500 text-center">
                          Color
                        </th>
                        <th className="p-2 max-md:py-1 max-md:px-3 text-sm max-md:text-xs font-normal text-indigo-500 text-center">
                          Ancho - Alto
                        </th>
                        <th className="p-2 max-md:py-1 max-md:px-3 text-sm max-md:text-xs font-normal text-indigo-500 text-center">
                          Categoria
                        </th>
                        <th className="p-2 max-md:py-1 max-md:px-3 text-sm max-md:text-xs font-normal text-indigo-500 text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    {results.map((c) => (
                      <tbody key={c.id}>
                        <th className="border-b-[1px] border-gray-300 py-4 px-4 text-sm max-md:text-xs text-center font-normal">
                          {c.descripcion}
                        </th>
                        <th className="border-b-[1px] border-gray-300 py-4 px-4 text-sm max-md:text-xs text-center font-normal">
                          {c.color}
                        </th>
                        <th className="border-b-[1px] border-gray-300 py-4 px-4 text-sm max-md:text-xs text-center font-normal">
                          {c.ancho}x{c.alto}
                        </th>
                        <th className="border-b-[1px] border-gray-300 py-4 px-4 text-sm max-md:text-xs text-center font-normal">
                          {c.categoria}
                        </th>
                        <th className="border-b-[1px] border-gray-300 py-4 px-4 text-sm max-md:text-xs w-[120px] text-center font-normal">
                          <Link
                            onClick={() => {
                              openModalCantidad(),
                                handleSeleccionarProducto(c.id);
                            }}
                            className="bg-green-100 py-2 px-4 text-green-700 rounded-xl shadow text-center text-xs"
                          >
                            Seleccionar
                          </Link>
                        </th>
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
