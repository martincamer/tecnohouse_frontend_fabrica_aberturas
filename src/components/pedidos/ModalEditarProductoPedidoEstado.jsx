import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  obtenerValorUnico,
  actualizarFacturaProductoUnicoDos,
} from "../../api/factura.api";
import { usePedidoContext } from "../../context/PedidoProvider";

export const ModalEditarProductoPedidoEstado = ({
  obtenerId,
  isOpenEstado,
  closeModalEstado,
  datos,
  setDatos,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { datosMensuales, setDatosMensuales } = usePedidoContext();

  const [error, setError] = useState("");

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

  console.log(datosMensuales);

  const onSubmitEditar = handleSubmit(async (data) => {
    try {
      const res = await actualizarFacturaProductoUnicoDos(obtenerId, data);

      console.log(res.config.data);

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

      const updatedTipo = JSON.parse(res.config.data);

      const productoEditado = datosMensuales.find((producto) =>
        producto.productos.respuesta.some((item) => item.id === obtenerId)
      );

      const nuevosProductos = productoEditado.productos.respuesta.map(
        (producto) => {
          if (producto.id === obtenerId) {
            // Actualizar solo la propiedad cantidadFaltante del producto editado
            return {
              ...producto,
              cantidadFaltante: updatedTipo.cantidadFaltante,
            };
          } else {
            return producto;
          }
        }
      );

      // Actualizar el estado de datosMensuales con el nuevo arreglo
      setDatosMensuales((prevDatosMensuales) => {
        return prevDatosMensuales.map((item) => {
          if (item.id === productoEditado.id) {
            return {
              ...item,
              productos: {
                respuesta: nuevosProductos,
              },
            };
          } else {
            return item;
          }
        });
      });

      toast.success("¡Cantidad realizada editada correctamente!", {
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

      closeModalEstado();
    } catch (error) {
      setError("LA CANTIDAD QUE INGRESASTE ES MAYOR A LA CANTIDAD GENERADA");

      setTimeout(() => {
        setError("");
      }, 1500);
    }
  });

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenEstado} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEstado}
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
                    onClick={closeModalEstado}
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
                  Editar la cantidad
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditar}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  {error && (
                    <p className="bg-red-100 py-2 px-2 rounded-xl uppercase text-red-900 text-sm shadow-md shadow-gray-300">
                      Selecciona una cantidad menor a la cantidad a entregar
                    </p>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal capitalize text-slate-700">
                      cantidad:
                    </label>
                    <input
                      disabled
                      {...register("cantidad", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-3 rounded-xl shadow text-slate-600 outline-none"
                      type="number"
                      placeholder="cantidad"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal capitalize text-slate-700">
                      Cantidad faltante:
                    </label>
                    <input
                      {...register("cantidadFaltante", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-3 rounded-xl shadow text-slate-600 outline-none"
                      type="number"
                      placeholder="editar cantidad - total"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-500 hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded-xl shadow outline-none text-white font-normal text-sm text-center cursor-pointer uppercase"
                      type="submit"
                      value={"Editar la cantidad realizada"}
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
