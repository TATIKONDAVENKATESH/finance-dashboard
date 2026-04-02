import { LineChart, Line, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Charts({ data }) {
  const income = data.filter(d => d.type === "income")
                     .reduce((a, b) => a + b.amount, 0);

  const expense = data.filter(d => d.type === "expense")
                      .reduce((a, b) => a + b.amount, 0);

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      
      <LineChart width={300} height={200} data={data}>
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        <Tooltip />
      </LineChart>

      <PieChart width={300} height={200}>
        <Pie data={pieData} dataKey="value">
          <Cell fill="#82ca9d" />
          <Cell fill="#ff7f7f" />
        </Pie>
        <Tooltip />
      </PieChart>

    </div>
  );
}