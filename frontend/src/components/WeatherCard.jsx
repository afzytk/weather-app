const WeatherCard = () => {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
      <h2 className="text-2xl font-semibold text-slate-900 mb-4">
        Weather Details
      </h2>

      {/* Placeholder content (will be dynamic later) */}
      <div className="text-center py-10 text-slate-500">
        Search for a city to view weather data
      </div>
    </div>
  );
};

export default WeatherCard;
