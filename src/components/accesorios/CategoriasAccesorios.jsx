import { Link } from "react-router-dom";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const CategoriasAccesorios = ({
  openModal,
  openModalCrearCategoria,
  openModalVerCategoria,
}) => {
  const { openModalEditarColores, openModalVerColores } =
    useAccesoriosContext();

  return (
    <div className="bg-white border-slate-300 border-[1px] hover:shadow-md  cursor-pointer transition-all ease-linear px-4 rounded-xl max-md:border-none max-md:shadow-none max-md:px-0 max-md:py-0 max-md:hidden md:block">
      <div className="grid-cols-7 grid max-md:grid-cols-2 gap-4 max-md:gap-2 max-md:py-0 py-4">
        <button
          onClick={openModal}
          className="flex gap-2 items-center bg-indigo-500/10 tex text-indigo-700 text-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          Crear nuevo accesorio/perfil/vidrio
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
        <button
          onClick={openModalCrearCategoria}
          className="flex gap-2 items-center bg-indigo-500/10 tex text-indigo-700 text-sm  max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          Crear nueva categoria
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
        <button
          onClick={openModalVerColores}
          className="flex gap-2 items-center bg-indigo-500/10 tex text-indigo-700 text-sm  max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          Crear nuevo color
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
        <button
          onClick={openModalVerCategoria}
          className="flex gap-2 items-center bg-slate-500/10 text text-indigo-700-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          Ver categorias creadas
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
            />
          </svg>
        </button>
        <button
          onClick={openModalEditarColores}
          className="flex gap-2 items-center bg-slate-500/10 text text-indigo-700-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          Ver colores creados
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
            />
          </svg>
        </button>

        <Link
          to={"/accesorios/entradas"}
          className="flex gap-2 items-center bg-indigo-100 text-indigo-700 text-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          Ir a la parte de entradas
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>

        <Link
          to={"/accesorios/salidas"}
          className="flex gap-2 items-center bg-indigo-100 text-indigo-700 text-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          Ir a la parte de salidas
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
