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
import { AberturasPdf } from "../../../components/viewpdfpedidos/AberturasPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

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

  return spinner ? (
    <Spinner />
  ) : (
    <main className="w-full py-20 px-14 max-md:px-2 overflow-x-scroll">
      <section className="max-md:w-full mx-auto py-[30px] px-[40px] h-full border-[1px] border-slate-300 rounded-xl shadow-black/20 shadow-md flex flex-col gap-10">
        <IntroTitleAberturas />

        <IntroAberturasStock results={results} />

        <CategoriasAberturas
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

        <Search search={search} searcher={searcher} />

        {/* <div className="overflow-y-scroll h-[40vh]"> */}
        <TableAberturas
          handlePerfilSeleccionado={handlePerfilSeleccionado}
          openModalEditar={openModalEditar}
          results={results}
        />
        {/* </div> */}

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

        <div>
          <PDFDownloadLink
            fileName={`Accesorios`}
            document={<AberturasPdf results={results} />}
            className="bg-indigo-500 py-2  px-5 rounded-xl text-white  text-sm max-md:text-sm"
          >
            DESCARGAR ABERTURAS STOCK
          </PDFDownloadLink>
        </div>

        <ToastContainer />
      </section>
    </main>
  );
};
