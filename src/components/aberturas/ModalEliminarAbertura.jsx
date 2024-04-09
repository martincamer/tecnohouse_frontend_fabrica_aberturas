import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";

export const ModalEliminarAberturas = ({
  handleBorrarAccesorioClose,
  openBorrarAccesorio,
  handleEliminar,
  p,
}) => {
  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={openBorrarAccesorio} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleBorrarAccesorioClose}
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
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="py-3 pb-6 flex justify-end">
                  <div
                    onClick={handleBorrarAccesorioClose}
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

                <div className="flex gap-5">
                  <button
                    onClick={() => {
                      {
                        {
                          handleBorrarAccesorioClose(), handleEliminar(p);
                        }
                      }
                    }}
                    className="bg-red-100 text-red-800 max-md:text-sm py-2 px-2 text-sm  rounded-xl shadow-black/20 w-full"
                  >
                    SI ELIMINAR
                  </button>
                  <button
                    type="button"
                    onClick={handleBorrarAccesorioClose}
                    className="bg-green-500 text-white max-md:text-sm  rounded-xl shadow-black/20 w-full"
                  >
                    NO ELIMINAR
                  </button>
                </div>

                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={handleBorrarAccesorioClose}
                  >
                    Cerrar Ventana
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
