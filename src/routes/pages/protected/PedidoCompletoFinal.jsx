import { useEffect, useState } from "react";
import { usePedidoContext } from "../../../context/PedidoProvider";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargarPdfPedidoTres } from "../../../components/pedidos/DescargarPdfPedidoTres";
import { DescargarPdfPedidoCuatro } from "../../../components/pedidos/DescargarPdfPedidoCuatro";

export const PedidoCompletoFinal = () => {
  const { datosPresupuesto, setDatosPresupuesto } = usePedidoContext();

  const [totalCantidad, setTotalCantidad] = useState(0);

  // Obtener la fecha actual
  const fechaActual = moment();

  useEffect(() => {
    setTimeout(() => {
      load();
    }, 500);
  }, [datosPresupuesto.length]);

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

  let data = datos.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultado = data?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  //   const nuevoArregloProductos = datosPresupuesto.reduce((acumulador, item) => {
  //     const clienteNombre = item.cliente.split("(")[0].trim();

  //     const clienteExistente = acumulador.find(
  //       (cliente) => cliente.clienteNombre === clienteNombre
  //     );

  //     if (clienteExistente) {
  //       clienteExistente.productos.push(...item.productos.respuesta);
  //     } else {
  //       acumulador.push({
  //         clienteNombre,
  //         productos: [...item.productos.respuesta],
  //       });
  //     }

  //     return acumulador;
  //   }, []);

  //   console.log(nuevoArregloProductos);

  //   console.log(datosPresupuesto);
  //   const nuevoArregloClientes = datosPresupuesto.reduce((acumulador, item) => {
  //     item.productos.respuesta.forEach((producto) => {
  //       const clienteExistente = acumulador.find(
  //         (cliente) => cliente.cliente === producto.cliente
  //       );

  //       if (clienteExistente) {
  //         clienteExistente.productos.push(producto);
  //       } else {
  //         acumulador.push({
  //           cliente: producto.cliente,
  //           productos: [producto],
  //         });
  //       }
  //     });

  //     return acumulador;
  //   }, []);

  //   console.log(nuevoArregloClientes);

  //   console.log(datosPresupuesto);

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

  let clientesUnicos = new Set();

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

  return (
    <section className="w-[100%] px-10 py-12">
      <div className="rounded shadow py-10 px-10 border-[1px]">
        <div className="space-y-2">
          <div className="font-semibold text-lg">
            Total aberturas: {resultado}
          </div>
          <div className="font-semibold text-lg capitalize">
            Fabricas - Clientes:{" "}
            <span className="text-blue-500 font-normal flex flex-row gap-5 mt-2">
              {resultJoin}
            </span>
          </div>
        </div>

        <div className="rounded shadow py-10 px-10 border-[1px] mt-6 space-y-4">
          <div className="font-semibold text-lg mb-4">
            Aberturas Realizadas por Cliente - Casa
          </div>
          {nuevoArregloClientes.map((cliente) => (
            <div
              key={cliente.cliente}
              className="flex flex-col gap-2 shadow py-2 px-2 rounded border-[1px]"
            >
              <h3 className="font-bold">{`Cliente - Casa: ${cliente.cliente}`}</h3>
              <p className="text-blue-500">
                {`Lugar - Entrega de las aberturas: `}
                <span className="font-bold">{cliente.clienteOriginal}</span>
              </p>
              <p className="text-blue-500">
                {`Remito de entrega: `}
                <span className="font-bold">#{cliente?.remito}</span>
              </p>
              <ul>
                {/* {cliente.productos.map((producto) => (
                  <li key={producto.id}>
                    {`Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, ${producto.detalle}`}
                  </li>
                ))} */}

                <table className="border-[1px]  p-[5px] table-auto w-full rounded">
                  <thead>
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Detalle de linea - categoria</th>
                      <th className="p-3">Total aberturas</th>
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
                datosPresupuesto={datosPresupuesto}
              />
            }
            className="bg-green-500 py-1 px-5 rounded text-white font-semibold"
          >
            Descargar Pedido Entrega Final
          </PDFDownloadLink>
        </div>
      </div>
    </section>
  );
};
