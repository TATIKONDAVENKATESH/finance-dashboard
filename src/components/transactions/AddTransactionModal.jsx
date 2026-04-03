import { useState, useEffect } from "react";

export default function AddTransactionModal({ onAdd, onClose, existing }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // ✅ Pre-fill when editing
  useEffect(() => {
    if (existing) {
      setForm(existing);
    }
  }, [existing]);

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) return;

    onAdd({
      ...form,
      id: existing ? existing.id : Date.now(),
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-[#0f172a] p-6 rounded-2xl w-96 text-white border border-white/10 shadow-xl">

        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold">
          {existing ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Date */}
        <input
          type="date"
          value={form.date}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {/* Category */}
        <input
          placeholder="Category"
          value={form.category}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        {/* Type */}
        <select
          value={form.type}
          className="w-full mb-4 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-500 px-4 py-1.5 rounded hover:bg-indigo-600 transition"
          >
            {existing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}