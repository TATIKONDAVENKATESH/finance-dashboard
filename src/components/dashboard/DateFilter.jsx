import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function DateFilter({ range, setRange }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const options = [
        { label: "All", value: "all" },
        { label: "30 Days", value: "30" },
        { label: "90 Days", value: "90" },
    ];

    return (
        <div
            className={`flex gap-2 p-1 rounded-xl w-fit border ${isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-100 border-gray-200"
                }`}
        >
            {options.map((opt) => {
                const isActive = range === opt.value;

                return (
                    <button
                        key={opt.value}
                        onClick={() => setRange(opt.value)}
                        className={`px-4 py-1 rounded-lg text-sm font-medium transition
              ${isActive
                                ? "bg-indigo-500 text-white shadow"
                                : isDark
                                    ? "text-gray-300 hover:bg-white/10"
                                    : "text-gray-700 hover:bg-gray-200"
                            }
            `}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}