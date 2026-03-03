import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={theme} // animate on change
        className="btn theme-toggle"
        onClick={toggleTheme}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
        title="Toggle romantic theme 💖"
      >
        {theme === "dark" ? "🌹 Romantic Dark" : "🌸 Soft Light"}
      </motion.button>
    </AnimatePresence>
  );
}