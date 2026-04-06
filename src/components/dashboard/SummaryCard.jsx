import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SummaryCard({ title, value }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const isNegative = value < 0;

  return (
    <div
      className={`
        p-5 rounded-2xl border transition
        ${isDark
          ? "bg-white/10 border-white/10 text-white shadow-lg backdrop-blur-lg"
          : "bg-white border-gray-200 text-gray-900 shadow-sm"
        }
        ${isDark ? "hover:bg-white/15" : "hover:bg-gray-50"}
      `}
    >
      {/* Title */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {title}
      </p>

      {/* Value */}
      <h2
        className={`text-2xl font-bold mt-2 tracking-tight
          ${isNegative
            ? "text-red-500"
            : isDark
              ? "text-white"
              : "text-gray-900"
          }`}
      >
        {formatCurrency(value)}
      </h2>
    </div>
  );
}