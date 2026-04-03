import {
  getHighestSpendingCategory,
  getMonthlyComparison,
} from "../../utils/calculateStats";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Insights({ data }) {
  const highest = getHighestSpendingCategory(data);
  const monthly = getMonthlyComparison(data);

  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/10 mt-6 text-white">
      <h2 className="font-semibold mb-4">Insights</h2>

      {/* 🔹 Highest Spending */}
      {highest?.category ? (
        <p className="mb-2">
          Highest Spending:{" "}
          <span className="text-indigo-400 font-medium">
            {highest.category}
          </span>{" "}
          ({formatCurrency(highest.amount)})
        </p>
      ) : (
        <p className="text-gray-400 mb-2">No expense data available</p>
      )}

      {/* 🔹 Monthly Comparison */}
      {monthly ? (
        <div className="mt-3 space-y-1">
          <p>
            Income Change:{" "}
            <span
              className={
                monthly.incomeChange >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {monthly.incomeChange >= 0 ? "+" : ""}
              {formatCurrency(monthly.incomeChange)}
            </span>
          </p>

          <p>
            Expense Change:{" "}
            <span
              className={
                monthly.expenseChange >= 0
                  ? "text-red-400"
                  : "text-green-400"
              }
            >
              {monthly.expenseChange >= 0 ? "+" : ""}
              {formatCurrency(monthly.expenseChange)}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-gray-400 mt-2">
          Not enough data for monthly comparison
        </p>
      )}
    </div>
  );
}