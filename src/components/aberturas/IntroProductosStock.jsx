import React from "react";

export const IntroAberturasStock = ({ results }) => {
  //sumar totales
  const unidadesEnStock = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  console.log(results);

  return (
    <div className="grid grid-cols-4 gap-5 max-md:grid-cols-1 max-md:px-5 max-md:hidden">
      <div className="flex flex-col gap-2 justify-center items-center bg-white shadow-xl rounded-xl py-6 px-6">
        <p className="font-bold text-md max-md:text-xs max-md:font-semibold max-md:uppercase text-slate-500 uppercase">
          Unidades en stock
        </p>
        <div className="flex justify-center items-center">
          <p className="text-lg font-bold text-white bg-indigo-500 rounded-full py-2.5 px-6 max-md:text-sm">
            {unidadesEnStock()} unds
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center bg-white shadow-xl rounded-xl py-6 px-6">
        <p className="font-bold text-md max-md:text-xs max-md:font-semibold max-md:uppercase text-slate-500 uppercase">
          Unidades cargadas
        </p>
        <div className="flex justify-center items-center">
          <p className="text-lg font-bold text-white bg-indigo-500 rounded-full py-2.5 px-6 max-md:text-sm">
            {results.length} unds
          </p>
        </div>
      </div>
    </div>
  );
};
