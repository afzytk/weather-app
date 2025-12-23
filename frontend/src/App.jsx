import { useEffect, useState } from "react";
import { CloudSun } from "lucide-react";
import WeatherDashboard from "./components/WeatherDashboard";

export default function App() {
  const [dark, setDark] = useState(localStorage.getItem("theme") !== "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      className="
        min-h-screen transition-colors
        bg-gradient-to-br from-slate-100 to-white
        dark:from-[#0b1020] dark:to-black
        text-slate-900 dark:text-white
      "
    >
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-black/10 dark:border-white/10">
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-400/10">
            <CloudSun className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>

          <h1 className="text-2xl font-semibold tracking-wide">Weather Info</h1>
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="
            rounded-xl px-4 py-2 text-sm font-medium
            bg-black/10 dark:bg-white/10
            hover:bg-black/20 dark:hover:bg-white/20
            transition
          "
        >
          {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex justify-center px-6 py-16">
        <WeatherDashboard />
      </main>
    </div>
  );
}
