import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editarPerfil, obtenerUnicoPerfil } from "../../api/aberturas.api";
import { ToastContainer, toast } from "react-toastify";
import { useAberturasContext } from "../../context/AluminioAberturas";

export const ModalCrearEditar = ({ closeModalEditar, isOpenEditar }) => {
  const { obtenerId, perfiles, setPerfiles, categorias, colores } =
    useAberturasContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoPerfil(obtenerId);

      setValue("nombre", res.data.nombre);
      setValue("color", res.data.color);
      setValue("stock", res.data.stock);
      setValue("peso_neto_barra_6mts", res.data.peso_neto_barra_6mts);
      setValue("categoria", res.data.categoria);
      setValue("descripcion", res.data.descripcion);
      setValue("disponible", res.data.disponible);
      setValue("alto", res.data.alto);
      setValue("ancho", res.data.ancho);
      setValue("id", res.data.id);
    }
    loadData();
  }, [obtenerId]);

  const onSubmitEditar = handleSubmit(async (data) => {
    const res = await editarPerfil(obtenerId, data);

    const tipoExistenteIndex = perfiles.findIndex(
      (tipo) => tipo.id === obtenerId
    );

    setPerfiles((prevTipos) => {
      const newTipos = [...prevTipos];
      const updatePerfil = JSON.parse(res.config.data); // Convierte el JSON a objeto

      newTipos[tipoExistenteIndex] = {
        id: obtenerId,
        nombre: updatePerfil.nombre,
        descripcion: updatePerfil.descripcion,
        stock: updatePerfil.stock,
        categoria: updatePerfil.categoria,
        color: updatePerfil.color,
        ancho: updatePerfil.ancho,
        alto: updatePerfil.alto,
      };
      return newTipos;
    });
    toast.success("¡Abertura editada correctamente!", {
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
      <Transition appear show={isOpenEditar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditar}
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
                    onClick={closeModalEditar}
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
                  Editar el producto
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditar}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 text-sm"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Codigo:
                    </label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      placeholder="nombre del codigo"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Color:
                    </label>
                    <select
                      {...register("color", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                    >
                      <option className="text-black">Seleccionar color</option>
                      {colores.map((c) => (
                        <option className="text-black" key={c.id}>
                          {c.color}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Stock total:
                    </label>
                    <input
                      {...register("stock", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      type="number"
                      placeholder="cantidad de productos"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Categoria:
                    </label>
                    <select
                      {...register("categoria", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                    >
                      <option className="text-black" key={categorias.id}>
                        Seleccionar categoria
                      </option>
                      {categorias.map((cat) => (
                        <option className="text-black" key={cat.id}>
                          {cat.categoria}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Detalle:
                    </label>
                    <textarea
                      {...register("descripcion", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      type="text"
                      placeholder="detalle ej perfil pesado ventana"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Ancho de la abertura:
                    </label>
                    <div>
                      <input
                        {...register("ancho", { required: true })}
                        className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                        type="number"
                        placeholder="ancho"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Alto de la abertura:
                    </label>
                    <div>
                      <input
                        {...register("alto", { required: true })}
                        className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                        type="number"
                        placeholder="alto"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      ID:
                    </label>
                    <input
                      {...register("id", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl bg-slate-50 text-slate-700 placeholder:text-slate-500 shadow shadow-black/10 outline-none uppercase"
                      type="text"
                      placeholder="id del perfil"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-100 hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl shadow shadow-black/10 outline-none text-indigo-600 text-sm text-center cursor-pointer max-md:text-xs uppercase hover:text-white hover:bg-indigo-500"
                      type="submit"
                      value={"Editar producto"}
                      onClick={closeModalEditar}
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
