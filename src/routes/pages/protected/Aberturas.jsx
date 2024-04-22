import { Search } from "../../../components/ui/Search";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../../context/AuthProvider";
import { Spinner } from "../../../components/Spinner";
import { useAberturasContext } from "../../../context/AluminioAberturas";
import { IntroTitleAberturas } from "../../../components/aberturas/IntroTitleProductos";
import { IntroAberturasStock } from "../../../components/aberturas/IntroProductosStock";
import { CategoriasAberturas } from "../../../components/aberturas/CategoriasAberturas";
import { TableAberturas } from "../../../components/aberturas/TableAberturas";
import { ModalCrearAberturas } from "../../../components/aberturas/ModalCrearAberturas";
import { ModalCrearNuevaCategoria } from "../../../components/aberturas/ModalCrearNuevaCategoria";
import { ModalCrearNuevoColor } from "../../../components/aberturas/ModalCrearNuevoColor";
import { ModalVerColores } from "../../../components/aberturas/ModalVerColores";
import { ModalCrearEditar } from "../../../components/aberturas/ModalCrearEditar";
import { ModalVerCategorias } from "../../../components/aberturas/ModalVerCategorias";
import { useEffect, useState } from "react";

export const Aberturas = () => {
  const {
    handlePerfilSeleccionado,
    closeModal,
    openModal,
    closeModalEditar,
    openModalEditar,
    isOpen,
    isOpenEditar,
    search,
    searcher,
    results,
    isOpenCrearCategoria,
    closeModalCrearCategoria,
    openModalCrearCategoria,
    isOpenVerCategorias,
    closeModalVerCategoria,
    openModalVerCategoria,
  } = useAberturasContext();

  const { spinner } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <>
      {/* <div className="absolute top-52 w-full flex flex-col gap-5 justify-center items-center">
        <img className="w-[200px] animate-pulse" src="/logo.png" />
        <p className="animate-pulse text-slate-700 font-bold">
          OBTENIENDO LOS DATOS
        </p>
      </div> */}
      <section className="w-full h-full min-h-full max-h-full px-12 max-md:px-4 flex flex-col gap-12 max-md:gap-8 py-24 max-md:py-6">
        <div className="w-[300px] max-md:w-[200px] max-md:py-4 py-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>

        <div className="animate-pulse rounded-2xl border-slate-200 border-[1px] flex shadow">
          <div className="flex justify-center w-full border-r-[1px] border-slate-200 py-12 px-20">
            <div className="bg-slate-300 py-6 max-md:py-1 px-12 max-md:px-0 rounded-2xl animate-pulse"></div>
          </div>
          <div className="w-full justify-center flex py-12 px-20">
            <div className="bg-slate-300 py-6 max-md:py-1 px-12 max-md:px-0 rounded-2xl animate-pulse"></div>
          </div>
        </div>

        <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-full py-4 px-4">
          <div className="grid-cols-7 grid gap-2 max-md:grid-cols-2 w-full">
            <div className="py-5 px-6 max-md:py-5 max-md:px-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
            <div className="py-5 px-6 max-md:py-5 max-md:px-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
            <div className="py-5 px-6 max-md:py-5 max-md:px-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
            <div className="py-5 px-6 max-md:py-5 max-md:px-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
            <div className="py-5 px-6 max-md:py-5 max-md:px-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
            <div className="py-5 px-6 max-md:py-5 max-md:px-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
            <div className="py-5 px-6 max-md:py-5 max-md:px-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/4 py-5 px-4 max-md:w-2/3"></div>
          <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/5 py-5 px-4 max-md:w-1/2"></div>
        </div>

        <div className="flex flex-col gap-2 max-md:flex md:hidden">
          {[1, 2, 3, 4].map((index) => (
            <div
              className=" bg-slate-300 shadow-md animate-pulse py-12 px-10 rounded-2xl"
              key={index}
            ></div>
          ))}
        </div>

        <div className="border-[1px] border-slate-200 animate-pulse rounded-2xl  max-md:hidden md:block hover:shadow-md transition-all ease-linear">
          <table className="min-w-full  uppercase">
            <thead className="bg-slate-200 rounded-xl">
              <tr>
                <th className="py-9 px-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <tr key={index}>
                  <th className="py-9 px-3"></th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  ) : (
    <main className="w-full py-20 max-md:px-2 max-md:py-8">
      <section className="max-md:border-none max-md:shadow-none max-md:px-4 max-md:w-full mx-auto px-5 h-full flex flex-col gap-10 max-md:gap-8">
        <IntroTitleAberturas />

        <IntroAberturasStock results={results} />

        <CategoriasAberturas
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

        <Search search={search} searcher={searcher} />

        <TableAberturas
          handlePerfilSeleccionado={handlePerfilSeleccionado}
          openModalEditar={openModalEditar}
          results={results}
        />

        <ModalCrearAberturas
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />

        <ModalCrearNuevaCategoria
          isOpenCrearCategoria={isOpenCrearCategoria}
          closeModalCrearCategoria={closeModalCrearCategoria}
        />

        <ModalVerCategorias
          isOpenVerCategorias={isOpenVerCategorias}
          closeModalVerCategoria={closeModalVerCategoria}
        />

        <ModalCrearNuevoColor />

        <ModalVerColores />

        <ModalCrearEditar
          openModalEditar={openModalEditar}
          closeModalEditar={closeModalEditar}
          isOpenEditar={isOpenEditar}
        />
      </section>
    </main>
  );
};
