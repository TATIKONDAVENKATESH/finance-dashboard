import { useState, useMemo, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import TransactionRow from "./TransactionRow";
import { exportToCSV } from "../../utils/exportCSV";

export default function TransactionTable({
  data,
  role,
  onAddClick,
  onDelete,
  onEdit,
}) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Normalize role (handles "Admin", "ADMIN", undefined, etc.)
  const isAdmin =
    typeof role === "string"
      ? role.toLowerCase() === "admin"
      : !!role;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

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
    <div
      className={`mt-6 p-4 rounded-2xl border backdrop-blur-lg
        ${isDark
          ? "bg-white/10 border-white/10"
          : "bg-white border-gray-200"
        }`}
    >
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">

        {/* Search */}
        <input
          className={`p-2 rounded outline-none focus:ring-2 focus:ring-indigo-500
            ${isDark
              ? "bg-gray-800 text-white border border-gray-700"
              : "bg-white text-gray-800 border border-gray-300"
            }`}
          placeholder="Search by category..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <div className="flex gap-2 flex-wrap">

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`p-2 rounded border
              ${isDark
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-800 border-gray-300"
              }`}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high">Amount High</option>
            <option value="low">Amount Low</option>
          </select>

          {/* Export */}
          <button
            onClick={() => exportToCSV(filtered)}
            className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition shadow"
          >
            Export CSV
          </button>

          {/* Add Button */}
          {isAdmin && (
            <button
              onClick={onAddClick}
              className="bg-indigo-500 px-4 py-2 rounded text-white hover:bg-indigo-600 transition shadow"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className={`w-full text-sm ${isDark ? "text-white" : "text-gray-800"
            }`}
        >
          <thead>
            <tr
              className={`text-left border-b
                ${isDark
                  ? "text-gray-200 border-gray-700"
                  : "text-gray-800 border-gray-200"
                }`}
            >
              <th className="pb-2">Date</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Type</th>
              {isAdmin && <th className="pb-2">Action</th>}
            </tr>
          </thead>

          <tbody
            className={
              isDark
                ? "divide-y divide-gray-700"
                : "divide-y divide-gray-200"
            }
          >
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="text-center py-8 text-gray-800 dark:text-gray-400"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <TransactionRow
                  key={t.id}
                  t={t}
                  role={isAdmin}
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