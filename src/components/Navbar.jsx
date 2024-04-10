import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BiCloset, BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

// const rutasPrivadas = [
//   {
//     name: "Inicio",
//     path: "/",
//   },
//   {
//     name: "Perfiles",
//     path: "/productos",
//   },
//   {
//     name: "Clientes",
//     path: "/clientes",
//   },
//   {
//     name: "Presupuestos",
//     path: "/presupuestos",
//   },
//   {
//     name: "Realizar Venta",
//     path: "/ventas-clientes",
//   },
// ];

const rutasuno = [
  {
    name: "Salir de la aplicación",
    path: "/logout",
  },
];

const rutasdos = [
  // {
  //   name: "Login",
  //   path: "/",
  // },
  // {
  //   name: "Registrarse",
  //   path: "/register",
  // },
];

export const Navbar = () => {
  const { isAuth, signout, user, clickProvider, setClickProvider } = useAuth();

  return (
    <header className="fixed max-md:static w-full py-4 px-6 max-md:px-2 max-md:py-0 z-[100]">
      <div
        className={`flex justify-between items-center max-md:items-end gap-4 max-md:flex-col ${
          !isAuth ? "w-[1220px] hidden" : "w-full max-md:px-2"
        } mx-auto`}
      >
        <div className="flex gap-4 items-center">
          {/* <Link to={"/"} className="text-xl text-indigo-500 max-md:text-lg">
            TecnoHouse Aberturas
          </Link> */}
          <div
            onClick={() => setClickProvider(!clickProvider)}
            className="cursor-pointer max-md:hidden"
          >
            {!clickProvider ? (
              <BiMenu
                // onClick={handleClick}

                className="text-primary text-[40px] hover:bg-white rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:block hidden"
              />
            ) : (
              <IoClose className="text-primary text-[38px] hover:bg-white rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:block hidden" />
            )}
          </div>
        </div>

        <div className="flex flex-row gap-6">
          {isAuth
            ? rutasuno.map(({ path, name }) => (
                <div className="flex items-center gap-4">
                  <div className="font-normal text-sm bg-indigo-600 shadow text-white py-1 rounded-xl px-5 max-md:text-sm">
                    {user?.username}
                  </div>
                  <Link
                    onClick={() => signout()}
                    className="text-[16px] max-md:text-sm max-md:font-bold max-md:py-1 font-normal transition-all ease-linear duration-300 bg-slate-500/10 px-5 uppercase rounded-xl py-2 text-slate-700 text-sm  flex gap-2 items-center hover:bg-slate-800 hover:text-white hover:shadow-md"
                    //o={path}
                    key={path}
                  >
                    {name}
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
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                      />
                    </svg>
                  </Link>
                </div>
              ))
            : rutasdos.map(({ path, name }) => (
                <Link
                  className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-blue-500 px-4 rounded-full py-2 text-white hover:shadow-md hover:shadow-black/20 hover:scale-[1.02]"
                  to={path}
                  key={path}
                >
                  {name}
                </Link>
              ))}
        </div>
      </div>
    </header>
  );
};
