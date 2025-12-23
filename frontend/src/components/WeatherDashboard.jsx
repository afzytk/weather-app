import { useState } from "react";
import {
  Thermometer,
  Droplets,
  Wind,
  ArrowUp,
  ArrowDown,
  Sunrise,
  Sunset,
  Cloud,
} from "lucide-react";
import { getWeather, getCitySuggestions } from "../api/weather";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onType = async (value) => {
    setCity(value);
    if (value.length < 2) return setSuggestions([]);
    const res = await getCitySuggestions(value);
    setSuggestions(res.data);
  };

  const search = async (value = city) => {
    try {
      setLoading(true);
      setError("");
      setSuggestions([]);
      const res = await getWeather(value);
      setWeather(res.data);
    } catch {
      setError("City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        w-full max-w-6xl rounded-3xl
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        border border-black/10 dark:border-white/10
        p-10 shadow-xl
      "
    >
      {/* SEARCH */}
      <div className="relative mb-10">
        <input
          value={city}
          onChange={(e) => onType(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search city"
          className="
            w-full rounded-2xl px-6 py-4 text-lg
            bg-black/5 dark:bg-black/40
            outline-none
          "
        />

        {suggestions.length > 0 && (
          <ul
            className="
              absolute z-20 mt-2 w-full rounded-2xl
              bg-white dark:bg-[#0b1020]
              border border-black/10 dark:border-white/10
              overflow-hidden
            "
          >
            {suggestions.map((c, i) => (
              <li
                key={i}
                onClick={() => {
                  setCity(`${c.name}, ${c.country}`);
                  search(`${c.name}, ${c.country}`);
                }}
                className="
                  px-6 py-4 cursor-pointer
                  hover:bg-black/5 dark:hover:bg-white/10
                "
              >
                {c.name}
                {c.state ? `, ${c.state}` : ""} · {c.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p className="text-center opacity-60">Loading weather…</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* MAIN WEATHER */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold">
              {weather.city}, {weather.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
              alt="weather"
              className="mx-auto h-40"
            />

            <p className="text-7xl font-bold">{weather.temperature}°</p>

            <p className="capitalize opacity-70">{weather.description}</p>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            <Info
              icon={Thermometer}
              label="Feels Like"
              value={`${weather.feels_like}°`}
            />
            <Info
              icon={Droplets}
              label="Humidity"
              value={`${weather.humidity}%`}
            />
            <Info
              icon={Wind}
              label="Wind Speed"
              value={`${weather.wind} m/s`}
            />
            <Info icon={ArrowDown} label="Min Temp" value={`${weather.min}°`} />
            <Info icon={ArrowUp} label="Max Temp" value={`${weather.max}°`} />
            <Info icon={Sunrise} label="Sunrise" value={weather.sunrise} />
            <Info icon={Sunset} label="Sunset" value={weather.sunset} />
            <Info icon={Cloud} label="Condition" value={weather.description} />
          </div>
        </div>
      )}
    </section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div
      className="
        rounded-2xl p-6
        border border-black/10 dark:border-white/10
        bg-black/5 dark:bg-white/5
      "
    >
      <Icon className="h-6 w-6 mb-3 opacity-70" />
      <p className="text-sm opacity-60">{label}</p>
      <p className="text-2xl font-semibold mt-1 capitalize">{value}</p>
    </div>
  );
}
