import { Link } from "react-router-dom";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import { CiViewTimeline } from "react-icons/ci";
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { BsArrowDownSquareFill } from "react-icons/bs";

export const CategoriasAccesorios = ({
  openModal,
  openModalCrearCategoria,
  openModalVerCategoria,
}) => {
  const { openModalEditarColores, openModalVerColores } =
    useAccesoriosContext();

  return (
    <div className="bg-white border-slate-300 border-[1px] hover:shadow-md cursor-pointer transition-all ease-linear px-4 rounded-xl max-md:border-none max-md:shadow-none max-md:px-0 max-md:py-0 md:block">
      <div className="grid-cols-7 grid gap-4 max-md:gap-2 max-md:py-0 py-4 max-md:grid-cols-none max-md:flex max-md:overflow-x-scroll">
        <button
          onClick={openModal}
          className="flex gap-2 items-center bg-indigo-500/10 tex text-indigo-700 text-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          <p className="max-md:hidden md:block">
            Crear nuevo accesorio/perfil/vidrio
          </p>
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

          <MdOutlineCreateNewFolder className="text-3xl max-md:block md:hidden" />
        </button>
        <button
          onClick={openModalCrearCategoria}
          className="flex gap-2 items-center bg-indigo-500/10 tex text-indigo-700 text-sm  max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          <p className="max-md:hidden md:block">Crear nueva categoria</p>
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
          <TbCategory className="text-3xl max-md:block md:hidden" />
        </button>
        <button
          onClick={openModalVerColores}
          className="flex gap-2 items-center bg-indigo-500/10 tex text-indigo-700 text-sm  max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          <p className="max-md:hidden">Crear nuevo color</p>{" "}
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
          <IoIosColorPalette className="text-3xl max-md:block md:hidden" />
        </button>
        <button
          onClick={openModalVerCategoria}
          className="flex gap-2 items-center bg-slate-500/10 text text-indigo-700-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          <p className="max-md:hidden">Ver categorias creadas</p>{" "}
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
          <CiViewTimeline className="text-3xl max-md:block md:hidden" />
        </button>
        <button
          onClick={openModalEditarColores}
          className="flex gap-2 items-center bg-slate-500/10 text text-indigo-700-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          <p className="max-md:hidden">Ver colores creados</p>{" "}
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
          <CiViewTimeline className="text-3xl max-md:block md:hidden" />
        </button>

        <Link
          to={"/accesorios/entradas"}
          className="flex gap-2 items-center bg-indigo-100 text-indigo-700 text-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          <span className="max-md:hidden"> Ir a la parte de entradas</span>
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
          <LiaPlaneDepartureSolid className="text-3xl max-md:block md:hidden" />
        </Link>

        <Link
          to={"/accesorios/salidas"}
          className="flex gap-2 items-center bg-indigo-100 text-indigo-700 text-sm max-md:px-2 font-normal max-md:text-xs py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase"
        >
          <span className="max-md:hidden"> Ir a la parte de salidas</span>
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
          <BsArrowDownSquareFill className="text-3xl max-md:block md:hidden" />
        </Link>
      </div>
    </div>
  );
};
