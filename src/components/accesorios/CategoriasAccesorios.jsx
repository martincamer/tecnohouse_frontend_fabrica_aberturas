import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const CategoriasAccesorios = ({
  openModal,
  openModalCrearCategoria,
  openModalVerCategoria,
}) => {
  const { openModalEditarColores, openModalVerColores } =
    useAccesoriosContext();

  return (
    <div className="">
      <div className="flex gap-4 max-md:flex-col">
        <button
          onClick={openModal}
          className="bg-green-500 text-primary max-md:text-sm max-md:py-1 max-md:px-2 font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nuevo accesorio
        </button>
        <button
          onClick={openModalCrearCategoria}
          className="bg-yellow-300 text-primary max-md:text-sm max-md:py-1 max-md:px-2 font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nueva categoria
        </button>
        <button
          onClick={openModalVerColores}
          className="bg-blue-300 text-primary max-md:text-sm max-md:py-1 max-md:px-2 font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nuevo color
        </button>
        <button
          onClick={openModalVerCategoria}
          className="bg-slate-300 text-primary max-md:text-sm max-md:py-1 max-md:px-2 font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Ver categorias creadas
        </button>
        <button
          onClick={openModalEditarColores}
          className="bg-red-300 text-primary max-md:text-sm max-md:py-1 max-md:px-2 font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Ver colores creados
        </button>
      </div>
    </div>
  );
};
