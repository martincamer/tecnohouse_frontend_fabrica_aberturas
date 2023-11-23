import React, { useState } from "react";
import * as XLSX from "xlsx";

const ButtonExcel = ({ datos }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [
    { A: `Reporte de Productos / fecha: ${datos.created_at}` },
    {},
  ];

  const informacionAdicional = {
    A: "Creado por: Tecno aberturas",
  };

  const longitudes = [5, 35, 25, 20, 10, 10, 10];

  const handleDownload = () => {
    setLoading(true);

    let tabla = [
      {
        A: "Id",
        B: "Productos",
      },
    ];

    tabla.push({
      A: datos.id,
      B: datos?.productos?.respuesta.map(function (e) {
        return {
          id: e.id,
          nombre: e.nombre,
        };
      }),
    });

    const dataFinal = [...titulo, ...tabla, informacionAdicional];

    setTimeout(() => {
      creandoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (dataFinal) => {
    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    hoja["!merges"] = [
      XLSX.utils.decode_range("A1:G1"),
      XLSX.utils.decode_range("A2:G2"),
      XLSX.utils.decode_range("A34:G34"),
    ];

    let propiedades = [];

    longitudes.forEach((col) => {
      propiedades.push({
        width: col,
      });
    });

    hoja["!cols"] = propiedades;

    XLSX.utils.book_append_sheet(libro, hoja, "Productos");

    XLSX.writeFile(libro, "ProductosEstilizado.xlsx");
  };

  return (
    <>
      {!loading ? (
        <button color="success" onClick={handleDownload}>
          Excel Estilizado
        </button>
      ) : (
        <button color="success" disabled>
          <span> Generando...</span>
        </button>
      )}
    </>
  );
};

export default ButtonExcel;
