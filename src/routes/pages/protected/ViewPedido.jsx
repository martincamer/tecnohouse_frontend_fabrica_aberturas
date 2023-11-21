import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteFacturaProducto,
  obtenerFactura,
} from "../../../api/factura.api";
import { ToastContainer, toast } from "react-toastify";
import { ModalCrearProductoPedido } from "../../../components/pedidos/ModalCrearProductoPedido";
import { ModalEditarProductoPedido } from "../../../components/pedidos/ModalEditarProductoPedido";

export const ViewPedido = () => {
  const [datos, setDatos] = useState([]);
  const [obtenerId, setObtenerId] = useState("");
  const params = useParams();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFactura(params.id);

      setDatos(res.data);
    }
    loadData();
  }, []);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  const handleEliminarProductoPedido = (id) => {
    deleteFacturaProducto(id);

    toast.error("¡Producto eliminado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  let [isOpenPedido, setIsOpenPedido] = useState(false);

  const openModalCrearPedido = () => {
    setIsOpenPedido(true);
  };

  const closeModalCrearPedido = () => {
    setIsOpenPedido(false);
  };

  // const handleSeleccionarProducto = (id) => {
  //   setObtenerId(id);
  // };

  console.log(obtenerId);

  const totalAberturas = () => {
    return datos?.productos?.respuesta?.map.reduce((sum, b) => {
      return sum + Number(b?.cantidad);
    }, 0);
  };

  return (
    <section className="w-full py-14 px-14 flex flex-col gap-10">
      <ToastContainer />
      <div className="border-[1px] shadow py-10 px-10 rounded flex justify-around">
        <div className="flex gap-2">
          <p className="text-lg">Numero del pedido: </p>{" "}
          <p className="font-semibold text-blue-500 text-lg">{datos?.id}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-lg">Cliente:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
            {datos?.cliente}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-lg">Detalle - Categoria:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
            {datos?.detalle}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-lg">Localidad - Zona:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
            {/* {datos?.detalle} */} Venado Tuerto
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-lg">Total aberturas:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
            {totalAberturas()}
          </p>
        </div>
      </div>
      <div className="border-[1px] shadow py-10 px-10 rounded flex flex-col gap-8">
        <div className="flex gap-2 items-center">
          <p className="text-lg font-semibold text-green-500">
            Pedido de aberturas - Total pedido
          </p>{" "}
          -{" "}
          <p className="text-lg font-semibold">
            Fecha de emicion: {dateTime(datos?.created_at)}
          </p>
        </div>
        <div className="overflow-y-scroll h-[500px]">
          <table className="border-[1px] border-black/20 p-[5px] table-auto w-full rounded shadow">
            <thead>
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Codigo</th>
                <th className="p-3">Descripción del producto</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Color</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Eliminar</th>
                <th className="p-3">Editar cantidad</th>
              </tr>
            </thead>
            <tbody>
              {datos?.productos?.respuesta?.map((p) => (
                <tr key={p?.id}>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    {p?.id}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    {p?.nombre}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    {p?.detalle}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    {p?.categoria}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    {p?.color}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    {p?.cantidad}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    <button
                      type="button"
                      onClick={() => handleEliminarProductoPedido(p?.id)}
                      className="font-semibold text-red-400 border-[1px] px-4 py-1 border-red-300 rounded bg-red-100"
                    >
                      eliminar
                    </button>
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    <button
                      onClick={() => {
                        setObtenerId(p.id), openModal();
                      }}
                      type="button"
                      className="font-semibold text-blue-400 border-[1px] px-4 py-1 border-blue-300 rounded bg-blue-100"
                    >
                      editar
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border-[1px] shadow py-10 px-10 rounded">
        <button
          onClick={() => openModalCrearPedido()}
          className="bg-green-500 py-1 px-5 rounded shadow text-white font-semibold"
        >
          Crear un nuevo producto
        </button>
      </div>
      <ModalEditarProductoPedido
        obtenerId={obtenerId}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <ModalCrearProductoPedido
        datos={datos}
        isOpenPedido={isOpenPedido}
        closeModalCrearPedido={closeModalCrearPedido}
      />
    </section>
  );
};
