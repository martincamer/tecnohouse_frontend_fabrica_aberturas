import axios from "./axios";

export const crearCategorias = (data) =>
  axios.post("/categoria-productos", data);

export const obtenerCategorias = () => axios.get("/categoria-productos");

export const editarCategoria = (obtenerId, data) =>
  axios.put(`/categoria-productos/${obtenerId}`, data);

export const obtenerUnicaCategoria = (id) =>
  axios.get(`/categoria-productos/${id}`);

export const eliminarCategoria = (id) =>
  axios.delete(`/categoria-productos/${id}`);
