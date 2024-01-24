import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { crearPerfilNuevo } from "../../api/perfiles.api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export const ModalCrearPerfil = ({ closeModal, isOpen }) => {
  const { results, setPerfiles, categorias, colores } = useAluminioContext();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: nuevoValor } = await crearPerfilNuevo(data);

      const proyectoActualizado = [...results, nuevoValor];

      setPerfiles(proyectoActualizado);

      toast.success("¡Producto creado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      reset();

      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setError(error.response.data);
      }
      setError([error.response.data.message]);
    }
  });

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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 max-md:text-md"
                >
                  Crear nuevo perfil
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  {error &&
                    error?.map((err) => (
                      <p className="text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-2/3 mx-auto text-center border-[1px] border-red-200">
                        {err}
                      </p>
                    ))}

                  <div className="flex flex-col gap-2">
                    {errors.nombre && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El nombre es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-bold max-md:text-sm">
                      Codigo:
                    </label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none max-md:text-sm"
                      type="text"
                      placeholder="nombre del codigo"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    {errors.color && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El nombre es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-bold max-md:text-sm">
                      Color:
                    </label>
                    <select
                      {...register("color", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none bg-white max-md:text-sm"
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
                    {errors.stock && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        El stock es requerido
                      </span>
                    )}
                    <label className="text-[14px] font-bold max-md:text-sm">
                      Stock total:
                    </label>
                    <input
                      {...register("stock", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none max-md:text-sm"
                      type="number"
                      placeholder="cantidad de productos"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {errors.categoria && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        La categoria es requerida
                      </span>
                    )}
                    <label className="text-[14px] font-bold max-md:text-sm">
                      Categoria:
                    </label>
                    <select
                      {...register("categoria", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none bg-white max-md:text-sm"
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
                    {errors.descripcion && (
                      <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                        La descripcion es requerida
                      </span>
                    )}
                    <label className="text-[14px] font-bold max-md:text-sm">
                      Detalle:
                    </label>
                    <input
                      {...register("descripcion", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none max-md:text-sm"
                      type="text"
                      placeholder="detalle ej perfil pesado ventana"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-secondary hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded shadow shadow-black/10 outline-none text-white font-bold text-center cursor-pointer max-md:text-xs"
                      type="submit"
                      value={"Crear producto"}
                      onClick={error && closeModal}
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={closeModal}
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
