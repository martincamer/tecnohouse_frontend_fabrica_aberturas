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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[1000px] max-md:w-full">
                <div className="py-3 pb-6 flex justify-end">
                  <div
                    onClick={closeModalEditarColores}
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
                  Editar o eliminar colores
                </Dialog.Title>

                <div className="grid grid-cols-4 gap-4 my-5 h-[120px] overflow-y-scroll w-full max-md:grid-cols-1">
                  {colores.map((c) => (
                    <div
                      className="bg-white max-md:text-sm border-[1px] border-slate-300  py-2 px-2 rounded-xl hover:shadow-md cursor-pointer transition-all ease-linear shadow-black/20 flex gap-2 justify-center items-center h-[58px] text-sm"
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
