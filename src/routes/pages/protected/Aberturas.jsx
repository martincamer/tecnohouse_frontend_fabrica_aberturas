import { Search } from "../../../components/ui/Search";
import { useAberturasContext } from "../../../context/AluminioAberturas";
import { IntroAberturasStock } from "../../../components/aberturas/IntroProductosStock";
import { CategoriasAberturas } from "../../../components/aberturas/CategoriasAberturas";
import { TableAberturas } from "../../../components/aberturas/TableAberturas";
import { ModalCrearAberturas } from "../../../components/aberturas/ModalCrearAberturas";
import { ModalCrearNuevaCategoria } from "../../../components/aberturas/ModalCrearNuevaCategoria";
import { ModalCrearNuevoColor } from "../../../components/aberturas/ModalCrearNuevoColor";
import { ModalVerColores } from "../../../components/aberturas/ModalVerColores";
import { ModalCrearEditar } from "../../../components/aberturas/ModalCrearEditar";
import { ModalVerCategorias } from "../../../components/aberturas/ModalVerCategorias";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div className="h-full w-full">
        <div className="w-full bg-white flex max-md:hidden">
          <Link className="text-slate-500 px-6 py-3.5 font-bold text-lg" to="/">
            Inicio
          </Link>
          <Link
            className="text-indigo-500 bg-indigo-100 px-6 py-3.5 font-bold text-lg"
            to="/productos"
          >
            Aberturas
          </Link>
        </div>

        <div className="px-10 md:mt-6  max-md:pt-5 max-md:px-5">
          <p className="font-bold text-2xl text-slate-600 max-md:text-lg max-md:text-center">
            Bienvenido a la parte de aberturas/stock/fabrica 🖐️🚀.
          </p>
        </div>

        <section className="flex flex-col gap-10 px-10 mt-5 max-md:px-5 min-h-screen max-md:gap-5">
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
      </div>
    </>
  );
};
