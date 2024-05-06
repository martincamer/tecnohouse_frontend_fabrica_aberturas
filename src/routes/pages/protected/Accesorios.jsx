import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../../components/ui/Search";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
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
import { Tab } from "@headlessui/react";

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

  const [openEditarDos, setIsOpenEditar] = useState(false);

  const openModalEditarDos = () => {
    setIsOpenEditar(true);
  };

  const closeModalEditarDos = () => {
    setIsOpenEditar(false);
  };

  return (
    <div className="w-full h-full">
      {/* MOBILE  */}
      <div className="hidden max-md:block">
        <Tab.Group>
          <Tab.List>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>
            <Tab.Panel
              className={
                "min-h-screen max-h-full h-full px-2 flex flex-col gap-3 mt-5"
              }
            >
              <CategoriasAccesorios
                openModalVerCategoria={openModalVerCategoria}
                openModalCrearCategoria={openModalCrearCategoria}
                openModal={openModal}
              />
              <Search search={search} searcher={searcher} />
              <TableAccesorios
                openModalEditarDos={openModalEditarDos}
                handlePerfilSeleccionado={handlePerfilSeleccionado}
                openModalEditar={openModalEditar}
                results={results}
                resultadosFiltrados={resultadosFiltrados}
              />
            </Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {/* MOBILE  */}

      <div className="max-md:hidden h-full">
        <div className="w-full bg-white flex max-md:hidden">
          <Link className="text-slate-500 px-6 py-3.5 font-bold text-lg" to="/">
            Inicio
          </Link>
          <Link
            className="text-indigo-500 bg-indigo-100 px-6 py-3.5 font-bold text-lg"
            to="/accesorios"
          >
            Accesorios
          </Link>
        </div>

        <div className="px-10 md:mt-6  max-md:pt-5 max-md:px-5">
          <p className="font-bold text-2xl text-slate-600 max-md:text-lg">
            Bienvenido a la parte accesorios 🖐️🚀.
          </p>
        </div>

        <section className="flex flex-col gap-10 px-10 mt-5 max-md:px-5 min-h-screen">
          <IntroAccesoriosStock results={results} />

          <CategoriasAccesorios
            openModalVerCategoria={openModalVerCategoria}
            openModalCrearCategoria={openModalCrearCategoria}
            openModal={openModal}
          />

          <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-center">
              <label
                className="text-slate-700 text-md uppercase max-md:text-xs font-bold"
                htmlFor="categoria"
              >
                Buscar por categoría
              </label>
              <select
                className="py-3 px-4 rounded-full shadow-xl font-semibold uppercase outline-none focus:outline-indigo-500 cursor-pointer bg-white"
                id="categoria"
                onChange={handleCategoriaChange}
                value={categoriaSeleccionada}
              >
                <option className="uppercase" value="">
                  Todas las categorías
                </option>
                {/* Asegúrate de obtener todas las categorías únicas de tus resultados */}
                {[
                  ...new Set(
                    categorias?.map((resultado) => resultado.categoria)
                  ),
                ].map((categoria) => (
                  <option
                    className="uppercase"
                    key={categoria}
                    value={categoria}
                  >
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <Search search={search} searcher={searcher} />
          </div>

          <TableAccesorios
            openModalEditarDos={openModalEditarDos}
            handlePerfilSeleccionado={handlePerfilSeleccionado}
            openModalEditar={openModalEditar}
            results={results}
            resultadosFiltrados={resultadosFiltrados}
          />
        </section>
      </div>

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
    </div>
  );
};
