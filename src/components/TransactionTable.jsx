import { useState } from "react";

export default function TransactionTable({ data, role }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter(t =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-4">
      <div className="flex justify-between mb-2">
        <input
          placeholder="Search..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        {role === "admin" && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        )}
      </div>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id} className="border-t">
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}