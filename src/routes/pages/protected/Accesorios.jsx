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
import { useState } from "react";

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

  return spinner ? (
    <Spinner />
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
