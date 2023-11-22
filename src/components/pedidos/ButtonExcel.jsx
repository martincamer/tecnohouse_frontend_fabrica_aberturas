import * as XLSX from "xlsx";

export const ButtonExcel = ({ datos }) => {
  //   const handleDownload = () => {
  //     const libro = XLSX.utils.book_new();
  //     const hoja = XLSX.utils.sheet_add_json(datos);

  //     XLSX.utils.book_append_sheet(libro, hoja, "Productos");

  //     setTimeout(() => {
  //       XLSX.writeFile(libro, "ProductosDefault.xlsx");
  //     }, 1000);
  //   };

  //   const titulo = [
  //     {
  //       A: "Reporte de Productos",
  //     },
  //   ];

  return (
    <button
      className="bg-orange-500 text-white rounded py-1 px-4"
      //   onClick={handleDownload}
    >
      Descargar excel
    </button>
  );
};
