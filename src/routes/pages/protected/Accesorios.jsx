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
  } = useAccesoriosContext();

  const { spinner } = useAuth();

  return spinner ? (
    <Spinner />
  ) : (
    <main className="h-screen w-full py-14 px-14 ">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10 overflow-y-scroll">
        <IntroTitleAccesorios />

        <IntroAccesoriosStock results={results} />

        <Search search={search} searcher={searcher} />

        <CategoriasAccesorios
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

        <TableAccesorios
          handlePerfilSeleccionado={handlePerfilSeleccionado}
          openModalEditar={openModalEditar}
          results={results}
        />

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
      </section>
    </main>
  );
};
