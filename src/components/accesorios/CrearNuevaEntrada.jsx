import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { obtenerUnicoAccesorio } from "../../api/accesorios.api";
import { toast } from "react-toastify";
import client from "../../api/axios";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const CrearNuevaEntrada = ({
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

  const { setPerfiles, perfiles, entradasMes, setEntradasMes } =
    useAccesoriosContext();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoAccesorio(obtenerId);

      setValue("codigo", res.data.nombre);
      setValue("detalle", res.data.descripcion);
      setValue("id", res.data.id);
      // setValue("stock", res.data.stock);
    }

    loadData();
  }, [obtenerId]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Realizar la solicitud para crear una nueva entrada
      const res = await client.post("/nueva-entrada", data);

      // Verificar si la entrada ya existe en el estado
      const entradaExistente = entradasMes.find(
        (entrada) => entrada.id === res.data.id
      );

      if (!entradaExistente) {
        // Si la entrada no existe, agregarla al estado de entradasMes
        setEntradasMes((prevEntradas) => [...prevEntradas, res.data]);
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
            ...newPerfiles[perfilIndex], // Mantener las propiedades existentes del perfil
            stock:
              Number(newPerfiles[perfilIndex].stock) + Number(res.data.ingreso),
          };

          return newPerfiles;
        });
      }

      // Mostrar un mensaje de éxito
      toast.success("¡Entrada creada correctamente!", {
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

      // Cerrar el formulario de entrada
      closeOpenEntrada();
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error("Error al crear la entrada:", error);
      toast.error(
        "Error al crear la entrada. Por favor, inténtalo de nuevo más tarde.",
        {
          position: "top-center",
          autoClose: 3000,
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
        }
      );
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
                  className="text-sm text-slate-700 font-bold leading-6 uppercase"
                >
                  Crear nueva entrada{" "}
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 text-sm"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Codigo:
                    </label>
                    <input
                      {...register("codigo", { required: true })}
                      className="border-gray-300 border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm uppercase"
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
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Sucursal de compra:
                    </label>
                    <input
                      {...register("sucursal", { required: true })}
                      className="border-gray-300 uppercase border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="text"
                      placeholder="Nombre de la suc o compra"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Numero de Fact o Remito:
                    </label>
                    <input
                      {...register("numero", { required: true })}
                      className="border-gray-300 uppercase border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="text"
                      placeholder="Numero Fact o Remito"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Ingreso:
                    </label>
                    <input
                      {...register("ingreso", { required: true })}
                      className="border-gray-300 uppercase border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="number"
                      placeholder="Total Ingreso"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-100 text-sm font-normal hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl shadow shadow-black/10 outline-none text-indigo-600  text-center cursor-pointer max-md:text-xs uppercase hover:bg-indigo-500 hover:text-white"
                      type="submit"
                      value={"Crear el ingreso/entrada"}
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
