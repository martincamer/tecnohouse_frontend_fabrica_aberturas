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
    <div className="border-[1px] border-slate-300 bg-slate-100 rounded shadow-black/10 shadow flex gap-2 w-full text-center items-center">
      <div className="py-[20px] px-[0px] border-slate-300 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="text-slate-700 text-sm max-md:text-md">
          Unidades en Stock
        </p>
        <p className="text-xl font-bold text-indigo-600 max-md:text-sm">
          {unidadesEnStock()}
        </p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="text-slate-700 text-sm max-md:text-md">
          Unidades cargadas
        </p>
        <p className="text-xl font-bold text-indigo-600 max-md:text-sm">
          {results.length}
        </p>
      </div>
      {/* <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p>Unidades vendidas</p>
        <p>27</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full">
        <p>Inactivos</p>
        <p>27</p>
      </div> */}
    </div>
  );
};
