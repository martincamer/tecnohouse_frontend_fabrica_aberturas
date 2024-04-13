import { Search } from "../../../components/ui/Search";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { IntroTitleAccesorios } from "../../../components/accesorios/IntroTitleAccesorios";
import { useAuth } from "../../../context/AuthProvider";
import { Spinner } from "../../../components/Spinner";
import { IntroAccesoriosStock } from "../../../components/accesorios/IntroAccesoriosStock";
import { TableAccesorios } from "../../../components/accesorios/TableAccesorios";
import { ModalCrearAccesorios } from "../../../components/accesorios/ModalCrearAccesorios";
import { ModalCrearNuevaCategoriaAccesorios } from "../../../components/accesorios/ModalCrearNuevaCategoriaAccesorios";
import { ModalCrearNuevoColorAccesorios } from "../../../components/accesorios/ModalCrearNuevoColorAccesorios";
import { ModalVerCategoriasAccesorios } from "../../../components/accesorios/ModalVerCategoriasAccesorios";
import { ModalVerColoresAccesorios } from "../../../components/accesorios/ModalVerColoresAccesorios";
import { ModalCrearEditarAccesorios } from "../../../components/accesorios/ModalCrearEditarAccesorios";
import { CategoriasAccesorios } from "../../../components/accesorios/CategoriasAccesorios";
import { ModalCrearAccesoriosDos } from "../../../components/accesorios/ModalCrearAccesoriosDos";
import { useEffect, useState } from "react";

export const Accesorios = () => {
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
    categorias,
    handleCategoriaChange,
    resultadosFiltrados,
    categoriaSeleccionada,
  } = useAccesoriosContext();

  const { spinner } = useAuth();

  const [openEditarDos, setIsOpenEditar] = useState(false);

  const openModalEditarDos = () => {
    setIsOpenEditar(true);
  };

  const closeModalEditarDos = () => {
    setIsOpenEditar(false);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <section className="w-full h-full min-h-full max-h-full px-12 max-md:px-4 flex flex-col gap-12 max-md:gap-8 py-24">
      <div className="w-[300px] py-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>

      <div className="animate-pulse rounded-2xl border-slate-200 border-[1px] flex shadow">
        <div className="flex justify-center w-full border-r-[1px] border-slate-200 py-12 px-20">
          <div className="bg-slate-300 py-6 px-12 rounded-2xl animate-pulse"></div>
        </div>
        <div className="w-full justify-center flex py-12 px-20">
          <div className="bg-slate-300 py-6 px-12 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-full py-4 px-4">
        <div className="grid-cols-7 grid gap-2 w-full">
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/4 py-5 px-4"></div>
        <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/5 py-5 px-4"></div>
      </div>

      <div className="border-[1px] border-slate-200 animate-pulse rounded-2xl  max-md:hidden md:block hover:shadow-md transition-all ease-linear ">
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
  ) : (
    <main className="w-full py-20 max-md:py-8 px-5 max-md:px-2">
      <section className="max-md:w-full mx-auto flex flex-col gap-10 max-md:shadow-none max-md:border-none">
        <IntroTitleAccesorios />

        <IntroAccesoriosStock results={results} />

        <CategoriasAccesorios
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <label
              className="font-normal text-slate-700 text-md max-md:text-sm uppercase"
              htmlFor="categoria"
            >
              Buscar por categoría
            </label>
            <select
              className="max-md:text-xs  bg-white border-[1px] border-slate-300 text-slate-800 text-sm font-normal py-3 uppercase px-3 rounded-xl shadow cursor-pointer"
              id="categoria"
              onChange={handleCategoriaChange}
              value={categoriaSeleccionada}
            >
              <option className="uppercase" value="">
                Todas las categorías
              </option>
              {/* Asegúrate de obtener todas las categorías únicas de tus resultados */}
              {[
                ...new Set(categorias?.map((resultado) => resultado.categoria)),
              ].map((categoria) => (
                <option className="uppercase" key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          <Search search={search} searcher={searcher} />
        </div>

        <div>
          <TableAccesorios
            openModalEditarDos={openModalEditarDos}
            handlePerfilSeleccionado={handlePerfilSeleccionado}
            openModalEditar={openModalEditar}
            results={results}
            resultadosFiltrados={resultadosFiltrados}
          />
        </div>
      </section>

      <ModalCrearAccesorios
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />

      <ModalCrearNuevaCategoriaAccesorios
        isOpenCrearCategoria={isOpenCrearCategoria}
        closeModalCrearCategoria={closeModalCrearCategoria}
      />

      <ModalVerCategoriasAccesorios
        isOpenVerCategorias={isOpenVerCategorias}
        closeModalVerCategoria={closeModalVerCategoria}
      />

      <ModalCrearNuevoColorAccesorios />

      <ModalVerColoresAccesorios />

      <ModalCrearAccesoriosDos
        openModalEditar={openModalEditarDos}
        closeModalEditar={closeModalEditarDos}
        isOpenEditar={openEditarDos}
      />

      <ModalCrearEditarAccesorios
        openModalEditar={openModalEditar}
        closeModalEditar={closeModalEditar}
        isOpenEditar={isOpenEditar}
      />
    </main>
  );
};
