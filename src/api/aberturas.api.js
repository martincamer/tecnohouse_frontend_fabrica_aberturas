import axios from "./axios";

export const crearPerfilNuevo = (data) => axios.post("/productos", data);

export const obtenerDatosPerfiles = () => axios.get("/productos");

export const editarPerfil = (obtenerId, data) =>
  axios.put(`/productos/${obtenerId}`, data);

export const obtenerUnicoPerfil = (id) => axios.get(`/productos/${id}`);
