import { ModalCrearPedido } from "../../../components/pedidos/ModalCrearPedido";
import { TablePedidos } from "../../../components/pedidos/TablePedidos";
import { usePedidoContext } from "../../../context/PedidoProvider";

export const Pedidos = () => {
  const { isOpen, openModal, closeModal } = usePedidoContext();

  return (
    <section className="w-full py-14 px-14">
      <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow py-10 px-12 w-full">
        <div>
          <p className="font-semibold text-[20px]">Crear pedido clientes</p>
        </div>

        <div className="mt-5">
          <div className="border-[1px] py-5 px-5 flex gap-2 items-center shadow">
            <p>Pedidos generados: </p>{" "}
            <span className="font-bold text-blue-400 text-lg">1</span>
          </div>
        </div>

        <div className="mt-5 py-5 px-5">
          <button
            type="button"
            onClick={openModal}
            className="py-2 px-5 bg-green-500 rounded shadow font-semibold text-white"
          >
            Crear nuevo pedido
          </button>
        </div>

        <div className="mt-5">
          <TablePedidos />
        </div>

        <ModalCrearPedido isOpen={isOpen} closeModal={closeModal} />
      </div>
    </section>
  );
};
