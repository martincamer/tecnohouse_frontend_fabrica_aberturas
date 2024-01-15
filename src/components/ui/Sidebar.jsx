import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  BiHome,
  BiLogoProductHunt,
  BiArea,
  BiMenu,
  BiUserCircle,
  BiUserCheck,
} from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import { useState } from "react";

export const Sidebar = () => {
  const { user, clickProvider, setClickProvider } = useAuth();
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const location = useLocation();

  const navegacion = [
    {
      name: "Inicio",
      path: "/",
      icon: <BiHome />,
    },
    {
      name: "Accesorios en stock",
      path: "/accesorios",
      icon: <BiArea />,
    },
    {
      name: "Perfiles en stock",
      path: "/perfiles",
      icon: <BiLogoProductHunt />,
    },
    {
      name: "Productos en stock",
      path: "/productos",
      icon: <BiLogoProductHunt />,
    },
    {
      name: "Clientes pedidos",
      path: "/pedidos",
      icon: <BiUserCircle />,
    },
    {
      name: "Pedidos realizados",
      path: "/pedidos-realizados",
      icon: <BiUserCheck />,
    },
    {
      name: "Remitos",
      path: "/remitos",
      icon: <IoDocumentText />,
    },
  ];

  return (
    <div
      className={`${
        click
          ? "w-[100px] transition-all ease-in-out duration-300"
          : "w-1/5 transition-all ease-in-out duration-300"
      } w-1/5 bg-blue-400 min-h-screen max-h-full block ${
        clickProvider ? "block" : "hidden"
      }`}
    >
      <div
        className={`${
          click
            ? "justify-center transition-all ease-in-out duration-300"
            : "justify-end transition-all ease-in-out duration-300"
        } w-full flex px-4 py-2 cursor-pointer`}
      >
        <BiMenu
          onClick={handleClick}
          className="text-primary text-[45px] hover:bg-white rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:hidden"
        />
      </div>
      <div className={`w-full flex flex-col gap-12`}>
        <div>
          {navegacion.map(({ name, path, icon }) => (
            <div
              key={path}
              className={`${
                location.pathname === path && "bg-primary"
              } w-full py-3 px-8 max-md:px-4`}
            >
              <div className="flex items-center max-md:justify-center gap-2 hover:translate-x-2 transition-all ease duration-300">
                <Link to={path} className="text-3xl max-md:text-2xl text-white">
                  {icon}
                </Link>
                <Link
                  to={path}
                  className={`${
                    click
                      ? "hidden transition-all ease-in-out duration-300"
                      : "block transition-all ease-in-out duration-300 text-primary"
                  } text-xl font-extrabold text-white`}
                >
                  {name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
