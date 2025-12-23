import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
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

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

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

  const clearSearch = () => {
    setCity("");
    setSuggestions([]);
    setWeather(null);
    setError("");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-6xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 shadow-xl"
    >
      <div className="relative mb-10">
        <input
          id="city-search"
          name="city"
          value={city}
          onChange={(e) => onType(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search city"
          className="w-full rounded-2xl px-6 py-4 pr-12 text-lg bg-black/40 outline-none"
        />

        {city && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>
        )}

        {suggestions.length > 0 && (
          <ul className="absolute z-20 mt-2 w-full rounded-2xl bg-[#0a0d14] border border-white/10 overflow-hidden">
            {suggestions.map((c, i) => (
              <li
                key={i}
                onClick={() => {
                  setCity(`${c.name}, ${c.country}`);
                  search(`${c.name}, ${c.country}`);
                }}
                className="px-6 py-4 cursor-pointer hover:bg-white/10"
              >
                {c.name}
                {c.state ? `, ${c.state}` : ""} · {c.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p className="text-center text-white/60">Loading…</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
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
            <p className="capitalize text-white/70">{weather.description}</p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6"
          >
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
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl p-6 border border-white/10 bg-white/5"
    >
      <Icon className="h-6 w-6 mb-3 text-white/70" />
      <p className="text-sm text-white/50">{label}</p>
      <p className="text-2xl font-semibold mt-1 capitalize">{value}</p>
    </motion.div>
  );
}
