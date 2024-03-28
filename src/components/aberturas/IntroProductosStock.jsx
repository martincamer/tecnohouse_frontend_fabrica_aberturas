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
    <div className="border-[1px] border-slate-300 bg-white rounded-xl shadow flex gap-2 w-full text-center items-center">
      <div className="py-[30px] px-[0px] border-slate-300 flex flex-col gap-2 border-r-[1px] w-full max-md:py-6">
        <p className="text-slate-700 text-sm max-md:text-md uppercase max-md:text-xs font-bold">
          Unidades en Stock
        </p>
        <p className="text-xl font-bold text-indigo-600 max-md:text-sm">
          {unidadesEnStock()}
        </p>
      </div>
      <div className="py-[30px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full max-md:py-6">
        <p className="text-slate-700 text-sm max-md:text-md uppercase max-md:text-xs font-bold">
          Unidades cargadas
        </p>
        <p className="text-xl font-bold text-indigo-600 max-md:text-sm">
          {results.length}
        </p>
      </div>
    </div>
  );
};
