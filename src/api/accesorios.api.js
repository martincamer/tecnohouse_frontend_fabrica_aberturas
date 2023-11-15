import axios from "./axios";

export const crearAccesorioNuevo = (data) => axios.post("/accesorios", data);

export const obtenerDatosAccesorios = () => axios.get("/accesorios");

export const editarAccesorio = (obtenerId, data) =>
  axios.put(`/accesorios/${obtenerId}`, data);

export const obtenerUnicoAccesorio = (id) => axios.get(`/accesorios/${id}`);
