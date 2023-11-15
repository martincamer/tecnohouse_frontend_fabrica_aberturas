export const TableClients = ({
  results,
  handleClienteSeleccionado,
  openModalEditar,
  handleEliminar,
}) => {
  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px]  p-[5px] table-auto w-full rounded">
        <thead>
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Apellido</th>
            <th className="p-3">Email</th>
            <th className="p-3">Telefono</th>
            <th className="p-3">Domicilio</th>
            <th className="p-3">Localidad</th>
            <th className="p-3">Provincia</th>
            <th className="p-3">Dni</th>
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
              <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                {p.nombre}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                {p.apellido}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.email}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.telefono}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                {p.domicilio}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                {p.localidad}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                {p.provincia}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.dni}
              </th>
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
                    openModalEditar(), handleClienteSeleccionado(p.id);
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
