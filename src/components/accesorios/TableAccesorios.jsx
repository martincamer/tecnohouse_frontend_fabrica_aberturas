import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const TableAccesorios = ({
  results,
  openModalEditar,
  handlePerfilSeleccionado,
}) => {
  const { handleEliminar } = useAccesoriosContext();

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px]  p-[5px] table-auto w-full rounded">
        <thead>
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Codigo</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Color</th>
            <th className="p-3">Detalle</th>
            <th className="p-3">Eliminar</th>
            <th className="p-3">Editar</th>
          </tr>
        </thead>
        <tbody>
          {results.map((p) => (
            <tr key={p.id}>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.id}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.nombre}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.stock}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.categoria}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.color}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.descripcion}
              </th>
              {/* <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.disponible ? "SI" : "NO"}
              </th> */}
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer"
                  onClick={() => handleEliminar(p.id)}
                >
                  eliminar
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  onClick={() => {
                    openModalEditar(), handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer"
                >
                  editar
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
