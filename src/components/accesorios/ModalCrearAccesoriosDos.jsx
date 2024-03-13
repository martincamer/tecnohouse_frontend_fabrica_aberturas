import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  editarAccesorio,
  obtenerUnicoAccesorio,
} from "../../api/accesorios.api";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { toast } from "react-toastify";

export const ModalCrearAccesoriosDos = ({ closeModalEditar, isOpenEditar }) => {
  const { obtenerId, perfiles, setPerfiles } = useAccesoriosContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitEditar = handleSubmit(async (data) => {
    const res = await editarAccesorio(obtenerId, data);

    const tipoExistenteIndex = perfiles.findIndex(
      (tipo) => tipo.id == obtenerId
    );

    setPerfiles((prevTipos) => {
      const newTipos = [...prevTipos];
      const updatePerfil = JSON.parse(res.config.data); // Convierte el JSON a objeto

      newTipos[tipoExistenteIndex] = {
        id: obtenerId,
        nombre: updatePerfil.nombre,
        descripcion: updatePerfil.descripcion,
        stock: updatePerfil.stock,
        stock_minimo: updatePerfil.stock_minimo,
        categoria: updatePerfil.categoria,
        color: updatePerfil.color,
        entrada: newTipos[0].entrada,
        salida: newTipos[0].salida,
      };
      return newTipos;
    });

    toast.success("Editado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    closeModalEditar();
  });

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoAccesorio(obtenerId);

      setValue("nombre", res.data.nombre);
      setValue("color", res.data.color);
      setValue("stock", res.data.stock);
      setValue("stock_minimo", res.data.stock_minimo);
      setValue("categoria", res.data.categoria);
      setValue("descripcion", res.data.descripcion);
      setValue("disponible", res.data.disponible);
      setValue("id", res.data.id);
    }
    loadData();
  }, [obtenerId]);

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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 max-md:text-md"
                >
                  Editar el accesorio
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditar}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-normal max-md:text-sm">
                      Stock total:
                    </label>
                    <input
                      {...register("stock", { required: true })}
                      className="border-slate-300 border-[1px] py-2 px-2 rounded-xl shadow text-slate-600 outline-none max-md:text-sm"
                      type="number"
                      placeholder="cantidad de productos"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-indigo-500 shadow transition-all ease-in-out py-2 px-2 rounded-xl outline-none text-white font-normal text-center cursor-pointer"
                      type="submit"
                      value={"Editar producto"}
                      onClick={() => closeModalEditar()}
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={() => closeModalEditar()}
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
