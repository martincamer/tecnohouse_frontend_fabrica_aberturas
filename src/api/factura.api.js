import axios from "./axios";

export const crearFacturaNueva = (datos) => axios.post("/pedido", datos);

export const obtenerFacturas = () => axios.get("/pedido");

export const obtenerFactura = (id) => axios.get(`/pedido/${id}`);

export const deleteFactura = (id) => axios.delete(`/pedido/${id}`);

export const deleteFacturaProducto = (id) =>
  axios.delete(`/pedido-delete/${id}`);

export const actualizarFactura = (id, data) => axios.put(`/pedido/${id}`, data);

export const actualizarFacturaProductoUnico = (id, data) =>
  axios.put(`/pedido-edit/${id}`, data);

export const obtenerValorUnico = (id) => axios.get(`/pedido-unico/${id}`);

export const crearValorPedidoUnico = (id, data) =>
  axios.post(`/${id}/pedido-create`, data);
