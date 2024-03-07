import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { ModalEditarColor } from "./ModalEditarColor";
import { useAberturasContext } from "../../context/AluminioAberturas";

export const ModalVerColores = () => {
  const {
    colores,
    isOpenEditarColores,
    handleColorSeleccionada,
    closeModalEditarColores,
    handleEliminarColor,
    openModalEditarColor,
  } = useAberturasContext();

  return (
    <Menu as="div" className="z-50">
      {/* <ToastContainer /> */}
      <Transition appear show={isOpenEditarColores} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditarColores}
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[1000px] max-md:w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Editar o eliminar colores
                </Dialog.Title>
                <div className="grid grid-cols-4 gap-4 my-5 h-[120px] overflow-y-scroll w-full max-md:grid-cols-1">
                  {colores.map((c) => (
                    <div
                      className="bg-slate-100 max-md:text-sm border-[1px] border-slate-300  py-2 px-2 rounded-xl shadow shadow-black/20 flex gap-2 justify-center items-center h-[58px] text-sm"
                      key={c.id}
                    >
                      <p className="text-slate-700 font-normal uppercase max-md:text-sm">
                        {c.color}
                      </p>
                      <BiEdit
                        onClick={() => {
                          handleColorSeleccionada(c.id);
                          openModalEditarColor();
                        }}
                        className="text-[30px] max-md:text-[30px] text-indigo-400 cursor-pointer bg-white rounded-full py-1 px-1 shadow shadow-black/20 border-[1px] border-black/30"
                      />
                      <AiFillDelete
                        onClick={() => handleEliminarColor(c.id)}
                        className="text-[30px] max-md:text-[30px] text-red-400 cursor-pointer bg-white rounded-full py-1 px-1 shadow shadow-black/20 border-[1px] border-black/30"
                      />
                    </div>
                  ))}
                </div>

                <ModalEditarColor />

                <div className="mt-4">
                  <button
                    type="button"
                    className="max-md:text-xs inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                    onClick={closeModalEditarColores}
                  >
                    Cerrar Ventana
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
