//imports
import { createContext, useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  crearFacturaNueva,
  deleteFactura,
  obtenerFacturas,
  obtenerFactura,
} from "../api/factura.api";

import { obtenerUnicoPerfil } from "../api/aberturas.api";

//context
export const PedidoContext = createContext();

//use context
export const usePedidoContext = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("use factura context");
  }
  return context;
};

//provider
export const PedidoProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [obtenerProductoId, setObtenerProductoId] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [productoUnicoState, setProductoUnico] = useState([]);
  const [errorProducto, setErrorProducto] = useState(false);
  const [datosPresupuesto, setDatosPresupuesto] = useState([]);
  const [unicoPresupuesto, setUnicoPresupuesto] = useState([]);
  const [cliente, setCliente] = useState("");
  const [detalle, setDetalle] = useState("");
  const [fecha, setFecha] = useState("");
  const [remito, setRemito] = useState("");
  const [isOpenProductos, setIsOpenProductos] = useState(false);

  function closeModalProductos() {
    setIsOpenProductos(false);
  }

  function openModalProductos() {
    setIsOpenProductos(true);
  }

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //buscador de pedidos
  let results = [];

  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  if (!search) {
    results = datosPresupuesto;
  } else {
    results = datosPresupuesto.filter(
      (dato) =>
        dato?.cliente?.toLowerCase().includes(search.toLocaleLowerCase()) ||
        dato?.remito?.toLowerCase().includes(search.toLocaleLowerCase()) ||
        dato?.fecha?.toLowerCase().includes(search.toLocaleLowerCase()) ||
        dato?.created_at?.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  const respuesta = productoSeleccionado.map(function (e) {
    return {
      id: e.id,
      nombre: e.nombre,
      detalle: e.detalle,
      color: e.color,
      categoria: e.categoria,
      ancho: e.ancho,
      alto: e.alto,
      cliente: e.cliente,
      cantidad: e.cantidad,
      cantidadFaltante: e.cantidadFaltante,
    };
  });

  //crear factura
  const handlePedido = async () => {
    const res = await crearFacturaNueva({
      cliente: cliente,
      productos: { respuesta },
      detalle: detalle,
      fecha: fecha,
      remito: remito,
    });

    const presupuestoActualizado = [...datosPresupuesto, res.data];

    setDatosPresupuesto(presupuestoActualizado);

    setProductoSeleccionado([]);

    toast.success("¡Pedido creado correctamente!", {
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

  //fin crear factura

  const addToProductos = (
    id,
    nombre,
    detalle,
    color,
    categoria,
    ancho,
    alto,
    cliente,
    cantidad,
    cantidadFaltante
  ) => {
    const newProducto = {
      id,
      nombre,
      detalle,
      color,
      categoria,
      ancho,
      alto,
      cliente,
      cantidad,
      cantidadFaltante,
    };

    const productoSeleccionadoItem = productoSeleccionado.find((item) => {
      return item.id === id;
    });

    if (productoSeleccionadoItem) {
      setTimeout(() => {
        setErrorProducto(false);
      }, 2000);
      setErrorProducto(true);
    } else {
      setProductoSeleccionado([...productoSeleccionado, newProducto]);
      setErrorProducto(false);
    }
  };

  const deleteProducto = (id) => {
    const itemIndex = productoSeleccionado.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const newItem = [...productoSeleccionado];
      newItem.splice(itemIndex, 1); // Corrected line
      setProductoSeleccionado(newItem);
    }
  };

  const deleteToResetProductos = () => {
    const newDato = [];
    setProductoSeleccionado(newDato);
  };

  const handleSeleccionarProducto = (id) => {
    setObtenerProductoId(id);
  };

  useEffect(() => {
    async function productoUnico() {
      const res = await obtenerUnicoPerfil(obtenerProductoId);
      setProductoUnico(res.data);
    }
    productoUnico();
  }, [obtenerProductoId]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await obtenerFacturas();

        setDatosPresupuesto(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const obtenerDato = async (id) => {
    const { data } = await obtenerFactura(id);
    setUnicoPresupuesto(data);
  };

  //eliminar presupuesto
  const handleDeletePresupuesto = (id) => {
    deleteFactura(id);

    toast.error("¡Pedido eliminado correctamente!", {
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

  return (
    <PedidoContext.Provider
      value={{
        results,
        obtenerDato,
        handleSeleccionarProducto,
        obtenerProductoId,
        productoUnicoState,
        addToProductos,
        productoSeleccionado,
        deleteToResetProductos,
        deleteProducto,
        errorProducto,
        datosPresupuesto,
        unicoPresupuesto,
        setUnicoPresupuesto,
        datosPresupuesto,
        setDatosPresupuesto,
        handleDeletePresupuesto,
        handlePedido,
        isOpen,
        openModal,
        closeModal,
        isOpenProductos,
        closeModalProductos,
        openModalProductos,
        setCliente,
        setDetalle,
        cliente,
        detalle,
        fecha,
        setFecha,
        setRemito,
        remito,
        search,
        searcher,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
