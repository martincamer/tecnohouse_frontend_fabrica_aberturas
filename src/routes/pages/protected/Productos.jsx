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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <section className="w-full h-full min-h-full max-h-full px-12 max-md:px-4 flex flex-col gap-12 max-md:gap-8 py-24">
      <div className="w-[300px] py-5 rounded-2xl bg-slate-300 animate-pulse shadow"></div>

      <div className="animate-pulse rounded-2xl border-slate-200 border-[1px] flex shadow">
        <div className="flex justify-center w-full border-r-[1px] border-slate-200 py-12 px-20">
          <div className="bg-slate-300 py-6 px-12 rounded-2xl animate-pulse"></div>
        </div>
        <div className="w-full justify-center flex py-12 px-20">
          <div className="bg-slate-300 py-6 px-12 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-full py-4 px-4">
        <div className="grid-cols-7 grid gap-2 w-full">
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
          <div className="py-5 px-6 rounded-2xl bg-slate-300 animate-pulse shadow"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/4 py-5 px-4"></div>
        <div className="border-slate-200 shadow-md rounded-2xl border-[1px] w-1/5 py-5 px-4"></div>
      </div>

      <div className="border-[1px] border-slate-200 animate-pulse rounded-2xl  max-md:hidden md:block hover:shadow-md transition-all ease-linear ">
        <table className="min-w-full  uppercase">
          <thead className="bg-slate-200 rounded-xl">
            <tr>
              <th className="py-9 px-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <tr key={index}>
                <th className="py-9 px-3"></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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

        <ToastContainer />
      </section>
    </main>
  );
};
