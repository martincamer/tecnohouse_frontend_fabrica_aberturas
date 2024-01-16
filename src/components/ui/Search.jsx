export const Search = ({ search, searcher }) => {
  return (
    <div>
      <input
        value={search}
        onChange={searcher}
        className="bg-white max-md:text-sm border-[1px] border-gray-300 rounded-md shadow-black/20 shadow-md py-2 px-3 w-1/2 placeholder:text-gray-500/90 outline-none max-md:w-full"
        placeholder="Buscar por el nombre,producto,remitos,etc..."
      />
    </div>
  );
};
