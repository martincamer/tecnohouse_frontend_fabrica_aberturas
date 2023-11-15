import axios from "./axios";

export const crearColor = (data) => axios.post("/color-perfiles", data);

export const obtenerColores = () => axios.get("/color-perfiles");

export const editarColor = (obtenerId, data) =>
  axios.put(`/color-perfiles/${obtenerId}`, data);

export const obtenerUnicaColor = (id) => axios.get(`/color-perfiles/${id}`);

export const eliminarColor = (id) => axios.delete(`/color-perfiles/${id}`);
