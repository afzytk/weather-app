const SearchBox = ({ city, setCity, onSearch }) => {
  return (
    <div className="flex gap-3 mt-6">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="Enter a city..."
        className="flex-1 px-4 py-3 rounded-xl border border-slate-300 shadow-sm
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />

      <button
        onClick={onSearch}
        className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium
                   hover:bg-blue-700 hover:scale-[1.02] active:scale-95 
                   transition-transform shadow-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
