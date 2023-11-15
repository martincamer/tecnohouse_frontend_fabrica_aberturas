//imports
import { createContext, useContext, useEffect, useState } from "react";
import { obtenerDatosPerfiles } from "../api/aberturas.api";
import axios from "../api/axios";
import { toast } from "react-toastify";
import {
  eliminarCategoria,
  obtenerCategorias,
} from "../api/categoriasAberturas.api";
import { eliminarColor, obtenerColores } from "../api/coloresAberturas.api";

//context
export const AberturasContext = createContext();

//use context
export const useAberturasContext = () => {
  const context = useContext(AberturasContext);
  if (!context) {
    throw new Error("use Auth propvider");
  }
  return context;
};

//provider
export const AberturasProvider = ({ children }) => {
  const [perfiles, setPerfiles] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [colores, setColores] = useState([]);
  const [search, setSearch] = useState("");
  const [obtenerId, setObtenerId] = useState("");
  const [obtenerIdCategoria, setObtenerIdCategoria] = useState("");
  const [obtenerIdColores, setObtenerIdColores] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEditar, setIsOpenEditar] = useState(false);
  let [isOpenCrearCategoria, setIsOpenCrearCategoria] = useState(false);
  let [isOpenVerCategorias, setIsOpenVerCategorias] = useState(false);
  let [isOpenEditarCategorias, setIsOpenEditarCategorias] = useState(false);
  let [isOpenVerColores, setIsOpenVerColores] = useState(false);
  let [isOpenEditarColores, setIsOpenEditarColores] = useState(false);
  let [isOpenEditarColor, setIsOpenEditarColor] = useState(false);

  const handlePerfilSeleccionado = (id) => {
    setObtenerId(id);
  };

  const handleCategoriaSeleccionada = (id) => {
    setObtenerIdCategoria(id);
  };

  const handleColorSeleccionada = (id) => {
    setObtenerIdColores(id);
  };

  //categoria nuevo producto
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //editar modal productos
  function closeModalEditar() {
    setIsOpenEditar(false);
  }

  function openModalEditar() {
    setIsOpenEditar(true);
  }

  function closeModalCrearCategoria() {
    setIsOpenCrearCategoria(false);
  }

  function openModalCrearCategoria() {
    setIsOpenCrearCategoria(true);
  }

  function closeModalVerCategoria() {
    setIsOpenVerCategorias(false);
  }

  function openModalVerCategoria() {
    setIsOpenVerCategorias(true);
  }

  function closeModalEditarCategoria() {
    setIsOpenEditarCategorias(false);
  }

  function openModalEditarCategoria() {
    setIsOpenEditarCategorias(true);
  }

  function closeModalVerColores() {
    setIsOpenVerColores(false);
  }

  function openModalVerColores() {
    setIsOpenVerColores(true);
  }

  function closeModalEditarColores() {
    setIsOpenEditarColores(false);
  }

  function openModalEditarColores() {
    setIsOpenEditarColores(true);
  }

  function closeModalEditarColor() {
    setIsOpenEditarColor(false);
  }

  function openModalEditarColor() {
    setIsOpenEditarColor(true);
  }

  let results = [];
  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  if (!search) {
    results = perfiles;
  } else {
    results = perfiles.filter(
      (dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) ||
        dato.descripcion.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  useEffect(() => {
    obtenerDatosPerfiles().then((response) => {
      setPerfiles(response.data);
    });
  }, []);

  const eliminarPerfil = (id) => axios.delete(`/productos/${id}`);

  const handleEliminar = (id) => {
    eliminarPerfil(id);

    const perfilActualizado = perfiles.filter(
      (perfilState) => perfilState.id !== id
    );

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

    setPerfiles(perfilActualizado);
  };

  useEffect(() => {
    obtenerCategorias().then((response) => {
      setCategorias(response.data);
    });
  }, []);

  const handleEliminarCategoria = (id) => {
    eliminarCategoria(id);

    const categoriaActualizada = categorias.filter(
      (categoriaState) => categoriaState.id !== id
    );

    toast.error("¡Categoria eliminada correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setCategorias(categoriaActualizada);
  };

  useEffect(() => {
    obtenerColores().then((response) => {
      setColores(response.data);
    });
  }, []);

  const handleEliminarColor = (id) => {
    eliminarColor(id);

    const colorActualizado = colores.filter(
      (colorState) => colorState.id !== id
    );

    toast.error("¡Color eliminado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setColores(colorActualizado);
  };

  return (
    <AberturasContext.Provider
      value={{
        perfiles,
        handleEliminar,
        setPerfiles,
        search,
        setSearch,
        obtenerId,
        handlePerfilSeleccionado,
        results,
        closeModal,
        openModal,
        closeModalEditar,
        openModalEditar,
        isOpen,
        isOpenEditar,
        searcher,
        isOpenCrearCategoria,
        closeModalCrearCategoria,
        openModalCrearCategoria,
        categorias,
        setCategorias,
        isOpenVerCategorias,
        closeModalVerCategoria,
        openModalVerCategoria,
        handleEliminarCategoria,
        closeModalEditarCategoria,
        openModalEditarCategoria,
        isOpenEditarCategorias,
        handleCategoriaSeleccionada,
        obtenerIdCategoria,
        setColores,
        colores,
        closeModalVerColores,
        openModalVerColores,
        isOpenVerColores,
        obtenerIdColores,
        handleColorSeleccionada,
        closeModalEditarColores,
        openModalEditarColores,
        isOpenEditarColores,
        handleEliminarColor,
        closeModalEditarColor,
        openModalEditarColor,
        isOpenEditarColor,
      }}
    >
      {children}
    </AberturasContext.Provider>
  );
};
