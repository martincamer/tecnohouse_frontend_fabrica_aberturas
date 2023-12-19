import axios from "./axios";

export const crearFacturaNueva = (datos) => axios.post("/remito", datos);

export const obtenerFacturas = () => axios.get("/remito");

export const obtenerFactura = (id) => axios.get(`/remito/${id}`);

export const deleteFactura = (id) => axios.delete(`/remito/${id}`);

export const deleteFacturaProducto = (id) => axios.delete(`/remito/${id}`);

export const actualizarFactura = (id, data) => axios.put(`/remito/${id}`, data);

export const actualizarFacturaProductoUnico = (id, data) =>
  axios.put(`/remito/${id}`, data);

export const obtenerValorUnico = (obtenerId) =>
  axios.get(`/remito/${obtenerId}`);

export const crearValorPedidoUnico = (id, data) =>
  axios.post(`/${id}/remito`, data);
