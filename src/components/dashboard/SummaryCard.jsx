import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SummaryCard({ title, value }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const isNegative = value < 0;

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg transition
        ${isDark
          ? "bg-white/10 border-white/10 hover:bg-white/15 text-white"
          : "bg-white border-gray-200 hover:bg-gray-50 text-gray-800"
        }
        border backdrop-blur-lg`}
    >
      {/* Title */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      {/* Value */}
      <h2
        className={`text-2xl font-bold mt-2 tracking-tight
          ${isNegative
            ? "text-red-500 dark:text-red-400"
            : "text-gray-900 dark:text-white"
          }`}
      >
        {formatCurrency(value)}
      </h2>
    </div>
  );
}