import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import {
  getHighestSpendingCategory,
  getAllMonthlyComparisons,
  getMonthlyHighestSpending,
} from "../../utils/calculateStats";

import { formatCurrency } from "../../utils/formatCurrency";

export default function Insights({ data }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const highest = getHighestSpendingCategory(data);
  const monthlyData = getAllMonthlyComparisons(data);
  const monthlyHighest = getMonthlyHighestSpending(data);

  return (
    <div
      className={`mt-6 p-4 rounded-2xl border backdrop-blur-lg
        ${isDark
          ? "bg-white/10 border-white/10 text-white"
          : "bg-white border-gray-200 text-gray-800"
        }`}
    >
      <h2 className="font-semibold mb-4">Insights</h2>

      {/* Highest Spending */}
      {highest?.category ? (
        <p className="mb-4">
          Overall Highest Spending:{" "}
          <span className="text-indigo-500 dark:text-indigo-400 font-medium">
            {highest.category}
          </span>{" "}
          ({formatCurrency(highest.amount)})
        </p>
      ) : (
        <p className="mb-4 text-gray-500 dark:text-gray-400">
          No expense data available
        </p>
      )}

      {/* Monthly Table */}
      <h3 className="font-medium mb-2">Monthly Comparison</h3>

      {monthlyData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 text-left">Month</th>
                <th className="text-left">Income</th>
                <th className="text-left">Expense</th>
                <th className="text-left">Top Spend</th>
              </tr>
            </thead>

            <tbody>
              {monthlyData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  {/* Month */}
                  <td className="py-2">
                    {new Date(item.month + "-01").toLocaleString("default", {
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Income */}
                  <td
                    className={
                      item.incomeChange >= 0
                        ? "text-green-500 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }
                  >
                    {item.incomeChange >= 0 ? "+" : ""}
                    {formatCurrency(item.incomeChange)}
                  </td>

                  {/* Expense */}
                  <td
                    className={
                      item.expenseChange >= 0
                        ? "text-red-500 dark:text-red-400"
                        : "text-green-500 dark:text-green-400"
                    }
                  >
                    {item.expenseChange >= 0 ? "+" : ""}
                    {formatCurrency(item.expenseChange)}
                  </td>

                  <td>
                    {monthlyHighest[item.month]?.category ? (
                      <span className="text-indigo-500 dark:text-indigo-400">
                        {monthlyHighest[item.month].category} (
                        {formatCurrency(monthlyHighest[item.month].amount)})
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          Not enough data for monthly comparison
        </p>
      )}
    </div>
  );
}