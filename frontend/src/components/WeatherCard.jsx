const WeatherCard = () => {
  return (
    <div
      className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1
             max-w-xl mx-auto md:max-w-none"
    >
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Weather Details
      </h2>

      {/* MAIN WEATHER BLOCK */}
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6">
        {/* Weather Icon Placeholder */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          {/* Simple weather SVG icon */}
          <svg
            className="w-10 h-10 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v2m6.364 1.636l-1.414 1.414M20 12h-2M4 12H2m3.636 6.364l-1.414-1.414M12 20v2m4.95-4.95l1.414 1.414M7.05 17.05l-1.414 1.414"
            />
          </svg>
        </div>

        {/* Temperature */}
        <div className="text-5xl font-bold text-slate-900 tracking-tight transition-transform duration-300 hover:scale-[1.03]">
          24°C
        </div>

        {/* Weather Description */}
        <div className="text-slate-600 text-lg capitalize">clear sky</div>
      </div>

      {/* EXTRA DETAILS */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:bg-slate-100 hover:shadow">
          <div className="text-slate-500">Humidity</div>
          <div className="text-slate-900 font-semibold text-lg">60%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:bg-slate-100 hover:shadow">
          <div className="text-slate-500">Wind</div>
          <div className="text-slate-900 font-semibold text-lg">3 m/s</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:bg-slate-100 hover:shadow">
          <div className="text-slate-500">Feels Like</div>
          <div className="text-slate-900 font-semibold text-lg">22°C</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:bg-slate-100 hover:shadow">
          <div className="text-slate-500">Pressure</div>
          <div className="text-slate-900 font-semibold text-lg">1015 hPa</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
