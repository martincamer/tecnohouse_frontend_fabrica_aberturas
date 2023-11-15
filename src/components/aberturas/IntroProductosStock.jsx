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
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-2 w-full text-center">
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="font-semibold text-lg">Unidades en Stock</p>
        <p className="text-2xl font-bold text-blue-500">{unidadesEnStock()}</p>
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
