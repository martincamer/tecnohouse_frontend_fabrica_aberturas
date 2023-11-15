import axios from "./axios";

export const crearColor = (data) => axios.post("/color-productos", data);

export const obtenerColores = () => axios.get("/color-productos");

export const editarColor = (obtenerId, data) =>
  axios.put(`/color-productos/${obtenerId}`, data);

export const obtenerUnicaColor = (id) => axios.get(`/color-productos/${id}`);

export const eliminarColor = (id) => axios.delete(`/color-productos/${id}`);
