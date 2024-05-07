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

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);
  const [guardarId] = useState(false);

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
  };

  const itemsPerPage = 1; // Cantidad de elementos por página
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

  const agruparPorCliente = (productos) => {
    // Crear un objeto para agrupar productos por cliente
    const agrupadoPorCliente = productos.reduce((result, producto) => {
      const cliente = producto.cliente.toUpperCase(); // Normalizar el nombre del cliente
      if (!result[cliente]) {
        // Si no existe el cliente, inicializarlo con un arreglo
        result[cliente] = [];
      }
      // Agregar el producto al cliente correspondiente (excepto el campo 'cliente')
      const { cliente: _, ...productoSinCliente } = producto; // Remover el campo 'cliente'
      result[cliente].push(productoSinCliente); // Agregar el producto al cliente
      return result;
    }, {});

    // Convertir el objeto a un arreglo de clientes con productos
    const arregloAgrupado = Object.entries(agrupadoPorCliente).map(
      ([cliente, productos]) => ({
        cliente,
        productos, // Agregar todos los productos para el cliente
      })
    );

    return arregloAgrupado; // Retornar el arreglo agrupado por cliente
  };

  console.log("asdasda", agruparPorCliente(currentResults));

  return (
    <>
      <div className="w-full max-md:hidden flex flex-col gap-2">
        <div className="w-full bg-white flex max-md:hidden">
          <Link
            className="text-slate-500 px-6 py-3.5 font-bold text-lg"
            to="/pedidos"
          >
            Pedidos
          </Link>
          <Link
            className="text-indigo-500 bg-indigo-100 px-6 py-3.5 font-bold text-lg"
            // to="/pedidos"
          >
            Pedido obtenido n° {datosCliente?.id}
          </Link>
        </div>

        <div className="px-10 md:mt-6  max-md:pt-5 max-md:px-5">
          <p className="font-bold text-2xl text-slate-600 max-md:text-lg">
            Bienvenido al pedido observa los datos y crea nuevas aberturas 🖐️🚀.
          </p>
        </div>
        <section className="w-full py-2 px-10 max-md:py-0 max-md:px-4 flex flex-col gap-8 max-md:gap-5 max-md:pb-20">
          <div className="max-md:shadow-none max-md:border-none max-md:px-2 max-md:py-0  rounded-2xl  transition-all ease-linear cursor-pointer">
            <article className="max-md:gap-3 grid grid-cols-4 gap-4 max-md:w-[1000px]">
              <div className="py-5 px-3 rounded-xl bg-white flex flex-row gap-1 font-semibold justify-center items-center shadow-lg">
                <p className="text-sm max-md:text-sm uppercase">
                  Numero del pedido{" "}
                </p>{" "}
                <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
                  {datosCliente?.id}
                </p>
              </div>
              <div className="py-5 px-3 rounded-xl bg-white flex flex-row gap-1 font-semibold justify-center items-center shadow-lg">
                <p className="text-sm max-md:text-sm uppercase">Fabrica </p>{" "}
                <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
                  {datosCliente?.cliente}
                </p>
              </div>

              <div className="py-5 px-3 rounded-xl bg-white flex flex-row gap-1 font-semibold justify-center items-center shadow-lg">
                <p className="text-sm max-md:text-sm uppercase">
                  Total aberturas
                </p>{" "}
                <p className="font-semibold text-indigo-500 text-sm max-md:text-sm">
                  {totalAberturas()}
                </p>
              </div>
            </article>
          </div>

          <div className="flex px-2">
            <button
              onClick={() => openModalCrearPedidos()}
              className="max-md:uppercase bg-green-500 text-white text-sm font-bold uppercase rounded-full py-2.5 px-8 hover:bg-green-500 hover:text-white transtion-all ease-linear duration-300 max-md:text-sm flex gap-2 items-center"
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
              <p className="text-sm font-bold text-indigo-500 max-md:text-sm uppercase">
                Pedido de aberturas - Total pedido
              </p>{" "}
              -{" "}
              <p className="text-sm font-bold max-md:text-sm uppercase text-slate-600">
                Fecha de emicion: {dateTime(datosCliente?.created_at)}
              </p>
            </div>
            <div className="flex gap-5 items-center max-md:flex-col max-md:gap-2 max-md:items-start">
              <div className="flex gap-2 items-center ">
                <p className="text-sm max-md:text-sm uppercase font-bold">
                  Total Aberturas:
                </p>{" "}
                <p className="font-extrabold text-indigo-500 text-base max-md:text-sm uppercase">
                  {totalAberturas()}
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
                  className="bg-indigo-500 py-2 rounded-full text-white uppercase px-6 text-sm font-bold flex gap-2 items-center"
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

            <div className="grid grid-cols-4 gap-3">
              {agruparPorCliente(currentResults).map((p) => (
                <div
                  className="bg-white shadow-xl rounded-xl py-3 px-3"
                  key={p.id}
                >
                  <div className="flex justify-between">
                    <p className="font-bold text-slate-600 uppercase">
                      Cliente <span className="font-medium">{p.cliente}</span>
                    </p>
                    <div className="flex gap-2 items-center">
                      {" "}
                      <p className="bg-green-500/90 rounded-full px-3 py-1 text-white font-bold shadow-md">
                        {p?.productos?.reduce((sum, b) => {
                          return sum + Number(b?.cantidad);
                        }, 0)}
                      </p>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          className="cursor-pointer hover:text-indigo-500 transition-all"
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
                              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                            />
                          </svg>
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow-xl border border-gray-300 bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <button
                              onClick={() => {
                                openModal(), handleSeleccionarId(p?.id);
                              }}
                              type="button"
                              className="uppercase font-semibold bg-green-500 py-2 px-2 rounded-xl text-white hover:text-green-700 hover:bg-green-100"
                            >
                              editar product.
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="font-bold text-sm uppercase text-center underline">
                      Aberturas entregadas
                    </p>

                    <div className="flex flex-col gap-2 mt-2 overflow-y-scroll px-2 scroll-bar h-[20vh]">
                      {p.productos.map((producto) => (
                        <div
                          className="border-slate-200 border py-1 px-1 rounded"
                          key={producto.id}
                        >
                          <p className="text-sm font-bold uppercase">
                            Desc.{" "}
                            <span className="font-medium">
                              {producto.detalle}
                            </span>
                          </p>
                          <p className="text-sm font-bold uppercase">
                            Cat.{" "}
                            <span className="font-medium">
                              {producto.categoria}
                            </span>
                          </p>
                          <p className="text-sm font-bold uppercase">
                            Col.{" "}
                            <span className="font-medium">
                              {producto.color}
                            </span>
                          </p>
                          <p className="text-sm font-bold uppercase">
                            AnchoxAlto.{" "}
                            <span className="font-medium">
                              {producto.ancho}x{producto.alto}
                            </span>
                          </p>
                          <p className="text-sm font-bold uppercase">
                            Cant.{" "}
                            <span className="font-medium">
                              {producto.cantidad}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1 font-bold">
              <button
                className="mx-1 px-2 py-1 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
                            ? "bg-indigo-500 text-white transition-all border-[1px] border-indigo-500 ease-in-out shadow shadow-black/20 text-sm"
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
                className="mx-1 px-2 py-1 border-slate-300 border-[1px] rounded-xl bg-white shadow shadow-black/20 text-sm flex gap-1 items-center cursor-pointer max-md:px-2"
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
      </div>
    </>
  );
};
