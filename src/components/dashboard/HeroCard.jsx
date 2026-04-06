import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function HeroCard({ balance }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const isNegative = balance < 0;

  return (
    <div
      className={`md:col-span-2 p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]
        ${isDark
          ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white"
          : "bg-linear-to-r from-indigo-400 to-purple-500 text-white"
        }`}
    >
      {/* Label */}
      <p className="text-sm opacity-80">Total Balance</p>

      {/* Value */}
      <h1
        className={`text-4xl font-bold mt-2 tracking-tight
          ${isNegative
            ? "text-red-200"
            : "text-white"
          }`}
      >
        {formatCurrency(balance)}
      </h1>
    </div>
  );
}