import { SyncLoader } from "react-spinners";
import React, { useState } from "react";
import client from "../../../api/axios";
import XLSX from "xlsx";

export const EntradasDos = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [dataNew, setDatos] = useState([]);

  const [loading, setLoading] = useState(false);

  const obtenerIngresoRangoFechas = async (fechaInicio, fechaFin) => {
    try {
      // Setea el estado de loading a true para mostrar el spinner
      setLoading(true);

      // Validación de fechas
      if (!fechaInicio || !fechaFin) {
        console.error("Fechas no proporcionadas");
        return;
      }

      // Verifica y formatea las fechas
      fechaInicio = new Date(fechaInicio).toISOString().split("T")[0];
      fechaFin = new Date(fechaFin).toISOString().split("T")[0];

      const response = await client.post("/entrada-dos/rango-fechas", {
        fechaInicio,
        fechaFin,
      });

      setDatos(response.data); // Maneja la respuesta según tus necesidades
    } catch (error) {
      console.error("Error al obtener ingresos:", error);
      // Maneja el error según tus necesidades
    } finally {
      // Independientemente de si la solicitud es exitosa o falla, establece el estado de loading a false
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const buscarIngresosPorFecha = () => {
    obtenerIngresoRangoFechas(fechaInicio, fechaFin);
  };

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = dataNew?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataNew.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  // Función para descargar los resultados como un archivo Excel
  const downloadExcel = () => {
    // Preparar los datos en un formato adecuado para XLSX
    const data = currentResults.map((p) => [
      p.codigo.toUpperCase(),
      p.detalle.toUpperCase(),
      p.ancho.toUpperCase(),
      p.alto.toUpperCase(),
      p.ingreso,
      formatDate(p.created_at),
    ]);

    // Crear una hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet([
      ["CODIGO", "DETALLE", "ANCHO", "ALTO", "TOTAL INGRESO", "FECHA"],
      ...data,
    ]);

    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generar el archivo Excel
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    // Descargar el archivo
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "entradas.xlsx";
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);
  };

  // Función auxiliar para convertir una cadena de caracteres en un arreglo de bytes
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <section className="py-24 px-10 w-full">
      <div className="py-10 px-10 rounded-xl border-[1px] border-slate-300 shadow w-full h-full">
        <div>
          <p className="text-slate-700 font-semibold">
            Filtar por las entradas realizadas
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <div className="mt-10">
            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <label className="text-sm text-indigo-500">
                  Fecha de inicio
                </label>
                <input
                  className="text-sm bg-slate-100/10 py-1 px-2 rounded-lg shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-sm text-indigo-500">Fecha de fin</label>
                <input
                  className="text-sm bg-slate-100/10 py-1 px-2 rounded-lg shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>

              <button
                onClick={buscarIngresosPorFecha}
                className="bg-indigo-500/10 text-sm border-[1px] border-indigo-500 text-indigo-700 px-5 py-1 rounded-xl shadow flex items-center gap-2"
              >
                Buscar entradas
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button
          className="bg-green-500 text-white rounded-xl shadow py-2 px-5 mt-5"
          onClick={downloadExcel}
        >
          Descargar Datos Filtrados Formato Excel
        </button>
        {loading ? (
          <div className="flex justify-center items-center w-full mx-auto h-40">
            <SyncLoader color="#4A90E2" size={6} margin={6} />
            <p className="animate-blink text-slate-700 text-sm">
              Buscando los datos...
            </p>
          </div>
        ) : (
          <div className="border-[1px] border-slate-300 rounded-xl shadow mt-10">
            <table className="  p-[5px] w-full  uppercase">
              <thead>
                <tr>
                  <td className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal text-indigo-500">
                    Codigo
                  </td>

                  <td className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal text-indigo-500">
                    Detalle
                  </td>

                  <td className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal text-indigo-500">
                    Ancho
                  </td>

                  <td className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal text-indigo-500">
                    Alto
                  </td>
                  <td className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal text-indigo-500">
                    Ingreso/Total
                  </td>

                  <td className="p-3 max-md:p-2 border-b-[1px] text-sm font-normal text-indigo-500">
                    Fecha
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {currentResults?.map((p) => (
                  <tr
                    className="hover:bg-slate-100 transition-all ease-in-out duration-100 cursor-pointer"
                    key={p.id}
                  >
                    <td className="py-4 font-normal text-sm p-3 max-md:text-sm">
                      {p.codigo}
                    </td>
                    <td className="py-4 font-normal text-sm p-3 max-md:text-sm">
                      {p.detalle}
                    </td>
                    <td className="py-4 font-normal text-sm p-3 max-md:text-sm">
                      {p.ancho}
                    </td>
                    <td className="py-4 font-normal text-sm p-3 max-md:text-sm">
                      {p.alto}
                    </td>
                    <td className="py-4 font-normal text-sm p-3 max-md:text-sm">
                      {p.ingreso}
                    </td>
                    <td className="py-4 font-normal text-sm p-3 max-md:text-sm">
                      {formatDate(p.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}{" "}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-4 mb-4 gap-3">
            <button
              className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Anterior
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                    : "bg-gray-100 shadow shadow-black/20 text-sm"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
