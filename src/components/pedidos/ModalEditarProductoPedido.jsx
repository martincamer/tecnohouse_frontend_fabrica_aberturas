import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  obtenerValorUnico,
  actualizarFacturaProductoUnico,
} from "../../api/factura.api";
import { toast } from "react-toastify";

export const ModalEditarProductoPedido = ({
  obtenerId,
  isOpen,
  closeModal,
  datos,
  setDatos,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitEditar = handleSubmit(async (data) => {
    const res = await actualizarFacturaProductoUnico(obtenerId, data);

    const tipoExistenteIndexTwo = datos.findIndex(
      (tipo) => tipo.id === obtenerId
    );

    setDatos((prevTipos) => {
      const newTipos = [...prevTipos];
      const updatedTipo = JSON.parse(res.config.data); // Convierte el JSON a objeto

      newTipos[tipoExistenteIndexTwo] = {
        id: obtenerId,
        nombre: updatedTipo.nombre,
        detalle: updatedTipo.detalle,
        categoria: updatedTipo.categoria,
        color: updatedTipo.color,
        ancho: updatedTipo.ancho,
        alto: updatedTipo.alto,
        cantidad: updatedTipo.cantidad,
        cliente: updatedTipo.cliente,
        cantidadFaltante: updatedTipo.cantidadFaltante,
      };
      console.log("Estado después de la actualización:", newTipos);
      return newTipos;
    });

    // setPerfiles(proyectoActualizado);
    toast.success("¡Abertura del cliente editada correctamente!", {
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

  useEffect(() => {
    async function loadData() {
      const res = await obtenerValorUnico(obtenerId);

      setValue("nombre", res?.data?.producto?.nombre);
      setValue("detalle", res?.data?.producto?.detalle);
      setValue("categoria", res?.data?.producto?.categoria);
      setValue("color", res?.data?.producto?.color);
      setValue("cliente", res?.data?.producto?.cliente);
      setValue("ancho", res?.data?.producto?.ancho);
      setValue("alto", res?.data?.producto?.alto);
      setValue("cantidad", res?.data?.producto?.cantidad);
      setValue("cantidadFaltante", res?.data?.producto?.cantidadFaltante);
    }

    loadData();
  }, [obtenerId]);

  const [error, setError] = useState(false);

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
                  className="text-sm uppercase font-bold leading-6 text-gray-700"
                >
                  Editar la abertura del cliente
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditar}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 text-sm"
                >
                  {error && (
                    <p>
                      Selecciona una cantidad menor a la cantidad a entregar
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Codigo:
                    </label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="text"
                      placeholder="nombre del codigo"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      Detalle:
                    </label>
                    <textarea
                      {...register("detalle", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="text"
                      placeholder="detalle"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      categoria:
                    </label>
                    <input
                      {...register("categoria", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="text"
                      placeholder="categoria"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      color:
                    </label>
                    <input
                      {...register("color", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="text"
                      placeholder="color"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      cliente:
                    </label>
                    <input
                      {...register("cliente", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="text"
                      placeholder="cliente"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      cantidad:
                    </label>
                    <input
                      {...register("cantidad", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="number"
                      placeholder="cantidad"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      ancho:
                    </label>
                    <input
                      {...register("ancho", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="number"
                      placeholder="ancho"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal text-slate-700">
                      alto:
                    </label>
                    <input
                      {...register("alto", { required: true })}
                      className="border-slate-300 uppercase border-[1px] py-2 px-2 rounded-xl shadow outline-none"
                      type="number"
                      placeholder="alto"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-500 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl outline-none text-white font-normal text-center cursor-pointer uppercase text-sm"
                      type="submit"
                      value={"Editar producto"}
                      onClick={closeModal}
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
