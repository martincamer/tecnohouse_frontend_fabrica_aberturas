//imports
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  crearFacturaNueva,
  deleteFactura,
  obtenerFacturas,
  // obtenerFactura,
  // obtenerFacturas,
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

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //buscador de clientes
  let results = [];
  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //   if (!search) {
  //     results = clientes;
  //   } else {
  //     results = clientes.filter(
  //       (dato) =>
  //         dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) ||
  //         dato.apellido.toLowerCase().includes(search.toLocaleLowerCase())
  //     );
  //   }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const respuesta = productoSeleccionado.map(function (e) {
    return {
      nombre: e.nombre,
      detalle: e.detalle,
      categoria: e.categoria,
      color: e.color,
      categoria: e.categoria,
    };
  });

  //crear factura
  const handlePedido = async () => {
    //crear factura nueva
    const res = await crearFacturaNueva({
      clientes: {
        cliente: cliente,
      },
      pedido: { respuesta },
      detalle: detalle,
    });

    const presupuestoActualizado = [...datosPresupuesto, res.data];

    setDatosPresupuesto(presupuestoActualizado);

    setProductoSeleccionado([]);

    reset();

    toast.success("¡Presupuesto creado correctamente!", {
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
    barras,
    totalKG,
    categoria,
    totalPrecioUnitario
  ) => {
    const newProducto = {
      id,
      nombre,
      detalle,
      color,
      barras,
      totalKG,
      categoria,
      totalPrecioUnitario,
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

  const deleteProducto = (id, nombre, detalle, color, categoria) => {
    const itemIndex = productoSeleccionado.findIndex(
      (item) =>
        item.id === id &&
        item.nombre === nombre &&
        item.detalle === detalle &&
        item.color === color &&
        item.categoria === categoria
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

  // const totalKg = () => {
  //   return productoSeleccionado.reduce((sum, b) => {
  //     return sum + Number(b.totalKG);
  //   }, 0);
  // };

  // const totalBarras = () => {
  //   return productoSeleccionado.reduce((sum, b) => {
  //     return sum + Number(b.barras);
  //   }, 0);
  // };

  // const totalPagar = () => {
  //   return productoSeleccionado.reduce((sum, b) => {
  //     return sum + Number(b.totalPrecioUnitario);
  //   }, 0);
  // };

  // const obtenerDatos = async (id) => {
  //   const { data } = await obtenerFactura(id);
  //   setUnicoPresupuesto(data);
  // };

  //eliminar presupuesto
  const handleDeletePresupuesto = (id) => {
    deleteFactura(id);

    const presupuestoActualizado = datosPresupuesto.filter(
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

    setDatosPresupuesto(presupuestoActualizado);
  };

  return (
    <PedidoContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        results,
        handleSeleccionarProducto,
        obtenerProductoId,
        register,
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
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
