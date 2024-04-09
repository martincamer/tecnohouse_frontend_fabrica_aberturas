import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteFacturaProducto,
  obtenerFactura,
} from "../../../api/factura.api";
import { ToastContainer, toast } from "react-toastify";
import { ModalCrearProductoPedido } from "../../../components/pedidos/ModalCrearProductoPedido";
import { ModalEditarProductoPedido } from "../../../components/pedidos/ModalEditarProductoPedido";
import { Search } from "../../../components/ui/Search";
import { ModalEditarProductoPedidoEstado } from "../../../components/pedidos/ModalEditarProductoPedidoEstado";
import { ModalEliminarPedido } from "../../../components/pedidos/ModalEliminarPedido";
import { CrearNuevoPedidoViewPedido } from "../../../components/pedidos/CrearNuevoPedidoViewPedido";
import * as XLSX from "xlsx";

export const ViewPedido = () => {
  const [datos, setDatos] = useState([]);
  const [datosCliente, setDatosCliente] = useState([]);
  const [obtenerId, setObtenerId] = useState("");
  const [search, setSearch] = useState("");
  const params = useParams();

  console.log("datos", datosCliente.id);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFactura(params.id);

      setDatos(res.data.productos.respuesta);
      setDatosCliente(res.data);
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

    const updatedTipos = datos.filter((tipo) => tipo.id !== guardarId);
    setDatos(updatedTipos);

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
  };

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenCrarPedido, setIsOpenCrearPedido] = useState(false);
  let [isOpenEstado, setIsOpenEstado] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalCrearPedidos = () => {
    setIsOpenCrearPedido(true);
  };

  const closeModalCrearPedidos = () => {
    setIsOpenCrearPedido(false);
  };

  const openModalEstado = () => {
    setIsOpenEstado(true);
  };

  const closeModalEstado = () => {
    setIsOpenEstado(false);
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
    return datos?.reduce((sum, b) => {
      return sum + Number(b?.cantidad);
    }, 0);
  };

  const totalAberturasRealizadas = () => {
    return datos?.reduce((sum, b) => {
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
      return datos || [];
    } else {
      return (
        datos.filter(
          (dato) =>
            dato?.cliente?.toLowerCase().includes(search.toLocaleLowerCase()) ||
            dato?.detalle?.toLowerCase().includes(search.toLocaleLowerCase())
        ) || []
      );
    }
  };

  let datosAgrupados;

  if (datos && datos) {
    const productosRespuesta = datos;

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

  let resultadoFinalAberturas = datos.reduce((sum, d) => {
    return sum + Number(d.cantidad !== d.cantidadFaltante && d.cantidad);
  }, 0);

  let resultadoFinalAberturasEmbalaje = datos?.reduce((sum, d) => {
    return sum + Number(d.cantidad);
  }, 0);

  const datosPuertas = datos
    ?.filter((item) => item.detalle.toUpperCase().startsWith("P"))
    .reduce((total, item) => total + parseInt(item.cantidad), 0);

  const datosVentanas = datos
    ?.filter((item) => item.detalle.toUpperCase().startsWith("V"))
    .reduce((total, item) => total + parseInt(item.cantidad), 0);

  const datosCelosias = datos
    ?.filter((item) => item.detalle.toUpperCase().startsWith("C"))
    .reduce((total, item) => total + parseInt(item.cantidad), 0);

  const datosMosquiteros = datos
    ?.filter((item) => item.detalle.toUpperCase().startsWith("M"))
    .reduce((total, item) => total + parseInt(item.cantidad), 0);

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);
  const [guardarId, setGuardarId] = useState(false);

  const handleBorrarAccesorioOpen = () => {
    setOpenBorrarAccesorio(true);
  };

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
  };

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = performSearch()?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(performSearch()?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const descargarExcel = () => {
    const wsData = datos?.map((p) => ({
      CATEGORIA: p?.categoria.toUpperCase(),
      COLOR: p?.color.toUpperCase(),
      CLIENTE: p?.cliente.toUpperCase(),
      ANCHOXALTO: `${p?.ancho}x${p?.alto}`,
      Cantidad: p?.cantidad.toUpperCase(),
      "CANTIDAD REALIZADA": p?.cantidadFaltante.toUpperCase(),
      "REALIZADA TOTAL":
        p?.cantidad === p?.cantidadFaltante ? "COMPLETADA" : "PENDIENTE",
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosPedidos");
    XLSX.writeFile(wb, "datos_pedidos.xlsx");
  };

  return (
    <section className="w-full py-2 px-5 max-md:py-0 max-md:px-4 flex flex-col gap-10 max-md:gap-5 max-md:pb-20">
      <ToastContainer />

      <div className="flex mt-5 max-md:mt-0">
        <Link
          className="bg-black py-2 px-8 rounded-xl max-md:shadow-none max-md:border-none shadow text-white flex  gap-2 items-center max-md:text-xs max-md:px-4 text-sm"
          to="/pedidos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 max-md:h-4 max-md:w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          VOLVER A LA PEDIDOS
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <p
          className={`${
            totalAberturasRealizadas() === totalAberturas()
              ? "bg-indigo-500"
              : "bg-orange-500"
          } font-normal text-white text-sm max-md:text-sm uppercase  px-4 py-2 rounded-2xl shadow`}
        >
          {totalAberturasRealizadas() === totalAberturas()
            ? "estado del pedido finalizado"
            : "estado del pedido pendiente"}
        </p>
      </div>
      <div className="max-md:shadow-none max-md:border-none max-md:px-2 max-md:py-0 max-md:gap-3 border-[1px] border-slate-300 py-8 px-10 rounded-2xl grid grid-cols-4 gap-4 hover:shadow-md transition-all ease-linear cursor-pointer">
        <div className="flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
          <p className="text-sm max-md:text-sm uppercase">
            Numero del pedido:{" "}
          </p>{" "}
          <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
            {datosCliente?.id}
          </p>
        </div>
        <div className="flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
          <p className="text-sm max-md:text-sm uppercase">Cliente: </p>{" "}
          <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
            {datosCliente?.cliente}
          </p>
        </div>

        <div className="flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
          <p className="text-sm max-md:text-sm uppercase">Total aberturas:</p>{" "}
          <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
            {totalAberturas()}
          </p>
        </div>

        <div className="flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
          <p className="text-sm max-md:text-sm uppercase">Total realizadas:</p>{" "}
          <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
            {totalAberturasRealizadas()}
          </p>
        </div>
      </div>

      <div className="flex px-2">
        <button
          onClick={() => openModalCrearPedidos()}
          className="max-md:uppercase bg-green-100 text-green-700 text-sm font-bold uppercase rounded-xl py-2 px-8 hover:bg-green-500 hover:text-white transtion-all ease-linear duration-300 max-md:text-sm flex gap-2 items-center"
        >
          Generar Nuevos Clientes
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      <div className="px-3 max-md:px-2 max-md:border-none max-md:shadow-none rounded-2xl flex flex-col gap-6 border-slate-300">
        <div className="flex gap-2 items-center max-md:flex-col">
          <p className="text-sm font-semibold text-indigo-500 max-md:text-sm uppercase">
            Pedido de aberturas - Total pedido
          </p>{" "}
          -{" "}
          <p className="text-sm font-normal max-md:text-sm uppercase text-slate-600">
            Fecha de emicion: {dateTime(datosCliente?.created_at)}
          </p>
        </div>
        <div className="flex gap-5 items-center max-md:flex-col max-md:gap-2 max-md:items-start">
          {" "}
          <div className="flex gap-2 items-center">
            <p className="text-base max-md:text-sm uppercase">puertas:</p>{" "}
            <p className="font-semibold text-indigo-500 text-base max-md:text-sm uppercase">
              {datosPuertas}
            </p>
          </div>
          -
          <div className="flex gap-2 items-center">
            <p className="text-base max-md:text-sm uppercase">ventanas:</p>{" "}
            <p className="font-semibold text-indigo-500 text-base max-md:text-sm uppercase">
              {datosVentanas}
            </p>
          </div>
          -
          <div className="flex gap-2 items-center">
            <p className="text-base max-md:text-sm uppercase">celosias:</p>{" "}
            <p className="font-semibold text-indigo-500 text-base max-md:text-sm uppercase">
              {datosCelosias}
            </p>
          </div>
          -
          <div className="flex gap-2 items-center">
            <p className="text-base max-md:text-sm uppercase">mosquiteros:</p>{" "}
            <p className="font-semibold text-indigo-500 text-base max-md:text-sm uppercase">
              {datosMosquiteros}
            </p>
          </div>
          -
          <div className="flex gap-2 items-center ">
            <p className="text-base max-md:text-sm uppercase">
              Total Aberturas:
            </p>{" "}
            <p className="font-semibold text-indigo-500 text-base max-md:text-sm uppercase">
              {totalAberturas()}
            </p>
          </div>
          -
          <div className="flex gap-2 items-center max-md:flex-col max-md:items-start">
            <p className="text-base max-md:text-sm uppercase">
              Total realizadas:
            </p>{" "}
            <p
              className={`${
                totalAberturasRealizadas() === totalAberturas()
                  ? "bg-indigo-500"
                  : "bg-orange-500"
              } font-normal text-white text-base max-md:text-sm uppercase  px-4 py-1 rounded-xl shadow`}
            >
              {totalAberturasRealizadas()}
              {" - "}
              {totalAberturasRealizadas() === totalAberturas()
                ? "estado finalizado"
                : "estado pendiente"}
            </p>
          </div>
        </div>

        <div className="flex gap-4 max-md:flex-col">
          <div className="w-1/3 max-md:w-full">
            <Search variable="w-full" searcher={searcher} search={search} />
          </div>

          <div className="flex max-md:text-xs">
            <button
              onClick={descargarExcel}
              className="bg-indigo-500 py-2 rounded-xl text-white uppercase px-6 text-sm flex gap-2 items-center"
            >
              Descargar Excel
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-md:flex md:hidden">
          {currentResults.map((p) => (
            <div
              className="border-slate-300 border-[1px] shadow rounded-xl py-3 px-2 flex justify-between items-center"
              key={p.id}
            >
              <div className="w-full">
                <p className="font-bold text-slate-700 text-xs uppercase">
                  Cliente: <span className="font-normal">{p.cliente}</span>
                </p>
                <p className="font-bold text-slate-700 text-xs uppercase">
                  Detalle: <span className="font-normal">{p.detalle}</span>
                </p>
                <p className="font-bold text-slate-700 text-xs uppercase">
                  Categoria: <span className="font-normal">{p.categoria}</span>
                </p>
                <p className="font-bold text-slate-700 text-xs uppercase">
                  AnchoxAlto:{" "}
                  <span className="font-normal">{`${p.ancho}x${p.alto}`}</span>
                </p>
                <p className="font-bold text-slate-700 text-xs uppercase">
                  Cantidad: <span className="font-normal">{p.cantidad}</span>
                </p>
                <p className="font-bold text-slate-700 text-xs uppercase">
                  Cantidad Realizada:{" "}
                  <span className="font-normal">{p.cantidadFaltante}</span>
                </p>

                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    // onClick={() => handleEliminarProductoPedido(p?.id)}
                    onClick={() => {
                      handleBorrarAccesorioOpen(), setGuardarId(p.id);
                    }}
                    className="max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-red-500/10  text-red-900 py-1 px-5 rounded-xl shadow border-[1px] border-red-800 text-sm"
                  >
                    eliminar
                  </button>
                  <button
                    onClick={() => {
                      openModal(), handleSeleccionarId(p?.id);
                    }}
                    type="button"
                    className="max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-white py-1 px-5 rounded-xl shadow border-[1px] border-slate-300 text-sm"
                  >
                    editar
                  </button>
                  <button
                    onClick={() => {
                      openModalEstado(), handleSeleccionarId(p?.id);
                    }}
                    type="button"
                    className="max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-slate-500/10 py-1 px-5 rounded-xl shadow border-[1px] border-slate-300 text-sm"
                  >
                    editar
                  </button>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <span className="font-bold text-slate-700 text-xs uppercase">
                    Estado:
                  </span>
                  <button
                    type="button"
                    className={`font-normal px-4 py-1 rounded max-md:text-xs max-md:py-1 max-md:px-4 ${
                      p?.cantidad === p?.cantidadFaltante
                        ? "bg-indigo-500 rounded-lg text-white uppercase"
                        : "bg-orange-500 rounded-lg text-white uppercase"
                    } shadow`}
                  >
                    {p?.cantidad === p?.cantidadFaltante
                      ? "completada"
                      : "pendiente"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl hover:shadow-md transition-all ease-in-out border border-gray-200 mt-5 max-md:hidden md:block">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm uppercase">
            <thead>
              <tr>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Descripción del producto
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Categoria
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Color
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Cliente
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Ancho - Alto
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Cantidad
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Cantidad Realizada
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Eliminar
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Editar Producto
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Realizada - Total
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Abertura realizada
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-left">
              {currentResults?.map((p) => (
                <tr key={p.id} className="cursor-pointer">
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.detalle}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.categoria}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.color}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.cliente}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.ancho}x{p?.alto}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.cantidad}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    <p
                      className={`${
                        p?.cantidad === p?.cantidadFaltante
                          ? "bg-green-500"
                          : "bg-orange-500"
                      } rounded-full py-2 w-[40px] text-white text-center mx-auto shadow`}
                    >
                      {p?.cantidadFaltante}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    <button
                      type="button"
                      // onClick={() => handleEliminarProductoPedido(p?.id)}
                      onClick={() => {
                        handleBorrarAccesorioOpen(), setGuardarId(p.id);
                      }}
                      className="max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-red-500/10  text-red-900 py-1 px-5 rounded-xl shadow border-[1px] border-red-800 text-sm"
                    >
                      eliminar
                    </button>
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    <button
                      onClick={() => {
                        openModal(), handleSeleccionarId(p?.id);
                      }}
                      type="button"
                      className="max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-white py-1 px-5 rounded-xl shadow border-[1px] border-slate-300 text-sm"
                    >
                      editar
                    </button>
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    <button
                      onClick={() => {
                        openModalEstado(), handleSeleccionarId(p?.id);
                      }}
                      type="button"
                      className="max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-slate-500/10 py-1 px-5 rounded-xl shadow border-[1px] border-slate-300 text-sm"
                    >
                      editar
                    </button>
                  </td>
                  <td className="py-3 px-3 text-sm text-left  uppercase">
                    <button
                      type="button"
                      className={`font-normal capitalize px-4 py-1 rounded max-md:text-xs max-md:py-1 max-md:px-4 ${
                        p?.cantidad === p?.cantidadFaltante
                          ? "bg-indigo-500/10 rounded-xl border-[1px] border-indigo-500 text-indigo-600"
                          : "bg-orange-500/10 rounded-xl border-[1px] border-orange-500 text-orange-600"
                      } shadow`}
                    >
                      {p?.cantidad === p?.cantidadFaltante
                        ? "completada"
                        : "pendiente"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
          <button
            className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-indigo-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                  : "bg-gray-100 shadow shadow-black/20 text-sm"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}

      <ModalEliminarPedido
        p={guardarId}
        handleEliminar={handleEliminarProductoPedido}
        openBorrarAccesorio={openBorrarAccesorio}
        handleBorrarAccesorioClose={handleBorrarAccesorioClose}
      />

      {/* <div className="max-md:hiddens max-md:items-start border-[1px] shadow py-10 max-md:shadow-none px-10 rounded flex gap-4 max-md:flex-col max-md:px-1 max-md:py-2 max-md:border-none">
        <button
          onClick={() => openModalCrearPedido()}
          className="py-2 px-5 bg-indigo-500 rounded-xl shadow font-normal text-sm text-white max-md:text-sm flex gap-2 text-center items-center"
        >
          Crear un nuevo producto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </button>
      </div> */}
      <ModalEditarProductoPedido
        obtenerId={obtenerId}
        isOpen={isOpen}
        closeModal={closeModal}
        datos={datos}
        setDatos={setDatos}
      />
      <ModalEditarProductoPedidoEstado
        datos={datos}
        setDatos={setDatos}
        obtenerId={obtenerId}
        isOpenEstado={isOpenEstado}
        closeModalEstado={closeModalEstado}
      />
      <ModalCrearProductoPedido
        datos={datos}
        isOpenPedido={isOpenPedido}
        closeModalCrearPedido={closeModalCrearPedido}
      />
      <CrearNuevoPedidoViewPedido
        datosCliente={datosCliente}
        isOpenCrarPedido={isOpenCrarPedido}
        closeModalCrearPedidos={closeModalCrearPedidos}
      />
    </section>
  );
};
