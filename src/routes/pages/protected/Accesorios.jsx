import { Search } from "../../../components/ui/Search";
import { ToastContainer } from "react-toastify";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AccesoriosPdf } from "../../../components/viewpdfpedidos/AccesoriosPdf";
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
    <main className="w-full py-24 px-14 max-md:px-2 overflow-x-scroll">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-slate-300 rounded-xl shadow flex flex-col gap-10">
        <IntroTitleAccesorios />

        <IntroAccesoriosStock results={results} />

        <CategoriasAccesorios
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

        <Search search={search} searcher={searcher} />

        <div className="flex gap-2 items-center">
          <label
            className="font-normal text-slate-700 text-md"
            htmlFor="categoria"
          >
            Buscar por categoría
          </label>
          <select
            className="bg-white border-[1px] border-slate-300 text-slate-800 text-sm font-normal py-3 uppercase px-3 rounded-xl shadow cursor-pointer"
            id="categoria"
            onChange={handleCategoriaChange}
            value={categoriaSeleccionada}
          >
            <option value="">Todas las categorías</option>
            {/* Asegúrate de obtener todas las categorías únicas de tus resultados */}
            {[
              ...new Set(categorias?.map((resultado) => resultado.categoria)),
            ].map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
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

        <ToastContainer />
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
