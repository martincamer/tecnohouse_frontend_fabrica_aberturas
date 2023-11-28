import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { crearValorPedidoUnico } from "../../api/factura.api";
import { ToastContainer, toast } from "react-toastify";
import { ModalProductoExistente } from "./ModalProductoExistente";
import { usePedidoContext } from "../../context/PedidoProvider";

export const ModalCrearProductoPedido = ({
  isOpenPedido,
  closeModalCrearPedido,
  datos,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { productoSeleccionado, deleteToResetProductos } = usePedidoContext();

  const onSubmit = handleSubmit(async (data) => {
    const { data: nuevoValor } = await crearValorPedidoUnico(datos?.id, {
      nuevoProducto: data,
    });

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
    }, 1500);

    reset();
  });

  useEffect(() => {
    setValue("nombre", productoSeleccionado[0]?.nombre);
    setValue("detalle", productoSeleccionado[0]?.detalle);
    setValue("categoria", productoSeleccionado[0]?.categoria);
    setValue("color", productoSeleccionado[0]?.color);
    setValue("cantidad", productoSeleccionado[0]?.cantidad);
    setValue("ancho", productoSeleccionado[0]?.ancho);
    setValue("alto", productoSeleccionado[0]?.alto);
    setValue("cliente", productoSeleccionado[0]?.cliente);
  }, [productoSeleccionado]);

  const [isOpen, setIsOpen] = useState(false);

  const OpenModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenPedido} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalCrearPedido}
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
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Crear el producto
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">Codigo:</label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="nombre del codigo"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">Detalle:</label>
                    <textarea
                      {...register("detalle", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="detalle"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">categoria:</label>
                    <select
                      {...register("categoria", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none text-black bg-white"
                      type="text"
                      placeholder="categoria"
                    >
                      <option value={"seleccionar"}>seleccionar</option>
                      <option value={"herrero"}>herrero</option>
                      <option value={"modena"}>modena</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">color:</label>
                    <input
                      {...register("color", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="color"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">cantidad:</label>
                    <input
                      {...register("cantidad", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="number"
                      placeholder="cantidad"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">ancho:</label>
                    <input
                      {...register("ancho", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="number"
                      placeholder="ancho"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">alto:</label>
                    <input
                      {...register("alto", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="number"
                      placeholder="alto"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">cliente:</label>
                    <input
                      {...register("cliente", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="cliente"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-secondary hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded shadow shadow-black/10 outline-none text-white font-bold text-center cursor-pointer"
                      type="submit"
                      value={"Crear producto"}
                      onClick={closeModalCrearPedido}
                    />
                  </div>

                  <div>
                    <button
                      onClick={OpenModal}
                      type="button"
                      className="bg-blue-500 text-white rounded py-1 px-4 shadow font-bold mt-2"
                    >
                      Seleccionar producto existente
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={deleteToResetProductos}
                      type="button"
                      className="bg-red-100/90 border-red-300 border-[0.5px] text-red-400 rounded py-1 px-4 shadow font-bold mt-2"
                    >
                      Resetear producto
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                    onClick={closeModalCrearPedido}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
            <ModalProductoExistente isOpen={isOpen} closeModal={closeModal} />
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
