import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Search } from "../ui/Search";
import { Link } from "react-router-dom";
import { useAberturasContext } from "../../context/AluminioAberturas";
import { useRemitoContext } from "../../context/RemitoProvider";
// import { ModalSeleccionarCantidadProductoPedido } from "./ModalSeleccionarCantidadProductoPedido";
// import { ModalSeleccionarCantidadProductoFacturacion } from "./ModalSeleccionarCantidadProductoFacturacion";

export const ModalSeleccionarAberturasRemito = () => {
  const { search, searcher, results } = useAberturasContext();
  const {
    handleSeleccionarProducto,
    errorProducto,
    isOpenProductos,
    closeModalProductos,
    obtenerTodosLosDatos,
    addToProductos,
  } = useRemitoContext();

  const randomIdString = Math.random().toString().substring(2); // Get the random part as a string
  const randomIdNumber = parseInt(randomIdString, 10);

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
              <div className="w-1/2 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Elegir Abertura
                </Dialog.Title>
                <Search search={search} searcher={searcher} />
                {errorProducto && (
                  <div>
                    <span className="bg-red-500 py-2 px-2 text-white font-bold rounded-md">
                      ¡El producto ya existe!
                    </span>
                  </div>
                )}
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full h-[300px] overflow-y-scroll">
                  <table className="border-[1px]  p-[5px] table-auto w-full rounded">
                    <thead>
                      <tr>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Cliente - Casa
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
                          Cantidad
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Estado
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    {obtenerTodosLosDatos?.map((d) =>
                      d.productos.respuesta.map((c) => (
                        <tbody key={c.id}>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                            {c.cliente}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.nombre}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.detalle}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.color}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.ancho}x{c.alto}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.categoria}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.cantidad}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.cantidad === c.cantidadFaltante ? (
                              <span className="bg-green-500 py-1 px-2 rounded text-white shadow font-semibold">
                                realizada
                              </span>
                            ) : (
                              <span className="bg-red-500 py-1 px-2 rounded text-white shadow font-semibold">
                                falta
                              </span>
                            )}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            <button
                              onClick={() =>
                                addToProductos(
                                  c.id + randomIdNumber,
                                  c.nombre,
                                  c.detalle,
                                  c.color,
                                  c.categoria,
                                  c.ancho,
                                  c.alto,
                                  c.cantidad,
                                  c.cliente
                                )
                              }
                              className="bg-secondary py-1 px-2 text-white rounded font-bold hover:shadow-md hover:shadow-black/20 hover:translate-x-1 transition-all ease-in-out"
                            >
                              Seleccionar
                            </button>
                          </th>
                        </tbody>
                      ))
                    )}
                  </table>
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={() => closeModalProductos()}
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
