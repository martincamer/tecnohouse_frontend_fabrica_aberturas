import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { obtenerUnicoAccesorio } from "../../api/accesorios.api";
import client from "../../api/axios";
import { toast } from "react-toastify";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const ModalNuevaSalida = ({
  isOpenEntrada,
  closeOpenEntrada,
  obtenerId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { salidasMensuales, setSalidasMensuales, perfiles, setPerfiles } =
    useAccesoriosContext();

  const [datos, setDatos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoAccesorio(obtenerId);

      setValue("codigo", res.data.nombre);
      setValue("detalle", res.data.descripcion);
      setValue("stock", res.data.stock);

      setDatos(res.data);
    }

    loadData();
  }, [obtenerId]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await client.post("/nueva-salida", data);

      // Verificar si la salida ya existe en el estado
      const salidaExistente = salidasMensuales.find(
        (salida) => salida.id === res.data.id
      );

      if (!salidaExistente) {
        // Si la salida no existe, agregarla al estado de salidasMensuales
        setSalidasMensuales((prevSalidas) => [...prevSalidas, res.data]);
      }

      // Buscar el índice del perfil que se actualizará en el estado de perfiles
      const perfilIndex = perfiles.findIndex(
        (perfil) => perfil.id === obtenerId
      );

      // Actualizar el estado de perfiles solo si se encontró el perfil
      if (perfilIndex !== -1) {
        setPerfiles((prevPerfiles) => {
          // Clonar el array de perfiles para no mutar el estado directamente
          const newPerfiles = [...prevPerfiles];

          // Actualizar el perfil correspondiente
          newPerfiles[perfilIndex] = {
            ...newPerfiles[perfilIndex],
            stock:
              Number(newPerfiles[perfilIndex].stock) - Number(res.data.total),
          };

          return newPerfiles;
        });
      }

      // Mostrar un mensaje de éxito
      toast.success("¡Salida creada correctamente!", {
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

      closeOpenEntrada();
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error("Error al crear la salida:", error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  });

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenEntrada} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeOpenEntrada}
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[350px] max-md:w-full">
                <div className="py-0 flex justify-end">
                  <div
                    onClick={closeOpenEntrada}
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
                  className="text-sm text-slate-700 font-bold leading-6  uppercase"
                >
                  Crear nueva salida del accesorio{" "}
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 text-sm"
                >
                  {error && (
                    <div>
                      <p className="bg-red-500/20 rounded-xl py-1 px-3 text-red-900">
                        {error}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Codigo:
                    </label>
                    <input
                      {...register("codigo", { required: true })}
                      className="border-gray-300 uppercase border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="text"
                      placeholder="Cod"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Detalle:
                    </label>
                    <input
                      {...register("detalle", { required: true })}
                      className="border-gray-300 uppercase border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="text"
                      placeholder="Cod"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-indigo-500 underline font-bold uppercase text-sm">
                      Stock del producto cargado.
                    </p>
                    <div className="flex">
                      <p className="text-sm bg-green-100 text-green-600 py-2 px-4 rounded-xl shadow-gray-400 shadow font-bold uppercase">
                        <span className="text-base text-green-800">
                          {datos.stock}
                        </span>{" "}
                        unds
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Salida total:
                    </label>
                    <input
                      {...register("total", { required: true })}
                      className="border-gray-300 uppercase border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="number"
                      placeholder="Total de la salida"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-100 text-sm font-normal hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl shadow shadow-black/10 outline-none text-indigo-500  text-center cursor-pointer max-md:text-xs uppercase hover:bg-indigo-500 hover:text-white"
                      type="submit"
                      value={"Crear salida del producto"}
                      //   onClick={closeOpenEntrada}
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
