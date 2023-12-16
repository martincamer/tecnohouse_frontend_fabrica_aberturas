import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteFacturaProducto,
  obtenerFactura,
} from "../../../api/factura.api";
import { ToastContainer, toast } from "react-toastify";
import { ModalCrearProductoPedido } from "../../../components/pedidos/ModalCrearProductoPedido";
import { ModalEditarProductoPedido } from "../../../components/pedidos/ModalEditarProductoPedido";
import { DescargarPdfPedido } from "../../../components/pedidos/DescargarPdfPedido";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargarPdfPedidoDos } from "../../../components/pedidos/DescargarPdfPedidoDos";
import { DescargarPdfPedidoTres } from "../../../components/pedidos/DescargarPdfPedidoTres";
import { Search } from "../../../components/ui/Search";
import { DescargarPdfPedidoCinco } from "../../../components/pedidos/DescargarPdfPedidoCinco";
import { DescargarPdfPedidoAberturasFaltantes } from "../../../components/pedidos/DescargarPdfPedidoAberturasFaltantes";

export const ViewPedido = () => {
  const [datos, setDatos] = useState([]);
  const [obtenerId, setObtenerId] = useState("");
  const [search, setSearch] = useState("");
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

  const totalAberturas = () => {
    return datos?.productos?.respuesta?.reduce((sum, b) => {
      return sum + Number(b?.cantidad);
    }, 0);
  };

  const totalAberturasRealizadas = () => {
    return datos?.productos?.respuesta?.reduce((sum, b) => {
      return sum + Number(b?.cantidadFaltante);
    }, 0);
  };

  const handleSeleccionarId = (id) => {
    setObtenerId(id);
  };

  // let results = [];

  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let datosAgrupadosEnUno;

  const performSearch = () => {
    if (!search) {
      return datos?.productos?.respuesta || [];
    } else {
      return (
        datos?.productos?.respuesta?.filter(
          (dato) =>
            dato?.cliente?.toLowerCase().includes(search.toLocaleLowerCase()) ||
            dato?.detalle?.toLowerCase().includes(search.toLocaleLowerCase())
        ) || []
      );
    }
  };

  let datosAgrupados;

  if (datos && datos.productos?.respuesta) {
    const productosRespuesta = datos?.productos?.respuesta;

    if (Array.isArray(productosRespuesta) && productosRespuesta.length > 0) {
      // Crear un objeto para almacenar los productos agrupados por cliente
      const productosAgrupados = productosRespuesta.reduce(
        (acumulador, producto) => {
          const cliente = producto.cliente;

          if (!acumulador[cliente]) {
            acumulador[cliente] = { nombre: cliente, productos: [] };
          }

          acumulador[cliente].productos.push(producto);

          return acumulador;
        },
        {}
      );

      // Convertir el objeto en un arreglo
      const nuevoArreglo = Object.values(productosAgrupados);

      datosAgrupados = nuevoArreglo;

      datosAgrupadosEnUno = nuevoArreglo;
    } else {
      console.error(
        "La propiedad 'productos.respuesta' no es un arreglo o está vacía."
      );
    }
  } else {
    console.error("La estructura de datos no es la esperada.");
  }

  // console.log(datosAgrupadosEnUno);

  // let resultadoFinal = datos?.map((p) =>
  //   p.productos.map(
  //     (prod) => prod?.cantidad !== prod?.cantidadFaltante && prod?.cantidad
  //   )
  // );

  let resultadoFinalAberturas = datos?.productos?.respuesta?.reduce(
    (sum, d) => {
      return sum + Number(d.cantidad !== d.cantidadFaltante && d.cantidad);
    },
    0
  );

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
          <p className="font-semibold text-blue-500 text-lg capitalize">
            {datos?.cliente}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-lg">Detalle - Categoria:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
            {datos?.detalle}
          </p>
        </div>
        {/* <div className="flex gap-2">
          <p className="text-lg">Localidad - Zona:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
          </p>
        </div> */}
        <div className="flex gap-2">
          <p className="text-lg">Total aberturas:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
            {totalAberturas()}
          </p>
        </div>

        <div className="flex gap-2">
          <p className="text-lg">Total aberturas - Realizadas:</p>{" "}
          <p className="font-semibold text-blue-500 text-lg">
            {totalAberturasRealizadas()}
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
        <div>
          <Search searcher={searcher} search={search} />
        </div>
        <div className="overflow-y-scroll overflow-x-scroll h-[500px]">
          <table className="border-[1px] border-black/20 p-[5px] table-auto w-full rounded shadow">
            <thead>
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Codigo</th>
                <th className="p-3">Descripción del producto</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Color</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Ancho - Alto</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Cantidad Realizada</th>
                <th className="p-3">Eliminar</th>
                <th className="p-3">Editar Producto</th>
                <th className="p-3">Realizada - Total</th>
                <th className="p-3">Abertura realizada</th>
              </tr>
            </thead>
            <tbody>
              {performSearch()?.map((p) => (
                <tr key={p?.id}>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                    {p?.id}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                    {p?.nombre}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                    {p?.detalle}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                    {p?.categoria}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                    {p?.color}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                    {p?.cliente}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                    {p?.ancho}x{p?.alto}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                    {p?.cantidad}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-bold text-sm">
                    <p
                      className={`${
                        p?.cantidad === p?.cantidadFaltante
                          ? "bg-green-500"
                          : "bg-orange-500"
                      } rounded-full py-2 w-[40px] text-white text-center mx-auto shadow`}
                    >
                      {p?.cantidadFaltante}
                    </p>
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                    <button
                      type="button"
                      onClick={() => handleEliminarProductoPedido(p?.id)}
                      className="font-semibold text-red-400 border-[1px] px-4 py-1 border-red-300 rounded bg-red-100"
                    >
                      eliminar
                    </button>
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                    <button
                      onClick={() => {
                        openModal(), handleSeleccionarId(p?.id);
                      }}
                      type="button"
                      className="font-semibold text-blue-400 border-[1px] px-4 py-1 border-blue-300 rounded bg-blue-100 text-sm"
                    >
                      editar
                    </button>
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium">
                    <button
                      onClick={() => {
                        openModal(), handleSeleccionarId(p?.id);
                      }}
                      type="button"
                      className="font-semibold text-green-500 border-[1px] px-4 py-1 border-green-300 rounded bg-green-100 text-sm"
                    >
                      editar
                    </button>
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                    <button
                      type="button"
                      className={`font-semibold px-4 py-1 rounded ${
                        p?.cantidad === p?.cantidadFaltante
                          ? "bg-green-500"
                          : "bg-orange-500"
                      } text-white shadow`}
                    >
                      {p?.cantidad === p?.cantidadFaltante
                        ? "completada"
                        : "pendiente"}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="font-bold text-xl text-blue-500 flex flex-col gap-1">
        <div className="flex gap-4 items-center">
          Clientes pedido completo:{" "}
          <span className="font-normal text-black">
            {datosAgrupados?.length} clientes totales.
          </span>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {datosAgrupadosEnUno?.map((c) => (
            <p className="text-sm text-black font-normal">{c?.nombre}</p>
          ))}
        </div>
      </div>

      <div className="border-[1px] border-gray-200 shadow rounded py-5 px-10 flex flex-col gap-4 overflow-y-scroll h-[600px]">
        {datosAgrupadosEnUno?.map((p) => (
          <div>
            <div className="flex flex-col gap-5 items-center">
              <p className="font-bold text-lg">{p?.nombre}</p>
              {/* <Link
              to={`/cliente/pedido/${p?.nombre}`}
              className="text-gray-800 border-gray-200 py-2 px-4 border-[1px] shadow rounded hover:translate-x-1 transition-all ease-in-out"
            >
              VER ABERTURAS{" > "}
            </Link> */}

              <table className="border-[1px] border-black/20 p-[5px] table-auto w-full rounded shadow">
                <thead>
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Codigo</th>
                    <th className="p-3">Detalle</th>
                    <th className="p-3">Ancho x Alto</th>
                    <th className="p-3">Cantidad</th>
                    <th className="p-3">Realizadas</th>
                    <th className="p-3">Abertura realizada</th>
                  </tr>
                </thead>
                <tbody>
                  {p?.productos?.map((p) => (
                    <tr key={p?.id}>
                      <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                        {p?.id}
                      </th>
                      <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                        {p?.nombre}
                      </th>
                      <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                        {p?.detalle}
                      </th>
                      <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                        {p?.ancho}x{p?.alto}
                      </th>
                      <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                        {p?.cantidad}
                      </th>
                      <th className="border-[1px] border-gray-300 p-3 font-bold text-sm">
                        <p
                          className={`${
                            p?.cantidad === p?.cantidadFaltante
                              ? "bg-green-500"
                              : "bg-orange-500"
                          } rounded-full py-2 w-[40px] text-white text-center mx-auto shadow`}
                        >
                          {p?.cantidadFaltante}
                        </p>
                      </th>
                      <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                        <button
                          type="button"
                          className={`font-semibold px-4 py-1 rounded ${
                            p?.cantidad === p?.cantidadFaltante
                              ? "bg-green-500"
                              : "bg-orange-500"
                          } text-white shadow`}
                        >
                          {p?.cantidad === p?.cantidadFaltante
                            ? "completada"
                            : "pendiente"}
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="font-bold text-xl text-blue-500 flex flex-col gap-1">
        <div className="flex gap-4 items-center">
          Clientes que faltan aberturas a entregar{" "}
        </div>
      </div>

      <div className="border-[1px] border-gray-200 shadow rounded py-5 px-10 flex flex-col gap-4 overflow-y-scroll h-[600px]">
        {datosAgrupadosEnUno?.map((p) =>
          p?.productos.map(
            (datos) =>
              datos.cantidad !== datos.cantidadFaltante && (
                <div>
                  <div className="flex flex-col gap-5 items-center">
                    <p className="font-bold text-lg">{p?.nombre}</p>
                    <table className="border-[1px] border-black/20 p-[5px] table-auto w-full rounded shadow">
                      <thead>
                        <tr>
                          <th className="p-3">ID</th>
                          <th className="p-3">Codigo</th>
                          <th className="p-3">Detalle</th>
                          <th className="p-3">Ancho x Alto</th>
                          <th className="p-3">Cantidad</th>
                          <th className="p-3">Realizadas</th>
                          <th className="p-3">Abertura realizada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datos.cantidad !== datos.cantidadFaltante && (
                          <tr key={datos?.id}>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                              {datos?.id}
                            </th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                              {datos?.nombre}
                            </th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                              {datos?.detalle}
                            </th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                              {datos?.ancho}x{datos?.alto}
                            </th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                              {datos?.cantidad}
                            </th>
                            <th className="border-[1px] border-gray-300 p-3 font-bold text-sm">
                              <p
                                className={`${
                                  datos?.cantidad === datos?.cantidadFaltante
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                                } rounded-full py-2 w-[40px] text-white text-center mx-auto shadow`}
                              >
                                {datos?.cantidadFaltante}
                              </p>
                            </th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                              <button
                                type="button"
                                className={`font-semibold px-4 py-1 rounded ${
                                  datos?.cantidad === datos?.cantidadFaltante
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                                } text-white shadow`}
                              >
                                {datos?.cantidad === datos?.cantidadFaltante
                                  ? "completada"
                                  : "pendiente"}
                              </button>
                            </th>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
          )
        )}
      </div>
      <div className="border-[1px] shadow py-10 px-10 rounded flex gap-4">
        <button
          onClick={() => openModalCrearPedido()}
          className="bg-green-500 py-1 px-5 rounded shadow text-white font-semibold"
        >
          Crear un nuevo producto
        </button>

        {/* <Link
          to={`/pedido-pdf/${datos.id}`}
          // onClick={() => openModalCrearPedido()}
          className="bg-blue-500 py-1 px-5 rounded shadow text-white font-semibold"
        >
          Ver pedido - pdf
        </Link> */}

        <PDFDownloadLink
          fileName={`${datos?.cliente}_puertas`}
          document={<DescargarPdfPedido datos={datos} />}
          className="bg-orange-500 py-1 px-5 rounded text-white font-semibold"
        >
          Descargar Pedido Puertas
        </PDFDownloadLink>
        <PDFDownloadLink
          fileName={`${datos?.cliente}_ventanas`}
          document={<DescargarPdfPedidoDos datos={datos} />}
          className="bg-pink-400 py-1 px-5 rounded text-white font-semibold"
        >
          Descargar Pedido Ventanas
        </PDFDownloadLink>
        <PDFDownloadLink
          fileName={`${datos?.cliente}_celosias`}
          document={<DescargarPdfPedidoTres datos={datos} />}
          className="bg-blue-400 py-1 px-5 rounded text-white font-semibold"
        >
          Descargar Pedido Celosias de abrir - corredizas
        </PDFDownloadLink>
        <PDFDownloadLink
          fileName={`${datos?.cliente}_aberturas-faltan`}
          document={
            <DescargarPdfPedidoAberturasFaltantes
              resultadoFinalAberturas={resultadoFinalAberturas}
              datosAgrupadosEnUno={datosAgrupadosEnUno}
            />
          }
          className="bg-red-400 py-1 px-5 rounded text-white font-semibold"
        >
          Descargar Aberturas faltantes
        </PDFDownloadLink>

        <PDFDownloadLink
          fileName={`${datos?.cliente}-pedido-completo-mes-${dateTime(
            datos?.created_at
          )}`}
          document={<DescargarPdfPedidoCinco datos={datos} />}
          className="bg-gray-800 py-1 px-5 rounded text-white font-semibold"
        >
          Descargar Pedido Completo - Cliente
        </PDFDownloadLink>
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
