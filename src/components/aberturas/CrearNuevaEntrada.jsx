import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { obtenerUnicoPerfil } from "../../api/aberturas.api";
import { toast } from "react-toastify";
import client from "../../api/axios";

export const CrearNuevaEntrada = ({
  isOpenEntrada,
  closeOpenEntrada,
  obtenerId,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoPerfil(obtenerId);

      setValue("codigo", res.data.nombre);
      setValue("detalle", res.data.descripcion);
      setValue("ancho", res.data.ancho);
      setValue("alto", res.data.alto);
    }

    loadData();
  }, [obtenerId]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await client.post("/nueva-entrada-dos", data);

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

    closeOpenEntrada();

    setTimeout(() => {
      location.reload();
    }, 1000);
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
                <Dialog.Title
                  as="h3"
                  className="text-base text-slate-700 font-medium leading-6  max-md:text-md"
                >
                  Crear nueva entrada{" "}
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Codigo:
                    </label>
                    <input
                      {...register("codigo", { required: true })}
                      className="border-gray-300 border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
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
                      className="border-gray-300 border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="text"
                      placeholder="Detalle"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                        Ancho:
                      </label>
                      <input
                        {...register("ancho", { required: true })}
                        className="border-gray-300 border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                        type="text"
                        placeholder="Ancho"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                        Alto:
                      </label>
                      <input
                        {...register("alto", { required: true })}
                        className="border-gray-300 border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                        type="text"
                        placeholder="Alto"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700 max-md:text-sm">
                      Total de la entrada:
                    </label>
                    <input
                      {...register("stock", { required: true })}
                      className="border-gray-300 border-[1px] text-slate-700 py-2 px-2 rounded-xl shadow shadow-black/10 outline-none max-md:text-sm"
                      type="number"
                      placeholder="Total de la entrada"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-500 text-sm hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-full shadow shadow-black/10 outline-none text-white  text-center cursor-pointer max-md:text-xs uppercase font-bold"
                      type="submit"
                      value={"Crear la entrada"}
                      //   onClick={closeOpenEntrada}
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={closeOpenEntrada}
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
