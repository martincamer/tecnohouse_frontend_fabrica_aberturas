import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { crearPerfilNuevo } from "../../api/aberturas.api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAberturasContext } from "../../context/AluminioAberturas";

export const ModalCrearAberturas = ({ closeModal, isOpen }) => {
  const { setPerfiles, categorias, colores } = useAberturasContext();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await crearPerfilNuevo(data);

      setPerfiles(res.data);

      toast.success("¡Abertura creada correctamente!", {
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

      closeModal();

      reset();
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  });

  return (
    <Menu as="div" className="z-50">
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                  className="text-sm font-bold leading-6 text-slate-700 uppercase"
                >
                  Crear nuevo producto
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 text-sm"
                >
                  {error && (
                    <p className="text-sm uppercase bg-red-100 text-red-800 py-2 px-2 rounded-xl w-full mx-auto text-center">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-col gap-2">
                    {errors.nombre && (
                      <span className=" text-sm bg-red-100 text-red-800 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El codigo es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-normal text-slate-800">
                      Codigo:
                    </label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      type="text"
                      placeholder="nombre del codigo"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {errors.descripcion && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El color es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-normal text-slate-800 max-md:text-sm">
                      Color:
                    </label>
                    <select
                      {...register("color", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none  max-md:text-sm uppercase"
                    >
                      <option className="text-black uppercase">
                        Seleccionar color
                      </option>
                      {colores.map((c) => (
                        <option className="text-black uppercase" key={c.id}>
                          {c.color}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    {errors.stock && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El stock es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-normal text-slate-800 max-md:text-sm">
                      Stock total:
                    </label>
                    <input
                      {...register("stock", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none max-md:text-sm uppercase"
                      type="number"
                      placeholder="cantidad de productos"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    {errors.ancho && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El ancho es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-normal text-slate-800 max-md:text-sm">
                      Ancho de la abertura:
                    </label>
                    <div>
                      <input
                        {...register("ancho", { required: true })}
                        className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none w-[120px] max-md:text-sm uppercase"
                        type="number"
                        placeholder="ancho"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {errors.alto && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El alto es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-normal text-slate-800 max-md:text-sm">
                      Alto de la abertura:
                    </label>
                    <div>
                      <input
                        {...register("alto", { required: true })}
                        className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none w-[120px] max-md:text-sm uppercase"
                        type="number"
                        placeholder="alto"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-800 max-md:text-sm uppercase">
                      Categoria:
                    </label>
                    <select
                      {...register("categoria", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-white text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none  max-md:text-sm uppercase"
                    >
                      <option
                        className="text-black uppercase"
                        key={categorias.id}
                      >
                        Seleccionar categoria
                      </option>
                      {categorias.map((cat) => (
                        <option className="text-black uppercase" key={cat.id}>
                          {cat.categoria}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    {errors.descripcion && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        La descripcion es requerida
                      </span>
                    )}
                    <label className="text-[14px] font-normal text-slate-800 max-md:text-sm">
                      Detalle:
                    </label>
                    <textarea
                      {...register("descripcion", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none max-md:text-sm uppercase"
                      type="text"
                      placeholder="detalle ej perfil pesado ventana"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-100 hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl shadow shadow-black/10 outline-none text-indigo-600 hover:bg-indigo-500 hover:text-white text-sm text-center cursor-pointer uppercase max-md:text-xs"
                      type="submit"
                      value={"Crear producto"}
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
