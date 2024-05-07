import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AluminioProvider } from "../src/context/AluminioProvider";
import { useAuth } from "./context/AuthProvider";
import { Sidebar } from "./components/ui/Sidebar";
import { NotFound } from "./routes/pages/protected/NotFound";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
import { Home } from "./routes/pages/protected/Home";
import { AccesoriosProvider } from "./context/AccesoriosProvider";
import { AberturasProvider } from "./context/AluminioAberturas";
import { Aberturas } from "./routes/pages/protected/Aberturas";
import { Pedidos } from "./routes/pages/protected/Pedidos";
import { PedidoProvider } from "./context/PedidoProvider";
import { ViewPedido } from "./routes/pages/protected/ViewPedido";
import { PedidosMensualesProvider } from "./context/PedidosMensualesProvider";
import { PedidosRealizados } from "./routes/pages/protected/PedidosRealizados";
import { ClientePedidoMuestra } from "./routes/pages/protected/ClientePedidoMuestra";
import { RemitoProvider } from "./context/RemitoProvider";
import { ViewPdf } from "./routes/pages/protected/ViewPdf";
import { VerClientesFinalizados } from "./routes/pages/protected/VerClientesFinalizados";
import { Accesorios } from "./routes/pages/protected/Accesorios";
import { Entradas } from "./routes/pages/protected/Entradas";
import { Salidas } from "./routes/pages/protected/Salidas";
import { EntradasDos } from "./routes/pages/protected/EntradasDos";
import { SalidasDos } from "./routes/pages/protected/SalidasDos";
import { MenuMobile } from "./components/ui/MenuMobile";
import { ToastContainer } from "react-toastify";
//import normales
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const { isAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  // Simula un tiempo de carga de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Desactiva la pantalla de carga después de 5 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador cuando se desmonta
  }, []);

  if (isLoading) {
    // Muestra la pantalla de carga mientras se está cargando
    return <LoadingScreen />;
  }

  return (
    <>
      <BrowserRouter>
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
                      <PedidoProvider>
                        <PedidosMensualesProvider>
                          <RemitoProvider>
                            <main className="h-full flex">
                              <ToastContainer />
                              <Sidebar />
                              {/* <MenuMobile /> */}
                              <Outlet />
                            </main>
                          </RemitoProvider>
                        </PedidosMensualesProvider>
                      </PedidoProvider>
                    </AberturasProvider>
                  </AccesoriosProvider>
                </AluminioProvider>
              }
            >
              <Route index path="/" element={<Home />} />
              <Route path="productos" element={<Aberturas />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="accesorios" element={<Accesorios />} />
              <Route path="accesorios/entradas" element={<Entradas />} />
              <Route path="accesorios/salidas" element={<Salidas />} />

              <Route path="aberturas/entradas" element={<EntradasDos />} />
              <Route path="aberturas/salidas" element={<SalidasDos />} />

              <Route
                path="pedidos-realizados"
                element={<PedidosRealizados />}
              />
              <Route path="pedido/:id" element={<ViewPedido />} />
              <Route
                path="cliente/pedido/:cliente"
                element={<ClientePedidoMuestra />}
              />
              <Route path="view-pdf" element={<ViewPdf />} />
              <Route
                path="clientes-finalizados"
                element={<VerClientesFinalizados />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-indigo-500 border-b-transparent"></div>
        <p className="mt-4 text-lg font-bold text-gray-800">Cargando...</p>
      </div>
    </div>
  );
};
