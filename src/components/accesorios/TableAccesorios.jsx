import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const TableAccesorios = ({
  results,
  openModalEditar,
  handlePerfilSeleccionado,
}) => {
  const { handleEliminar } = useAccesoriosContext();

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px] p-[5px] table-auto w-full rounded">
        <thead>
          <tr>
            <th className="p-3 max-md:p-1 max-md:text-xs">ID</th>
            <th className="p-3 max-md:p-1 max-md:text-xs">Codigo</th>
            <th className="p-3 max-md:p-1 max-md:text-xs">Stock</th>
            <th className="p-3 max-md:p-1 max-md:text-xs">Categoria</th>
            <th className="p-3 max-md:p-1 max-md:text-xs">Color</th>
            <th className="p-3 max-md:p-1 max-md:text-xs">Detalle</th>
            <th className="p-3 max-md:p-1 max-md:text-xs">Eliminar</th>
            <th className="p-3 max-md:p-1 max-md:text-xs">Editar</th>
          </tr>
        </thead>
        <tbody>
          {results.map((p) => (
            <tr key={p.id}>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:text-xs max-md:p-1">
                {p.id}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:text-xs max-md:p-1">
                {p.nombre}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:text-xs max-md:p-1">
                {p.stock}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:text-xs max-md:p-1">
                {p.categoria}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:text-xs max-md:p-1">
                {p.color}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:text-xs max-md:p-1 line-clamp-1">
                {p.descripcion}
              </th>
              <th className="border-[1px] border-gray-300 p-3 max-md:p-1 font-bold ">
                <button
                  className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:text-sm"
                  onClick={() => handleEliminar(p.id)}
                >
                  eliminar
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 max-md:p-1 font-bold ">
                <button
                  onClick={() => {
                    openModalEditar(), handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:text-sm"
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
