import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AluminioProvider } from "../src/context/AluminioProvider";
import { useAuth } from "./context/AuthProvider";
import { Productos } from "./routes/pages/protected/Productos";
import { Sidebar } from "./components/ui/Sidebar";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./routes/pages/protected/NotFound";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
import { Home } from "./routes/pages/protected/Home";
import { AccesoriosProvider } from "./context/AccesoriosProvider";
import { Accesorios } from "./routes/pages/protected/Accesorios";
import { AberturasProvider } from "./context/AluminioAberturas";
import { Aberturas } from "./routes/pages/protected/Aberturas";
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            element={<RutaProtegida isAllowed={!isAuth} redirectTo={"/"} />}
          >
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            element={<RutaProtegida isAllowed={isAuth} redirectTo={"/login"} />}
          >
            <Route
              element={
                <AluminioProvider>
                  <AccesoriosProvider>
                    <AberturasProvider>
                      <main className="flex gap-2 h-full">
                        <Sidebar />
                        <Outlet />
                      </main>
                    </AberturasProvider>
                  </AccesoriosProvider>
                </AluminioProvider>
              }
            >
              <Route index path="/" element={<Home />} />
              <Route path="productos" element={<Aberturas />} />
              <Route path="perfiles" element={<Productos />} />
              <Route path="accesorios" element={<Accesorios />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
