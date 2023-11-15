import axios from "./axios";

export const crearPerfilNuevo = (data) => axios.post("/perfiles", data);

export const obtenerDatosPerfiles = () => axios.get("/perfiles");

export const editarPerfil = (obtenerId, data) =>
  axios.put(`/perfiles/${obtenerId}`, data);

export const obtenerUnicoPerfil = (id) => axios.get(`/perfiles/${id}`);
