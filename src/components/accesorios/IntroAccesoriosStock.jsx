import React from "react";

export const IntroAccesoriosStock = ({ results }) => {
  //sumar totales
  const unidadesEnStock = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.stock);
    }, 0);
  };

  return (
    <div className="bg-white border-[1px] border-slate-300 rounded-xl shadow flex gap-2 w-full text-center">
      <div className="py-[16px] px-[12px] max-md:px-1 max-md:py-1 border-slate-300 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="font-normal text-md max-md:text-md">Unidades en stock</p>
        <p className="text-xl font-bold text-indigo-500 max-md:text-sm">
          {unidadesEnStock()}
        </p>
      </div>
      <div className="py-[16px] px-[10px] flex flex-col gap-2 w-full">
        <p className="font-normal text-md max-md:text-md">Unidades cargadas</p>
        <p className="text-xl font-bold text-indigo-500 max-md:text-sm">
          {results.length}
        </p>
      </div>
    </div>
  );
};
