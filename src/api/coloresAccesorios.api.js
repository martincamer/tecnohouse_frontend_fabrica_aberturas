import axios from "./axios";

export const crearColor = (data) => axios.post("/color-accesorios", data);

export const obtenerColores = () => axios.get("/color-accesorios");

export const editarColor = (obtenerId, data) =>
  axios.put(`/color-accesorios/${obtenerId}`, data);

export const obtenerUnicaColor = (id) => axios.get(`/color-accesorios/${id}`);

export const eliminarColor = (id) => axios.delete(`/color-accesorios/${id}`);
