//imports
import { createContext, useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  crearFacturaNueva,
  deleteFactura,
  obtenerRemitos,
  obtenerFactura,
} from "../api/remitos.api";
import { obtenerFacturas } from "../api/factura.api";

import { obtenerUnicoPerfil } from "../api/aberturas.api";

//context
export const RemitoContext = createContext();

//use context
export const useRemitoContext = () => {
  const context = useContext(RemitoContext);
  if (!context) {
    throw new Error("use factura context");
  }
  return context;
};

//provider
export const RemitoProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [obtenerProductoId, setObtenerProductoId] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [productoUnicoState, setProductoUnico] = useState([]);
  const [errorProducto, setErrorProducto] = useState(false);
  const [datosPresupuesto, setDatosPresupuesto] = useState([]);
  const [unicoPresupuesto, setUnicoPresupuesto] = useState([]);
  const [cliente, setCliente] = useState("");
  const [detalle, setDetalle] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [direccion, setDireccion] = useState("");
  const [trasladado, setTrasladado] = useState("");
  const [fecha, setFecha] = useState("");
  const [remito, setRemito] = useState("");
  const [isOpenProductos, setIsOpenProductos] = useState(false);
  const [obtenerTodosLosDatos, setObtenerTodosLosDatos] = useState([]);

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

  // console.log(obtenerTodosLosDatos);

  if (!search) {
    results = obtenerTodosLosDatos;
  } else {
    results = obtenerTodosLosDatos.filter(
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
      cantidad: e.cantidad,
      cliente: e.cliente,
    };
  });

  const generarNumeroRandom = () => {
    const numeroDecimal = Math.random();
    const numeroEntero = Math.floor(numeroDecimal * 1000000);
    return numeroEntero;
  };

  const numeroRemito = generarNumeroRandom();

  //crear factura
  const handlePedido = async () => {
    const res = await crearFacturaNueva({
      cliente: cliente,
      productos: { respuesta },
      detalle: detalle,
      fecha: fecha,
      remito: numeroRemito,
      solicitante: solicitante,
      direccion: direccion,
      trasladado: trasladado,
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
    cantidad,
    cliente
  ) => {
    const newProducto = {
      id,
      nombre,
      detalle,
      color,
      categoria,
      ancho,
      alto,
      cantidad,
      cliente,
    };

    const productoSeleccionadoItem = productoSeleccionado.find((item) => {
      // return item.nombre;
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

  console.log(productoSeleccionado);

  const deleteProducto = (
    id,
    nombre,
    detalle,
    color,
    categoria,
    ancho,
    alto,
    cantidad,
    cliente
  ) => {
    const itemIndex = productoSeleccionado.findIndex(
      (item) =>
        item.id === id &&
        item.nombre === nombre &&
        item.detalle === detalle &&
        item.color === color &&
        item.categoria === categoria &&
        item.ancho === ancho &&
        item.alto === alto &&
        item.cantidad === cantidad &&
        item.cliente === cliente
    );

    if (itemIndex) {
      const newItem = [...productoSeleccionado];
      newItem.splice(itemIndex);
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

    const presupuestoActualizado = obtenerTodosLosDatos.filter(
      (perfilState) => perfilState.id !== id
    );

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

    setObtenerTodosLosDatos(presupuestoActualizado);
  };

  useEffect(() => {
    async function obtenerDatos() {
      const res = await obtenerRemitos();

      setObtenerTodosLosDatos(res.data);
    }
    obtenerDatos();
  }, []);

  return (
    <RemitoContext.Provider
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
        obtenerTodosLosDatos,
        solicitante,
        setSolicitante,
        direccion,
        setDireccion,
        trasladado,
        setTrasladado,
      }}
    >
      {children}
    </RemitoContext.Provider>
  );
};
