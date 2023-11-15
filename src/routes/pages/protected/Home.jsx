import React from "react";
import { useAberturasContext } from "../../../context/AluminioAberturas";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { useAluminioContext } from "../../../context/AluminioProvider";

export const Home = () => {
  const { results } = useAberturasContext();
  const { results: accesorios } = useAccesoriosContext();
  const { results: perfiles } = useAluminioContext();

  const unidadesEnStock = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  const unidadesEnStockAccesorios = () => {
    return accesorios.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  const unidadesEnStockAluminio = () => {
    return perfiles.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  return (
    <section className="w-full py-12 px-12">
      <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 space-y-5">
        <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 flex gap-4 items-center">
          <p className="font-bold text-lg">Productos Totales en stock: Cant.</p>
          <div className="font-bold text-lg text-black py-2 rounded-full bg-gray-100 px-4 shadow shadow-black/30 border-[0.5px]">
            {unidadesEnStock()}
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 flex gap-4 items-center">
          <p className="font-bold text-lg">
            Accesorios Totales en stock: Cant.
          </p>
          <div className="font-bold text-lg text-black py-2 rounded-full bg-gray-100 px-4 shadow shadow-black/30 border-[0.5px]">
            {unidadesEnStockAccesorios()}
          </div>
        </div>

        <div className="border-[1px] border-black/20 py-10 px-10 rounded shadow-md shadow-black/10 flex gap-4 items-center">
          <p className="font-bold text-lg">Perfiles Totales en stock: Cant.</p>
          <div className="font-bold text-lg text-black py-2 rounded-full bg-gray-100 px-4 shadow shadow-black/30 border-[0.5px]">
            {unidadesEnStockAluminio()}
          </div>
        </div>
      </div>
    </section>
  );
};
