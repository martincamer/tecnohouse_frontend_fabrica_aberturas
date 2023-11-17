import axios from "./axios";

export const crearFacturaNueva = (datos) => axios.post("/pedido", datos);

export const obtenerFacturas = () => axios.get("/pedido");

export const obtenerFactura = (id) => axios.get(`/pedido/${id}`);

export const deleteFactura = (id) => axios.delete(`/pedido/${id}`);

export const actualizarFactura = (id, data) => axios.put(`/pedido/${id}`, data);
