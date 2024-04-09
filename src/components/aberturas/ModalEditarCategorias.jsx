import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  editarCategoria,
  obtenerUnicaCategoria,
} from "../../api/categoriasAberturas.api";
import { useAberturasContext } from "../../context/AluminioAberturas";
import { toast } from "react-toastify";

export const ModalEditarCategorias = () => {
  const {
    closeModalEditarCategoria,
    isOpenEditarCategorias,
    categorias,
    setCategorias,
    obtenerIdCategoria,
    openModalEditarCategoria,
  } = useAberturasContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicaCategoria(obtenerIdCategoria);

      setValue("categoria", res.data.categoria);
      setValue("id", res.data.id);
    }
    loadData();
  }, [openModalEditarCategoria]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await editarCategoria(obtenerIdCategoria, data);

    const objetEN = JSON.parse(res.config.data);

    const categoriaActualizada = categorias.map((categoriaState) =>
      categoriaState.id === objetEN.id ? objetEN : categoriaState
    );

    setCategorias(categoriaActualizada);

    toast.success("¡Categoria editada correctamente!", {
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
      <Transition appear show={isOpenEditarCategorias} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditarCategoria}
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[350px] max-md:w-full">
                <div className="py-3 pb-6 flex justify-end">
                  <div
                    onClick={closeModalEditarCategoria}
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
                  Editar categoria
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 text-sm"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Editar la categoria:
                    </label>
                    <input
                      {...register("categoria", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      type="text"
                      placeholder="Editar la categoria"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] max-md:text-sm font-normal text-slate-700">
                      No modificar el ID categoria:
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
                      className="bg-indigo-100 text-sm hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl shadow shadow-black/10 outline-none text-indigo-500 hover:bg-indigo-500 hover:text-white font-normal text-center cursor-pointer max-md:text-xs uppercase"
                      type="submit"
                      value={"Editar categoria"}
                      onClick={closeModalEditarCategoria}
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
