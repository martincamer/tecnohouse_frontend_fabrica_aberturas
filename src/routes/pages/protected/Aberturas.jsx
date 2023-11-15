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
    <main className="h-screen w-full py-14 px-14 ">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10 overflow-y-scroll">
        <IntroTitleAberturas />

        <IntroAberturasStock results={results} />

        <Search search={search} searcher={searcher} />

        <CategoriasAberturas
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

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

        <ToastContainer />
      </section>
    </main>
  );
};
