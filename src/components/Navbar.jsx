import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

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
    name: "Logout",
    path: "/logout",
  },
];

const rutasdos = [
  {
    name: "Login",
    path: "/",
  },
  {
    name: "Registrarse",
    path: "/register",
  },
];

export const Navbar = () => {
  const { isAuth, signout, user } = useAuth();

  return (
    <header className="shadow-md shadow-black/20 py-4 px-6">
      <div
        className={`flex justify-between items-center gap-4 ${
          !isAuth ? "w-[1220px]" : "w-full px-6"
        } mx-auto`}
      >
        <div>
          <Link to={"/"} className="text-2xl font-extrabold text-blue-500">
            TecnoHouse <span className="text-primary">Aberturas</span>
          </Link>
        </div>

        <div className="flex flex-row gap-6">
          {isAuth
            ? rutasuno.map(({ path, name }) => (
                <div className="flex items-center gap-4">
                  <div className="font-bold text-medium bg-yellow-600 shadow shadow-md text-white p-1 rounded-full px-2">
                    {user?.username}
                  </div>
                  <Link
                    onClick={() => signout()}
                    className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-blue-500 px-4 rounded-full py-2 text-white hover:shadow-md hover:shadow-black/20 hover:scale-[1.02]"
                    //o={path}
                    key={path}
                  >
                    {name}
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
