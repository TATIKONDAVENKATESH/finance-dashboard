import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { groupByMonth, categoryBreakdown } from "../../utils/chartUtils";

export default function Charts({ data }) {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const monthlyData = groupByMonth(data);
  const categoryData = categoryBreakdown(data);

  // 🎯 Theme-based colors
  const chartColors = {
    grid: isDark ? "#444" : "#E5E7EB",
    axis: isDark ? "#aaa" : "#374151",
    tooltipBg: isDark ? "#020617" : "#ffffff",
    tooltipText: isDark ? "#ffffff" : "#000000",
    cardBg: isDark ? "bg-white/10 border-white/10" : "bg-white border-gray-200",
    text: isDark ? "text-white" : "text-gray-800",
  };

  const COLORS = ["#6366F1", "#22C55E", "#EF4444", "#F59E0B"];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 🔹 Balance Trend */}
      <div className={`${chartColors.cardBg} p-4 rounded-2xl backdrop-blur border`}>
        <h2 className={`${chartColors.text} mb-3 font-medium`}>
          Balance Trend
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.grid}
              />
              <XAxis dataKey="month" stroke={chartColors.axis} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  border: "none",
                  color: chartColors.tooltipText,
                }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#6366F1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Income vs Expense */}
      <div className={`${chartColors.cardBg} p-4 rounded-2xl backdrop-blur border`}>
        <h2 className={`${chartColors.text} mb-3 font-medium`}>
          Income vs Expense
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.grid}
              />
              <XAxis dataKey="month" stroke={chartColors.axis} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  border: "none",
                  color: chartColors.tooltipText,
                }}
              />
              <Legend wrapperStyle={{ color: chartColors.text }} />
              <Bar dataKey="income" fill="#22C55E" />
              <Bar dataKey="expense" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Category Breakdown */}
      <div className={`${chartColors.cardBg} md:col-span-2 p-4 rounded-2xl backdrop-blur border`}>
        <h2 className={`${chartColors.text} mb-3 font-medium`}>
          Spending Breakdown
        </h2>

        <div className="w-full h-72 flex justify-center">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} dataKey="value" outerRadius={110}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  border: "none",
                  color: chartColors.tooltipText,
                }}
              />
              <Legend wrapperStyle={{ color: chartColors.text }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}