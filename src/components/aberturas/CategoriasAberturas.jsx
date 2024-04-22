import { Link } from "react-router-dom";
import { useAberturasContext } from "../../context/AluminioAberturas";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import { CiViewTimeline } from "react-icons/ci";

export const CategoriasAberturas = ({
  openModal,
  openModalCrearCategoria,
  openModalVerCategoria,
}) => {
  const { openModalEditarColores, openModalVerColores } = useAberturasContext();

  return (
    <div>
      <div className="grid grid-cols-7 max-md:grid-cols-none max-md:flex max-md:overflow-x-scroll gap-3 max-md:gap-2 border-slate-300 border-[1px] rounded-xl py-4 transition-all ease-in-out cursor-pointer px-4 max-md:border-[1px] hover:shadow-none max-md:border-slate-200 max-md:px-2 max-md:py-2">
        <button
          onClick={openModal}
          className="flex gap-2 items-center text-indigo-700 bg-indigo-50 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0"
        >
          <p className="max-md:hidden md:block">
            Crear nuevo producto o objeto
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
          className="flex gap-2 items-center text-indigo-700 bg-indigo-50 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0"
        >
          <p className="max-md:hidden">Crear nueva categoria</p>{" "}
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
          className="flex gap-2 items-center text-indigo-700 bg-indigo-50 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0"
        >
          <p className="max-md:hidden"> Crear nuevo color</p>{" "}
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
          className="flex gap-2 items-center text-slate-700 bg-slate-100 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0"
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
          className="flex gap-2 items-center text-slate-700 bg-slate-100 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0"
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
          to={"/aberturas/entradas"}
          className="flex gap-2 items-center bg-white  border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0 max-md:hidden"
        >
          <p className="max-md:hidden">Ir a la parte de entradas</p>{" "}
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
          to={"/aberturas/salidas"}
          className="flex gap-2 items-center bg-white  border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2 font-normal py-2 px-3 rounded-xl cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0 max-md:hidden"
        >
          <p className="max-md:hidden"> Ir a la parte de salidas</p>{" "}
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
