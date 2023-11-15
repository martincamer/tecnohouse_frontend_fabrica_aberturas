//imports
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { obtenerUnicoPerfil } from "../api/perfiles.api";
import { toast } from "react-toastify";
import {
  crearFacturaNueva,
  deleteFactura,
  obtenerFactura,
  obtenerFacturas,
} from "../api/factura.api";
import { actualizarClienteFacturacion } from "../api/clientes.api";

//context
export const FacturaContext = createContext();

//use context
export const useFacturaContext = () => {
  const context = useContext(FacturaContext);
  if (!context) {
    throw new Error("use factura context");
  }
  return context;
};

//provider
export const FacturaProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [obtenerProductoId, setObtenerProductoId] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [productoUnicoState, setProductoUnico] = useState([]);
  const [errorProducto, setErrorProducto] = useState(false);
  const [datosPresupuesto, setDatosPresupuesto] = useState([]);
  const [unicoPresupuesto, setUnicoPresupuesto] = useState([]);
  const [tipoFactura, setTipoFactura] = useState([]);

  const [totalPagarF, setTotalPagarF] = useState(false);

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
      barras: e.barras,
      totalKG: e.totalKG,
      color: e.color,
      categoria: e.categoria,
      totalPrecioUnitario: e.totalPrecioUnitario,
    };
  });

  //crear factura
  const handlePerfil = async () => {
    //crear factura nueva
    const res = await crearFacturaNueva({
      clientes: {
        nombre: clienteSeleccionado[0]?.nombre,
        apellido: clienteSeleccionado[0]?.apellido,
        localidad: clienteSeleccionado[0]?.localidad,
        provincia: clienteSeleccionado[0]?.provincia,
        email: clienteSeleccionado[0]?.email,
        telefono: clienteSeleccionado[0]?.telefono,
        dni: clienteSeleccionado[0]?.dni,
      },
      productos: { respuesta },
      estadistica: {
        total_kg: totalKg(),
        total_barras: totalBarras(),
        total_pagar: totalPagar(),
      },
      estado: "pendiente",
      tipo_factura: tipoFactura,
    });

    //tratar de actualizar la factura
    const resAct = await actualizarClienteFacturacion(
      clienteSeleccionado[0]?.id,
      {
        total_facturado: totalPagar(),
        entrega: 0,
        deuda_restante: totalPagar(),
      }
    );

    console.log(resAct.config.data);

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

  const addToClientes = (
    id,
    nombre,
    apellido,
    localidad,
    provincia,
    email,
    telefono,
    dni,
    total_facturado
  ) => {
    const newCliente = {
      id,
      nombre,
      apellido,
      localidad,
      provincia,
      email,
      telefono,
      dni,
      total_facturado,
    };

    setClienteSeleccionado([...clienteSeleccionado, newCliente]);
  };

  console.log(clienteSeleccionado[0]);

  useEffect(() => {
    setValue("nombre", clienteSeleccionado[0]?.nombre);
    setValue("apellido", clienteSeleccionado[0]?.apellido);
    setValue("localidad", clienteSeleccionado[0]?.localidad);
    setValue("provincia", clienteSeleccionado[0]?.provincia);
    setValue("email", clienteSeleccionado[0]?.email);
    setValue("telefono", clienteSeleccionado[0]?.telefono);
    setValue("dni", clienteSeleccionado[0]?.dni);
  }, [clienteSeleccionado]);

  const deleteToResetClientes = () => {
    const newDato = [];
    setClienteSeleccionado(newDato);
  };

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

  const deleteProducto = (
    id,
    nombre,
    detalle,
    color,
    barras,
    totalKG,
    categoria,
    totalPrecioUnitario
  ) => {
    const itemIndex = productoSeleccionado.findIndex(
      (item) =>
        item.id === id &&
        item.nombre === nombre &&
        item.detalle === detalle &&
        item.color === color &&
        item.barras === barras &&
        item.totalKG === totalKG &&
        item.categoria === categoria &&
        item.totalPrecioUnitario === totalPrecioUnitario
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

  //generar presupuesto pdf and guardar datos

  //obtener datos presupuestos
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

  const totalKg = () => {
    return productoSeleccionado.reduce((sum, b) => {
      return sum + Number(b.totalKG);
    }, 0);
  };

  const totalBarras = () => {
    return productoSeleccionado.reduce((sum, b) => {
      return sum + Number(b.barras);
    }, 0);
  };

  const totalPagar = () => {
    return productoSeleccionado.reduce((sum, b) => {
      return sum + Number(b.totalPrecioUnitario);
    }, 0);
  };

  const obtenerDatos = async (id) => {
    const { data } = await obtenerFactura(id);
    setUnicoPresupuesto(data);
  };

  //eliminar presupuesto
  const handleDeletePresupuesto = (id) => {
    deleteFactura(id);

    const presupuestoActualizado = datosPresupuesto.filter(
      (perfilState) => perfilState.id !== id
    );

    toast.error("¡Presupuesto eliminado correctamente!", {
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
    <FacturaContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        results,
        handleSeleccionarProducto,
        obtenerProductoId,
        addToClientes,
        register,
        deleteToResetClientes,
        productoUnicoState,
        addToProductos,
        productoSeleccionado,
        deleteToResetProductos,
        deleteProducto,
        errorProducto,
        handlePerfil,
        datosPresupuesto,
        totalKg,
        totalBarras,
        unicoPresupuesto,
        setUnicoPresupuesto,
        totalPagar,
        datosPresupuesto,
        setDatosPresupuesto,
        obtenerDatos,
        handleDeletePresupuesto,
        setTipoFactura,
      }}
    >
      {children}
    </FacturaContext.Provider>
  );
};
