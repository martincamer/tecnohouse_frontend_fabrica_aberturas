import "moment/locale/es";
import { Search } from "../../../components/ui/Search";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { CrearNuevoRemito } from "../../../components/remitos/CrearNuevoRemito";
import { useRemitoContext } from "../../../context/RemitoProvider";
import { TableRemitos } from "../../../components/remitos/TableRemitos";

export const Remitos = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    searcher,
    search,
    results,
    handleMesChange,
    mesSeleccionado,
  } = useRemitoContext();

  console.log(results);
  return (
    <section className="w-full py-14 px-14">
      <div className="border-[1px] shadow border-gray-200 py-14 px-14 rounded">
        <div>
          <p className="font-semibold text-[20px]">Crear Nuevos Remitos</p>
        </div>

        <div className="mt-5 flex gap-5">
          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Remitos generados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">
              {results?.length}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Fecha del mes:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Total aberturas realizadas:</p>{" "}
            <span className="font-bold text-blue-400 text-lg">
              {results.map((p) =>
                p.productos.respuesta.reduce((sum, b) => {
                  return sum + Number(b?.cantidad);
                }, 0)
              )}
            </span>
          </div>
        </div>

        <div className="mt-5 py-5 px-5">
          <button
            type="button"
            onClick={openModal}
            className="py-2 px-5 bg-green-500 rounded shadow font-semibold text-white"
          >
            Crear nuevo remito
          </button>
        </div>

        <div>
          <Search searcher={searcher} search={search} />
        </div>

        <div className="flex gap-2 items-center my-4">
          <label className="font-bold text-lg" htmlFor="mes">
            Selecciona el mes:
          </label>
          <select
            className="font-semibold py-1 px-4 rounded shadow uppercase"
            id="mes"
            onChange={handleMesChange}
            value={mesSeleccionado}
          >
            <option value="">Todos los meses</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
            {/* Agregar opciones para los demás meses */}
          </select>
        </div>

        <div className="mt-5 h-[500px] overflow-y-scroll">
          <TableRemitos />
        </div>

        <CrearNuevoRemito isOpen={isOpen} closeModal={closeModal} />
      </div>
    </section>
  );
};
