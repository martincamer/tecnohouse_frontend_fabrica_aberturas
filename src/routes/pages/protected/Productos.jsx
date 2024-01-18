import { IntroProductosStock } from "../../../components/ui/IntroProductosStock";
import { IntroTitleProductos } from "../../../components/ui/IntroTitleProductos";
import { TableProducts } from "../../../components/ui/TableProducts";
import { CategoriasProductos } from "../../../components/ui/CategoriasProductos";
import { Search } from "../../../components/ui/Search";
import { ModalCrearPerfil } from "../../../components/ui/ModalCrearPerfil";
import { ModalCrearEditar } from "../../../components/ui/ModalCrearEditar";
import { useAluminioContext } from "../../../context/AluminioProvider";
import { ToastContainer } from "react-toastify";
import { ModalCrearNuevaCategoria } from "../../../components/ui/ModalCrearNuevaCategoria";
import { ModalVerCategorias } from "../../../components/ui/ModalVerCategorias";
import { ModalCrearNuevoColor } from "../../../components/ui/ModalCrearNuevoColor";
import { ModalVerColores } from "../../../components/ui/ModalVerColores";
import { useAuth } from "../../../context/AuthProvider";
import { Spinner } from "../../../components/Spinner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AccesoriosPdf } from "../../../components/viewpdfpedidos/AccesoriosPdf";
import { ProductosPdf } from "../../../components/viewpdfpedidos/ProductosPdf";

export const Productos = () => {
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
  } = useAluminioContext();

  const { spinner } = useAuth();

  return spinner ? (
    <Spinner />
  ) : (
    <main className="w-full py-14 px-14 max-md:px-2 overflow-x-scroll">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10">
        <IntroTitleProductos />

        <IntroProductosStock results={results} />

        <CategoriasProductos
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

        <Search search={search} searcher={searcher} />

        <div className="overflow-y-scroll h-[40vh]">
          <TableProducts
            handlePerfilSeleccionado={handlePerfilSeleccionado}
            openModalEditar={openModalEditar}
            results={results}
          />
        </div>

        <ModalCrearPerfil
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
            document={<ProductosPdf results={results} />}
            className="bg-blue-500 py-1 px-5 rounded text-white font-semibold max-md:text-sm"
          >
            DESCARGAR PERFILES STOCK
          </PDFDownloadLink>
        </div>

        <ToastContainer />
      </section>
    </main>
  );
};
