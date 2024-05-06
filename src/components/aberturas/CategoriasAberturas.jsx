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
    <div className="bg-white shadow-xl cursor-pointer transition-all ease-linear px-4 rounded-xl max-md:border-none max-md:px-2 max-md:py-2 md:block max-md:shadow-lg">
      <div className="grid-cols-5 grid gap-4 max-md:gap-2 max-md:py-0 py-4 max-md:grid-cols-none max-md:flex">
        <button
          onClick={openModal}
          className="flex gap-2 items-center bg-indigo-500 font-semibold text-white text-sm max-md:px-2 max-md:text-xs py-2 px-4 rounded-full cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase justify-between"
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
          className="flex gap-2 items-center bg-indigo-500 font-semibold text-white text-sm max-md:px-2 max-md:text-xs py-2 px-4 rounded-full cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase justify-between"
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
          className="flex gap-2 items-center bg-indigo-500 font-semibold text-white text-sm max-md:px-2 max-md:text-xs py-2 px-4 rounded-full cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase justify-between"
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
          className="flex gap-2 items-center bg-green-500 font-semibold text-white text-sm max-md:px-2 max-md:text-xs py-2 px-4 rounded-full cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase justify-between"
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
          className="flex gap-2 items-center bg-green-500 font-semibold text-white text-sm max-md:px-2 max-md:text-xs py-2 px-4 rounded-full cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase justify-between"
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
          className="flex gap-2 items-center bg-white  border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2  font-semibold py-2 px-3 rounded-full cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0 max-md:hidden justify-between"
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
          className="flex gap-2 items-center bg-white  border-[1px] border-slate-400 text-sm max-md:text-sm max-md:py-1 max-md:px-2  font-semibold py-2 px-3 rounded-full cursor-pointer hover:shadow hover:shadow-black/10 hover:translate-x-1 transition-all ease-in-out uppercase max-md:hover:translate-x-0 max-md:hidden justify-between"
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
