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
    <div className="bg-white max-md:justify-center items-center border-[1px] border-slate-300 rounded-2xl flex gap-2 w-full text-center hover:shadow-md transition-all ease-linear cursor-pointer max-md:py-3">
      <div className="py-[30px] px-[12px] max-md:px-1 max-md:py-1 border-slate-300 flex flex-col gap-2 border-r-[1px] w-full h-full justify-center">
        <p className="font-normal text-md max-md:text-xs max-md:font-semibold max-md:uppercase text-slate-700 uppercase">
          Unidades en Stock
        </p>
        <div className="flex justify-center items-center">
          <p className="text-xl font-bold text-indigo-600 bg-indigo-100 rounded-xl py-2 px-4 max-md:text-sm">
            {unidadesEnStock()}
          </p>
        </div>
      </div>
      <div className="py-[30px] px-[12px] max-md:px-1 max-md:py-1 border-slate-300 flex flex-col gap-2 w-full h-full justify-center">
        <p className="font-normal text-md max-md:text-xs max-md:font-semibold max-md:uppercase text-slate-700 uppercase">
          Unidades cargadas
        </p>
        <div className="flex justify-center items-center">
          <p className="text-xl font-bold text-indigo-600 bg-indigo-100 rounded-xl py-2 px-4 max-md:text-sm">
            {results.length}
          </p>
        </div>
      </div>
    </div>
  );
};
