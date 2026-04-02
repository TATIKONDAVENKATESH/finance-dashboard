import { useState } from "react";
import { transactionsData } from "./data/mockData";
import SummaryCard from "./components/SummaryCard";
import Charts from "./components/Charts";
import TransactionTable from "./components/TransactionTable";
import Insights from "./components/Insights";

function App() {
  const [role, setRole] = useState("viewer");

  const income = transactionsData
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactionsData
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <Charts data={transactionsData} />

      <TransactionTable data={transactionsData} role={role} />

      <Insights data={transactionsData} />

    </div>
  )
}

export default App
