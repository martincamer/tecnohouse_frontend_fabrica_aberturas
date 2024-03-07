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

  return spinner ? (
    <Spinner />
  ) : (
    <main className="w-full py-14 px-14 max-md:px-2 overflow-x-scroll">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10">
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
            className="bg-slate-100 border-[1px] border-slate-300 text-slate-800 text-sm font-normal py-2 uppercase px-3 rounded shadow cursor-pointer"
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

        <div className="overflow-y-scroll h-[40vh]">
          <TableAccesorios
            handlePerfilSeleccionado={handlePerfilSeleccionado}
            openModalEditar={openModalEditar}
            results={results}
            resultadosFiltrados={resultadosFiltrados}
          />
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

        <ModalCrearEditarAccesorios
          openModalEditar={openModalEditar}
          closeModalEditar={closeModalEditar}
          isOpenEditar={isOpenEditar}
        />

        <ToastContainer />

        <div>
          <PDFDownloadLink
            fileName={`Accesorios`}
            document={<AccesoriosPdf results={results} />}
            className="bg-blue-500 py-1 px-5 rounded text-white font-semibold max-md:text-sm"
          >
            DESCARGAR ACCESORIOS STOCK
          </PDFDownloadLink>
        </div>
      </section>
    </main>
  );
};
