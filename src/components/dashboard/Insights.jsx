import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import {
  getHighestSpendingCategory,
  getMonthlyComparison,
} from "../../utils/calculateStats";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Insights({ data }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const highest = getHighestSpendingCategory(data);
  const monthly = getMonthlyComparison(data);

  return (
    <div
      className={`mt-6 p-4 rounded-2xl border backdrop-blur-lg
        ${isDark
          ? "bg-white/10 border-white/10 text-white"
          : "bg-white border-gray-200 text-gray-800"
        }`}
    >
      <h2 className="font-semibold mb-4">Insights</h2>

      {/* 🔹 Highest Spending */}
      {highest?.category ? (
        <p className="mb-2">
          Highest Spending:{" "}
          <span className="text-indigo-500 dark:text-indigo-400 font-medium">
            {highest.category}
          </span>{" "}
          ({formatCurrency(highest.amount)})
        </p>
      ) : (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          No expense data available
        </p>
      )}

      {/* 🔹 Monthly Comparison */}
      {monthly ? (
        <div className="mt-3 space-y-1">

          {/* Income */}
          <p>
            Income Change:{" "}
            <span
              className={
                monthly.incomeChange >= 0
                  ? "text-green-500 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              }
            >
              {monthly.incomeChange >= 0 ? "+" : ""}
              {formatCurrency(monthly.incomeChange)}
            </span>
          </p>

          {/* Expense */}
          <p>
            Expense Change:{" "}
            <span
              className={
                monthly.expenseChange >= 0
                  ? "text-red-500 dark:text-red-400"
                  : "text-green-500 dark:text-green-400"
              }
            >
              {monthly.expenseChange >= 0 ? "+" : ""}
              {formatCurrency(monthly.expenseChange)}
            </span>
          </p>

        </div>
      ) : (
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Not enough data for monthly comparison
        </p>
      )}
    </div>
  );
}