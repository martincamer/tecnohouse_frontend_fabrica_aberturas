import axios from "./axios";

export const actualizarRemito = (id, data) =>
  axios.put(`/remito-edit/${id}`, data);
