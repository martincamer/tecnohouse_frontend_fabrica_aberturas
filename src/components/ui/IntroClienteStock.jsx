import React from "react";

export const IntroClientesStock = () => {
  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-2 w-full text-center">
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p>Clientes totales</p>
        <p>27</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p>Deudores</p>
        <p>27</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full">
        <p>Inactivos</p>
        <p>27</p>
      </div>
    </div>
  );
};
