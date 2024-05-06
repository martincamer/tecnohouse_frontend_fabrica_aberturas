import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { crearAccesorioNuevo } from "../../api/accesorios.api";

export const ModalCrearAccesorios = ({ closeModal, isOpen }) => {
  const { resultadosFiltrados, setPerfiles, perfiles, categorias, colores } =
    useAccesoriosContext();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await crearAccesorioNuevo(data);

      const tipoExistente = perfiles.find((tipo) => tipo.id === res.data.id);

      if (!tipoExistente) {
        // Actualizar el estado de tipos agregando el nuevo tipo al final
        setPerfiles((prevTipos) => [...prevTipos, res.data]);
      }

      toast.success("¡Producto creado correctamente!", {
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

      reset();

      setTimeout(() => {
        closeModal();
      }, 600);
    } catch (error) {
      setError(error.response.data.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  });

  return (
    <Menu as="div" className="z-100">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[101] overflow-y-auto scrooll-bar"
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

          <div className="text-center h-full max-h-full">
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
              className="inline-block h-full align-middle"
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
              <div className="inline-block w-full p-6 my-0 px-5 text-left align-middle transition-all transform bg-white shadow-xl rounded-none max-w-full z-[101] h-full min-h-full max-h-full">
                <div className="py-0 flex justify-end">
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

                {error && (
                  <div className="flex justify-center items-center py-2">
                    <p className="text-red-800 bg-red-100 py-2 px-3 rounded-xl shadow shadow-gray-300">
                      {error}
                    </p>
                  </div>
                )}

                <Dialog.Title
                  as="h3"
                  className="text-sm uppercase font-bold leading-6 text-slate-700 border-b"
                >
                  Crear nuevo accesorio
                </Dialog.Title>

                <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-3">
                  <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-2">
                    <div className="flex flex-col gap-2">
                      {errors.nombre && (
                        <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                          El codigo es requerido
                        </span>
                      )}
                      <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                        Codigo
                      </label>
                      <input
                        {...register("nombre", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm uppercase"
                        type="text"
                        placeholder="nombre del codigo"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {errors.stock && (
                        <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded-xl w-1/2 text-center shadow border-[1px] border-red-200">
                          El stock es requerido
                        </span>
                      )}
                      <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                        Cantidad stock
                      </label>
                      <input
                        {...register("stock", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm uppercase"
                        type="number"
                        placeholder="cantidad de productos"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {errors.stock_minimo && (
                        <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded-xl w-1/2 text-center shadow border-[1px] border-red-200">
                          El stock minimo es requerido
                        </span>
                      )}
                      <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                        Stock minimo
                      </label>
                      <input
                        {...register("stock_minimo", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm uppercase"
                        type="number"
                        placeholder="cantidad de productos"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                        Categoria:
                      </label>
                      <select
                        {...register("categoria", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none bg-white max-md:text-sm uppercase"
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
                        <span className=" text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200 uppercase">
                          La descripcion es requerida
                        </span>
                      )}
                      <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                        Detalle
                      </label>
                      <input
                        {...register("descripcion", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm uppercase"
                        type="text"
                        placeholder="detalle ej perfil pesado ventana"
                      />
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <input
                      className="bg-indigo-500 text-sm font-bold transition-all ease-in-out py-2.5 px-6 rounded-full outline-none text-white text-center cursor-pointer uppercase"
                      type="submit"
                      value={"Crear el accesorio"}
                      onClick={closeModal && errors}
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
