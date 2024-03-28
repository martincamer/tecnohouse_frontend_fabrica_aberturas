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
    <div className="bg-white border-slate-300 border-[1px] shadow py-4 px-4 rounded-xl max-md:border-none max-md:shadow-none max-md:px-0">
      <div className="flex gap-4 max-md:gap-2 max-md:flex-col">
        <button
          onClick={openModal}
          className="flex gap-2 items-center bg-indigo-500/10 text-indigo-600 border-[1px] border-indigo-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
        >
          Crear nuevo accesorio/perfil/vidrio
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
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
          className="flex gap-2 items-center bg-indigo-500/10 text-indigo-600 border-[1px] border-indigo-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
        >
          Crear nueva categoria
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
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
          className="flex gap-2 items-center bg-indigo-500/10 text-indigo-600 border-[1px] border-indigo-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
        >
          Crear nuevo color
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
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
          className="flex gap-2 items-center bg-slate-500/10 text-slate-700 border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
        >
          Ver categorias creadas
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
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
          className="flex gap-2 items-center bg-slate-500/10 text-slate-700 border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
        >
          Ver colores creados
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
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
          className="flex gap-2 items-center bg-white  border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
        >
          Ir a la parte de entradas
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
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>

        <Link
          to={"/accesorios/salidas"}
          className="flex gap-2 items-center bg-white  border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
        >
          Ir a la parte de salidas
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
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
