import { useState, useMemo } from "react";
import TransactionRow from "./TransactionRow";
import { exportToCSV } from "../../utils/exportCSV";

export default function TransactionTable({
  data,
  role,
  onAddClick,
  onDelete,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  // ✅ Filter + Sort (memoized & non-mutating)
  const filtered = useMemo(() => {
    return [...data]
      .filter((t) =>
        t.category?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "latest") return new Date(b.date) - new Date(a.date);
        if (sort === "oldest") return new Date(a.date) - new Date(b.date);
        if (sort === "high") return b.amount - a.amount;
        if (sort === "low") return a.amount - b.amount;
        return 0;
      });
  }, [data, search, sort]);

  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/10 mt-6">

      {/* 🔹 Top Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <input
          className="p-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search by category..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <div className="flex gap-2">

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high">Amount High</option>
            <option value="low">Amount Low</option>
          </select>

          <button
            onClick={() => exportToCSV(filtered)} // ✅ export visible data
            className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition"
          >
            Export CSV
          </button>

          {role === "admin" && (
            <button
              onClick={onAddClick}
              className="bg-indigo-500 px-4 py-2 rounded text-white hover:bg-indigo-600 transition"
            >
              + Add Transaction
            </button>
          )}

        </div>
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-white text-sm">

          <thead>
            <tr className="text-gray-400 text-left border-b border-gray-700">
              <th className="pb-2">Date</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Type</th>
              {role === "admin" && <th className="pb-2">Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4} // ✅ dynamic columns
                  className="text-center py-6 text-gray-400"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <TransactionRow
                  key={t.id}
                  t={t}
                  role={role}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}