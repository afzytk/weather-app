import { CloudSun } from "lucide-react";
import { motion } from "framer-motion";
import WeatherDashboard from "./components/WeatherDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-4 pt-12"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-400/10">
            <CloudSun className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-3xl font-semibold tracking-wide">Weather Info</h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="h-px w-64 bg-gradient-to-r from-transparent via-white/30 to-transparent origin-center"
        />
      </motion.header>

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="relative z-10 flex justify-center px-6 py-20"
      >
        <WeatherDashboard />
      </motion.main>
    </div>
  );
}
