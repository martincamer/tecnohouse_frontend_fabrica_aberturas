import axios from "./axios";

export const crearFacturaNueva = (datos) => axios.post("/facturacion", datos);

export const obtenerFacturas = () => axios.get("/facturacion");

export const obtenerFactura = (id) => axios.get(`/facturacion/${id}`);

export const deleteFactura = (id) => axios.delete(`/facturacion/${id}`);

export const actualizarFactura = (id, data) =>
  axios.put(`/facturacion/${id}`, data);
