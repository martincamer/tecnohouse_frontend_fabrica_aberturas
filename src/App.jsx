import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AluminioProvider } from "../src/context/AluminioProvider";
import { useAuth } from "./context/AuthProvider";
import { Sidebar } from "./components/ui/Sidebar";
import { Navbar } from "./components/Navbar";
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
//import normales
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Accesorios } from "./routes/pages/protected/Accesorios";
import { Entradas } from "./routes/pages/protected/Entradas";
import { Salidas } from "./routes/pages/protected/Salidas";

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
                      <PedidoProvider>
                        <PedidosMensualesProvider>
                          <RemitoProvider>
                            <main className="flex gap-2 h-full">
                              <Sidebar />
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
