export const Search = ({ search, searcher, variable }) => {
  return (
    <div>
      <div
        className={`${variable} relative w-1/5 max-w-full rounded-xl border-slate-300 border-[1px] py-2.5 pr-10 shadow-sm sm:text-sm`}
      >
        <input
          value={search}
          onChange={searcher}
          placeholder="Buscar por el código o el detalle"
          type="text"
          id="Search"
          className="outline-none px-2 w-full"
        />
        <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
          <button
            type="button"
            className="text-gray-600 hover:text-gray-700"
            // onClick={handleSearch}
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
};
