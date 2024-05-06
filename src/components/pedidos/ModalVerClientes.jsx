import { Dialog, Menu, Transition } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import client from "../../api/axios";

export const ModalVerClientes = ({ isOpen, closeModal, obtenerId }) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await client(`/pedido/${obtenerId}`);

      setDatos(res.data);
    }

    loadData();
  }, [obtenerId]);

  const [clientesUnicos, setClientesUnicos] = useState([]);

  useEffect(() => {
    const clientesSet = new Set(); // Usar un conjunto para clientes únicos
    const clientesList = [];

    datos?.productos?.respuesta?.forEach((producto) => {
      const cliente = producto.cliente.toUpperCase(); // Normalizar el nombre del cliente
      if (!clientesSet.has(cliente)) {
        clientesSet.add(cliente); // Agregar al conjunto para evitar duplicados
        clientesList.push(cliente); // Mantener una lista de clientes únicos
      }
    });

    setClientesUnicos(clientesList); // Guardar la lista de clientes únicos en el estado
  }, [datos?.productos]); // Ejecutar cada vez que los productos cambien

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
              <div className="inline-block w-1/3 max-md:px-3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-md:w-full">
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
                  LOS CLIENTES ENCONTRADO SON
                </Dialog.Title>

                <div className="mt-4 h-[30vh] overflow-y-scroll scroll-bar px-2 space-y-2">
                  {clientesUnicos.map((cliente, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-slate-200 border-[1px] py-2 px-4 hover:shadow transition-all ease-linear cursor-pointer rounded-xl items-center"
                    >
                      <span className="text-sm text-gray-700 uppercase font-bold">
                        {cliente}
                      </span>
                      <span className="text-sm text-white font-semibold bg-green-500/90 py-2 px-2 rounded-xl uppercase">
                        Entregado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
