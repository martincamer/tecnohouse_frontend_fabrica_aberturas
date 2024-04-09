import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { editarColor, obtenerUnicaColor } from "../../api/coloresAberturas.api";
import { useAberturasContext } from "../../context/AluminioAberturas";
import { toast } from "react-toastify";

export const ModalEditarColor = () => {
  const {
    colores,
    setColores,
    obtenerIdColores,
    closeModalEditarColor,
    openModalEditarColor,
    isOpenEditarColor,
  } = useAberturasContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicaColor(obtenerIdColores);

      setValue("color", res.data.color);
      setValue("id", res.data.id);
    }

    loadData();
  }, [openModalEditarColor]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await editarColor(obtenerIdColores, data);

    const objetEN = JSON.parse(res.config.data);

    const coloresActualizados = colores.map((colorState) =>
      colorState.id === objetEN.id ? objetEN : colorState
    );

    setColores(coloresActualizados);

    // setPerfiles(proyectoActualizado);
    toast.success("¡Color editado correctamente!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        padding: "15px",
        borderRadius: "15px",
        boxShadow: "none",
        border: "1px solid rgb(203 213 225)",
      },
    });
  });

  return (
    <Menu as="div" className="z-50">
      {/* <ToastContainer /> */}
      <Transition appear show={isOpenEditarColor} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditarColor}
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[350px]">
                <div className="py-3 pb-6 flex justify-end">
                  <div
                    onClick={closeModalEditarColor}
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
                  className="text-sm uppercase font-bold leading-6 text-gray-700"
                >
                  Editar color
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 text-sm"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Editar el color:
                    </label>
                    <input
                      {...register("color", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      type="text"
                      placeholder="Editar color"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      No modificar el ID color:
                    </label>
                    <input
                      {...register("id", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      type="text"
                      placeholder="id no tocar"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-100 text-sm hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl shadow shadow-black/10 outline-none text-indigo-500 font-normal text-center cursor-pointer max-md:text-xs uppercase hover:bg-indigo-500 hover:text-white"
                      type="submit"
                      value={"Editar color"}
                      onClick={closeModalEditarColor}
                    />
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
