import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";

export const Sidebar = () => {
  const { clickProvider, signout } = useAuth();
  const [click, setClick] = useState(true);
  const params = useParams();

  const handleClick = () => {
    setClick(!click);
  };

  const location = useLocation();

  const navegacion = [
    {
      name: "Inicio",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    // {
    //   name: "Accesorios en stock",
    //   path: "/accesorios",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-7 h-7"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Aberturas en stock/etc",
      path: "/productos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          />
        </svg>
      ),
    },
    {
      name: "Clientes pedidos / Crear",
      path: `${params.id ? `/pedido/${params.id}` : "/pedidos"}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
    // {
    //   name: "Pedidos realizados / Entregados",
    //   path: "/pedidos-realizados",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-8 h-8"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Clientes Finalizados / Casas",
      path: "/clientes-finalizados",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`${
        click
          ? "w-[70px]  transition-all ease-in-out duration-300"
          : "w-1/6 transition-all ease-in-out duration-300"
      } w-1/5 bg-white border-r-[1px] border-slate-300 min-h-screen max-h-full block z-[101]   ${
        clickProvider ? "max-md:block" : "max-md:hidden"
      }`}
    >
      <div
        className={`${
          click
            ? "t group justify-center transition-all ease-in-out duration-300"
            : "t group justify-end transition-all ease-in-out duration-300 "
        } w-full px-4 py-2 cursor-pointer hidden`}
      >
        <Link className="t group relative hidden">
          <BiMenu
            onClick={handleClick}
            className="text-[35px] bg-indigo-500 hover:bg-slate-700 hover:text-white rounded-lg shadow text-white py-[5px] transition-all ease-in-out duration-300 max-md:hidden"
          />
          <span className="invisible absolute left-9 top-4 ml-5 -translate-y-1/2 rounded bg-slate-800 px-4 w-[150px] flex justify-center py-2 text-xs font-medium text-white group-hover:visible">
            {click ? "Abrir menu" : "Cerrar menu"}
          </span>
        </Link>
      </div>
      <menu className="flex flex-col justify-between h-full">
        <div>
          {navegacion.map(({ name, path, icon }) => (
            <div
              key={path}
              className={`${
                location.pathname === path && "bg-slate-100 text-indigo-600"
              } tooltip tooltip-right w-full py-4 px-5 z-100 uppercase font-semibold`}
              data-tip={name}
            >
              <Link to={path}>{icon}</Link>
            </div>
          ))}
        </div>
        <div
          onClick={() => signout()}
          className="hover:bg-slate-100 py-4 px-5 cursor-pointer hover:text-indigo-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </div>
      </menu>
    </div>
  );
};
