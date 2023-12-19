import "moment/locale/es";
import { Search } from "../../../components/ui/Search";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { CrearNuevoRemito } from "../../../components/remitos/CrearNuevoRemito";
import { useRemitoContext } from "../../../context/RemitoProvider";
import { TableRemitos } from "../../../components/remitos/TableRemitos";

export const Remitos = () => {
  const { isOpen, openModal, closeModal } = useRemitoContext();

  return (
    <section className="w-full py-14 px-14">
      <div className="border-[1px] shadow border-gray-200 py-14 px-14 rounded">
        <div>
          <p className="font-semibold text-[20px]">Crear Nuevos Remitos</p>
        </div>

        <div className="mt-5 flex gap-5">
          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Pedidos generados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg"></span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Fecha del mes:</p>{" "}
            <span className="font-bold text-blue-400 text-lg"></span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Total remitos generados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg"></span>
          </div>

          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Total remitos realizados:</p>{" "}
            <span className="font-bold text-blue-400 text-lg"></span>
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
          <Search />
        </div>

        <div className="mt-5 h-[500px] overflow-y-scroll">
          <TableRemitos />
        </div>

        <CrearNuevoRemito isOpen={isOpen} closeModal={closeModal} />
      </div>
    </section>
  );
};
