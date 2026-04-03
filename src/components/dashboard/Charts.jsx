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

import { groupByMonth, categoryBreakdown } from "../../utils/chartUtils";

export default function Charts({ data }) {
  const monthlyData = groupByMonth(data);
  const categoryData = categoryBreakdown(data);

  const COLORS = ["#6366F1", "#22C55E", "#EF4444", "#F59E0B"];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 🔹 Balance Trend */}
      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur border border-white/10">
        <h2 className="text-white mb-3 font-medium">Balance Trend</h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: "#020617" }} />
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
      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur border border-white/10">
        <h2 className="text-white mb-3 font-medium">Income vs Expense</h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: "#020617" }} />
              <Legend />
              <Bar dataKey="income" fill="#22C55E" />
              <Bar dataKey="expense" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Category Breakdown */}
      <div className="md:col-span-2 bg-white/10 p-4 rounded-2xl backdrop-blur border border-white/10">
        <h2 className="text-white mb-3 font-medium">Spending Breakdown</h2>

        <div className="w-full h-72 flex justify-center">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} dataKey="value" outerRadius={110}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#020617" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}