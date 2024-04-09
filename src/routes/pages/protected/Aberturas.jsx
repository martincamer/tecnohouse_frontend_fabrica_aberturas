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
    <main className="w-full py-20 max-md:px-2 max-md:py-8">
      <section className="max-md:border-none max-md:shadow-none max-md:px-4 max-md:w-full mx-auto px-5 h-full flex flex-col gap-10">
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
      </section>
    </main>
  );
};
