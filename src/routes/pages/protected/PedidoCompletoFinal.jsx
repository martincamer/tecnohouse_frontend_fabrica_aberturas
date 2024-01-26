import { useEffect, useState } from "react";
import { usePedidoContext } from "../../../context/PedidoProvider";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargarPdfPedidoCuatro } from "../../../components/pedidos/DescargarPdfPedidoCuatro";
import moment from "moment";

export const PedidoCompletoFinal = () => {
  const { datosPresupuesto, setDatosPresupuesto } = usePedidoContext();

  const [totalCantidad, setTotalCantidad] = useState(0);

  // Obtener la fecha actual
  const fechaActual = moment();

  function load() {
    const datosFiltrados = datosPresupuesto.filter((objeto) => {
      const fechaCreacion = moment(objeto.created_at);
      return (
        fechaCreacion.month() === fechaActual.month() &&
        fechaCreacion.year() === fechaActual.year()
      );
    });

    // Actualizar el estado con los datos filtrados
    setDatosPresupuesto(datosFiltrados);
  }

  useEffect(() => {
    setTimeout(() => {
      load();
    }, 100);
  }, [datosPresupuesto.length]);

  useEffect(() => {
    const total = datosPresupuesto.reduce((acumulador, objeto) => {
      const fechaCreacion = moment(objeto.created_at);
      if (
        fechaCreacion.month() === fechaActual.month() &&
        fechaCreacion.year() === fechaActual.year()
      ) {
        objeto.productos.respuesta.forEach((producto) => {
          acumulador += parseInt(producto.cantidad, 10);
        });
      }
      return acumulador;
    }, 0);

    // Actualizar el estado con el total calculado
    setTotalCantidad(total);
  }, []);

  const datos = datosPresupuesto.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  const datosTwo = datosPresupuesto.map((c) =>
    c.productos.respuesta.map((c) => c.cantidadFaltante)
  );

  let data = datos.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  let dataTwo = datosTwo.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultado = data?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  const resultadoTwo = dataTwo?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  const nuevoArregloClientes = datosPresupuesto.reduce((acumulador, item) => {
    item.productos.respuesta.forEach((producto) => {
      const clienteExistente = acumulador.find(
        (cliente) => cliente.cliente === producto.cliente
      );

      if (clienteExistente) {
        clienteExistente.productos.push(producto);
      } else {
        acumulador.push({
          cliente: producto.cliente,
          clienteOriginal: item.cliente,
          remito: item.remito, // Agregar el cliente original
          productos: [producto],
        });
      }
    });

    return acumulador;
  }, []);

  const clientesConCantidadSuficiente = [];
  const clientesConCantidadInsuficiente = [];
  const clientesUnicos = new Set();

  nuevoArregloClientes.forEach((cliente) => {
    // Verificar si todos los productos del cliente tienen la cantidad necesaria
    const todosConCantidadSuficiente = cliente.productos.every(
      (producto) => producto.cantidad === producto.cantidadFaltante
    );

    // Agregar el cliente al arreglo correspondiente
    if (todosConCantidadSuficiente) {
      clientesConCantidadSuficiente.push(cliente);
    } else {
      clientesConCantidadInsuficiente.push(cliente);
    }

    // Agregar el cliente al conjunto de clientesUnicos
    clientesUnicos.add(cliente);
  });

  // Nuevo arreglo para almacenar los objetos únicos
  let nuevosDatos = [];

  // Iterar sobre los datos y filtrar clientes únicos
  datosPresupuesto.forEach((objeto) => {
    var cliente = objeto.cliente;
    if (!clientesUnicos.has(cliente)) {
      clientesUnicos.add(cliente);
      nuevosDatos.push({ cliente: cliente }); // Añadir un nuevo objeto con solo el campo "cliente"
    }
  });

  const nuevo = nuevosDatos?.map((p) => p?.cliente);

  const resultJoin = nuevo?.join(", ");

  console.log(clientesConCantidadInsuficiente);

  return (
    <section className="w-[100%] px-10 py-12">
      <div className="rounded shadow py-10 px-10 border-[1px]">
        <div className="space-y-2">
          <div className="font-normal text-lg uppercase flex gap-2">
            Total aberturas generadas:
            <span className="font-bold text-xl">{resultado}</span>
          </div>

          <div className="font-normal text-lg uppercase flex gap-2">
            Total aberturas entregadas - realizadas:
            <span className="font-bold text-xl">{resultadoTwo}</span>
          </div>

          <div className="font-semibold text-lg uppercase flex items-center gap-2">
            Fabricas - Clientes:{" "}
            <span className="text-blue-500 font-normal">{resultJoin}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm border-[1px]  py-5 px-10 rounded shadow shadow-black/30 overflow-y-scroll h-[50vh]">
            {nuevoArregloClientes.map((cliente) => (
              <div className="flex gap-2 border-[1px] py-1 px-4 rounded shadow shadow-black/20">
                <h3 className="font-bold">{cliente.cliente}</h3>/
                <p className="text-blue-500">
                  {`Lugar - Entrega: `}
                  <span className="font-bold">{cliente.clienteOriginal}</span>
                </p>
                /
                <div className="flex gap-1">
                  <p>Cantidad Aberturas:</p>
                  <p className="font-bold text-sm text-blue-500">
                    {cliente?.productos?.reduce((sum, b) => {
                      return sum + Number(b?.cantidad);
                    }, 0)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Entregadas:</p>
                  <p className="font-bold text-sm text-blue-500">
                    {cliente?.productos?.reduce((sum, b) => {
                      return sum + Number(b?.cantidadFaltante);
                    }, 0)}
                  </p>
                </div>
                /
                <p
                  className={`${
                    cliente?.productos?.reduce((sum, b) => {
                      return (
                        sum + (b?.cantidad !== b?.cantidadFaltante ? 1 : 0)
                      );
                    }, 0) > 0
                      ? "text-red-500 font-semibold text-sm"
                      : "text-green-500 font-semibold text-sm"
                  }`}
                >
                  {cliente?.productos?.reduce((sum, b) => {
                    return sum + (b?.cantidad !== b?.cantidadFaltante ? 1 : 0);
                  }, 0) > 0
                    ? "FALTA REALIZAR"
                    : "ENTREGADO"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <p className="font-bold text-2xl ">
            Aberturas entregadas clientes - Casa
          </p>
          <div className="grid grid-cols-4 text-sm h-[10vh] overflow-y-scroll">
            {clientesConCantidadSuficiente?.map((c) => (
              <div className="flex gap-2">
                {
                  <h3 className="font-semibold text-blue-500">{` ${c.cliente}`}</h3>
                }
                /
                {
                  <h3 className="font-semibold text-black">{`Fabrica: ${c.clienteOriginal}`}</h3>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="rounded shadow py-10 px-10 border-[1px] mt-6 space-y-4 h-[600px] overflow-y-scroll">
          {clientesConCantidadSuficiente.map((cliente) => (
            <div
              key={cliente.cliente}
              className="flex flex-col gap-2 shadow py-2 px-2 rounded border-[1px]"
            >
              <h3 className="font-bold">{`Cliente - Casa: ${cliente.cliente}`}</h3>
              <p className="text-blue-500">
                {`Lugar - Entrega de las aberturas: `}
                <span className="font-bold">{cliente.clienteOriginal}</span>
              </p>

              <ul>
                <table className="border-[1px]  p-[5px] table-auto w-full rounded ">
                  <thead>
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Detalle de linea - categoria</th>
                      <th className="p-3">Total aberturas a entregar</th>
                      <th className="p-3">Total realizadas</th>
                      <th className="p-3">Ancho x Alto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cliente?.productos?.map((p) => (
                      <tr key={p?.id}>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.id}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                          {p?.cliente}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                          {p?.detalle}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.cantidad}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.cantidadFaltante}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.ancho}x{p?.alto}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <p className="font-bold text-2xl ">
            Aberturas no realizadas clientes - Casa
          </p>
          <div className="grid grid-cols-6 text-sm">
            {clientesConCantidadInsuficiente?.map((c) => (
              <div className="">
                {
                  <h3 className="font-semibold text-blue-500">{` ${c.cliente}`}</h3>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="rounded shadow py-10 px-10 border-[1px] mt-6 space-y-4 h-[600px] overflow-y-scroll">
          {clientesConCantidadInsuficiente?.map((cliente) => (
            <div
              key={cliente.cliente}
              className="flex flex-col gap-2 shadow py-2 px-2 rounded border-[1px]"
            >
              <h3 className="font-bold">{`Cliente - Casa: ${cliente.cliente}`}</h3>
              <p className="text-blue-500">
                {`Lugar - Entrega de las aberturas: `}
                <span className="font-bold">{cliente.clienteOriginal}</span>
              </p>
              {/* <p className="text-blue-500">
                {`Remito de entrega: `}
                <span className="font-bold">#{cliente?.remito}</span>
              </p> */}
              <ul>
                {/* {cliente.productos.map((producto) => (
                  <li key={producto.id}>
                    {`Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, ${producto.detalle}`}
                  </li>
                ))} */}

                <table className="border-[1px]  p-[5px] table-auto w-full rounded ">
                  <thead>
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Detalle de linea - categoria</th>
                      <th className="p-3">Total aberturas a entregar</th>
                      <th className="p-3">Total realizadas</th>
                      <th className="p-3">Ancho x Alto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cliente?.productos?.map((p) => (
                      <tr key={p?.id}>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.id}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                          {p?.cliente}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium capitalize">
                          {p?.detalle}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.cantidad}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.cantidadFaltante}
                        </th>
                        <th className="border-[1px] border-gray-300 p-3 font-medium">
                          {p?.ancho}x{p?.alto}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <PDFDownloadLink
            fileName={`${nuevoArregloClientes.map(
              (cliente) => cliente.cliente
            )}`}
            document={
              <DescargarPdfPedidoCuatro
                nuevoArregloClientes={nuevoArregloClientes}
                clientesConCantidadInsuficiente={
                  clientesConCantidadInsuficiente
                }
                clientesConCantidadSuficiente={clientesConCantidadSuficiente}
                datosPresupuesto={datosPresupuesto}
              />
            }
            className="bg-green-500 py-1 px-5 rounded cursor-pointer text-white font-semibold"
          >
            Descargar Pedido Entrega Final
          </PDFDownloadLink>
        </div>
      </div>
    </section>
  );
};
