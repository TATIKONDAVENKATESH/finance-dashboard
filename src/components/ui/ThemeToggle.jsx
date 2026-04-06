import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition font-medium
                ${isDark
                    ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200"
                }
            `}
        >
            <span className="text-lg">
                {isDark ? "🌙" : "☀️"}
            </span>

            {/* Optional label (remove if you want only icon) */}
            <span className="text-sm">
                {isDark ? "Dark" : "Light"}
            </span>
        </button>
    );
}