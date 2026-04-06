import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg 
                 bg-gray-200 dark:bg-gray-800 
                 text-black dark:text-white 
                 border border-gray-300 dark:border-gray-600
                 transition"
        >
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}