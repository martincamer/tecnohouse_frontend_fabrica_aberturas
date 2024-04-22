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

    // setPerfiles(proyectoActualizado);
    toast.error("¡Abertura del cliente eliminada correctamente!", {
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

  // Obtener todos los resultados de la búsqueda
  const allResults = performSearch();

  // Calcular el número total de páginas
  const totalPages = Math.ceil(allResults.length / itemsPerPage);

  // Calcular los índices de los elementos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los resultados de la página actual
  const currentResults = allResults
    ?.sort((a, b) => {
      // Si a es pendiente y b no lo es, a debería ir primero
      if (
        a.cantidad !== a.cantidadFaltante &&
        b.cantidad === b.cantidadFaltante
      ) {
        return -1;
      }
      // Si b es pendiente y a no lo es, b debería ir primero
      if (
        b.cantidad !== b.cantidadFaltante &&
        a.cantidad === a.cantidadFaltante
      ) {
        return 1;
      }
      // En cualquier otro caso, no se altera el orden
      return 0;
    })
    ?.slice(indexOfFirstItem, indexOfLastItem);

  // Manejar el cambio de página
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
    <section className="w-full py-2 px-5 max-md:py-0 max-md:px-4 flex flex-col gap-8 max-md:gap-5 max-md:pb-20">
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
          } font-normal text-white text-sm max-md:text-xs uppercase  px-4 py-3 rounded-xl shadow`}
        >
          {totalAberturasRealizadas() === totalAberturas()
            ? "estado del pedido finalizado"
            : "estado del pedido pendiente"}
        </p>
      </div>
      <div className="max-md:shadow-none max-md:border-none max-md:px-2 max-md:py-0  rounded-2xl  transition-all ease-linear cursor-pointer overflow-x-scroll">
        <article className="max-md:gap-3 grid grid-cols-4 gap-4 max-md:w-[1000px]">
          <div className="hover:shadow-md transition-all ease-linear flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
            <p className="text-sm max-md:text-sm uppercase">
              Numero del pedido:{" "}
            </p>{" "}
            <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
              {datosCliente?.id}
            </p>
          </div>
          <div className="hover:shadow-md transition-all ease-linear flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
            <p className="text-sm max-md:text-sm uppercase">Cliente: </p>{" "}
            <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
              {datosCliente?.cliente}
            </p>
          </div>

          <div className="hover:shadow-md transition-all ease-linear flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
            <p className="text-sm max-md:text-sm uppercase">Total aberturas:</p>{" "}
            <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
              {totalAberturas()}
            </p>
          </div>

          <div className="hover:shadow-md transition-all ease-linear flex gap-2 max-md:py-4 items-center bg-white border-slate-300 shadow rounded-xl py-6 px-5 border-[1px]">
            <p className="text-sm max-md:text-sm uppercase">
              Total realizadas:
            </p>{" "}
            <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
              {totalAberturasRealizadas()}
            </p>
          </div>
        </article>
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
          <div className="flex gap-2 items-center ">
            <p className="text-sm max-md:text-sm uppercase">Total Aberturas:</p>{" "}
            <p className="font-semibold text-indigo-500 text-base max-md:text-sm uppercase">
              {totalAberturas()}
            </p>
          </div>
          -
          <div className="flex gap-2 items-center max-md:flex-col max-md:items-start">
            <p className="text-sm max-md:text-sm uppercase">
              Total realizadas:
            </p>{" "}
            <p
              className={`${
                totalAberturasRealizadas() === totalAberturas()
                  ? "bg-indigo-500"
                  : "bg-orange-500"
              } font-normal text-white max-md:text-sm uppercase text-sm  px-4 py-2 rounded-xl shadow`}
            >
              <span className="font-bold">{totalAberturasRealizadas()}</span>
              {" / "}
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

          <div className="flex max-md:hidden">
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
                    className="max-md:text-xs max-md:py-1.5 max-md:px-4 font-normal rounded-xl text-red-700 bg-red-100 uppercase text-xs"
                  >
                    eliminar
                  </button>
                  <button
                    onClick={() => {
                      openModal(), handleSeleccionarId(p?.id);
                    }}
                    type="button"
                    className="max-md:text-xs max-md:py-1.5 max-md:px-4 font-normal rounded-xl text-indigo-700 bg-indigo-100 uppercase text-xs"
                  >
                    editar
                  </button>
                  <button
                    onClick={() => {
                      openModalEstado(), handleSeleccionarId(p?.id);
                    }}
                    type="button"
                    className="max-md:text-xs max-md:py-1.5 max-md:px-4 font-normal rounded-xl text-green-700 bg-green-100 uppercase text-xs"
                  >
                    editar stock
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
                        ? "bg-green-500 rounded-lg text-white uppercase"
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

        <div className="overflow-x-auto rounded-2xl hover:shadow-md transition-all ease-in-out border border-gray-200 mt-5 max-md:hidden md:block h-[80vh]">
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
                  AnchoXAlto
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Cliente
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Cantidad
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Realizado
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-center">
                  Acciones
                </th>
                <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                  Abertura realizada
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-left">
              {currentResults?.map((p) => (
                <tr key={p.id} className="cursor-pointer">
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                    {p?.detalle}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.categoria}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.color}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.ancho}x{p?.alto}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase font-bold">
                    {p?.cliente}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                    {p?.cantidad}
                  </td>
                  <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase flex">
                    <p
                      className={`${
                        p?.cantidad === p?.cantidadFaltante
                          ? "bg-green-500"
                          : "bg-orange-500"
                      } rounded-xl py-1 px-3 text-white text-center mx-auto shadow`}
                    >
                      {p?.cantidadFaltante}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-sm text-left space-x-2">
                    <button
                      type="button"
                      // onClick={() => handleEliminarProductoPedido(p?.id)}
                      onClick={() => {
                        handleBorrarAccesorioOpen(), setGuardarId(p.id);
                      }}
                      className="uppercase max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-red-500/10  text-red-900 py-2 px-5 rounded-xl text-sm hover:shaodw-md transition-all ease-linear"
                    >
                      eliminar
                    </button>

                    <button
                      onClick={() => {
                        openModal(), handleSeleccionarId(p?.id);
                      }}
                      type="button"
                      className="uppercase max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-green-500/10  text-green-700 py-2 px-5 rounded-xl text-sm hover:shaodw-md transition-all ease-linear"
                    >
                      editar product.
                    </button>

                    <button
                      onClick={() => {
                        openModalEstado(), handleSeleccionarId(p?.id);
                      }}
                      type="button"
                      className="uppercase max-md:text-xs max-md:py-1 max-md:px-4 font-normal bg-indigo-500/10  text-indigo-700 py-2 px-5 rounded-xl text-sm hover:shaodw-md transition-all ease-linear"
                    >
                      editar cant.
                    </button>
                  </td>
                  <td className="py-3 px-3 text-sm text-left  uppercase">
                    <button
                      type="button"
                      className={`font-normal px-4 py-2 rounded-xl max-md:text-xs max-md:py-1 max-md:px-4 ${
                        p?.cantidad === p?.cantidadFaltante
                          ? "bg-green-500 rounded-xl text-white"
                          : "bg-orange-500 rounded-xl text-white"
                      } uppercase shadow-md shadow-gray-300/10`}
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
            className="mx-1 px-3 py-2 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
          {(() => {
            // Determina el rango de páginas visibles
            const maxVisiblePages = 2; // Máximo de páginas a mostrar
            const halfRange = Math.floor(maxVisiblePages / 2);

            let startPage = Math.max(currentPage - halfRange, 1);
            let endPage = Math.min(currentPage + halfRange, totalPages);

            // Asegúrate de que el rango tenga 5 elementos
            if (endPage - startPage < maxVisiblePages - 1) {
              if (startPage === 1) {
                endPage = Math.min(maxVisiblePages, totalPages);
              } else if (endPage === totalPages) {
                startPage = Math.max(totalPages - (maxVisiblePages - 1), 1);
              }
            }

            return Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => {
                const pageIndex = startPage + index;
                return (
                  <button
                    key={pageIndex}
                    className={`mx-1 px-3 py-1 rounded-xl ${
                      currentPage === pageIndex
                        ? "bg-green-500 text-white transition-all border-[1px] border-green-500 ease-in-out shadow shadow-black/20 text-sm"
                        : "bg-white border-slate-300 border-[1px] shadow shadow-black/20 text-sm"
                    }`}
                    onClick={() => handlePageChange(pageIndex)}
                  >
                    {pageIndex}
                  </button>
                );
              }
            );
          })()}
          <button
            className="mx-1 px-3 py-2 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
        setDatos={setDatos}
        datos={datos}
      />
    </section>
  );
};
