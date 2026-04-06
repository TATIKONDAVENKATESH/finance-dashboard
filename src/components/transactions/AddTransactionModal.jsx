import { useState, useEffect } from "react";

export default function AddTransactionModal({ onAdd, onClose, existing }) {
  const initialForm = {
    date: "",
    amount: "",
    category: "",
    type: "expense",
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // ✅ Pre-fill safely (no mutation)
  useEffect(() => {
    if (existing) {
      setForm({
        date: existing.date || "",
        amount: existing.amount || "",
        category: existing.category || "",
        type: existing.type || "expense",
      });
    } else {
      setForm(initialForm); // ✅ reset when switching to add mode
    }
  }, [existing]);

  const handleSubmit = () => {
    // ✅ Validation
    if (!form.date || !form.amount || !form.category) {
      setError("All fields are required");
      return;
    }

    if (Number(form.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    // ✅ Submit clean data
    onAdd({
      ...form,
      id: existing ? existing.id : Date.now(),
      amount: Number(form.amount),
      category: form.category.trim(),
    });

    // ✅ Reset state
    setForm(initialForm);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-[#0f172a] p-6 rounded-2xl w-96 text-white border border-white/10 shadow-xl">

        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold">
          {existing ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        {/* Date */}
        <input
          type="date"
          value={form.date}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => {
            setForm({ ...form, date: e.target.value });
            setError("");
          }}
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => {
            setForm({ ...form, amount: e.target.value });
            setError("");
          }}
        />

        {/* Category */}
        <input
          placeholder="Category"
          value={form.category}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => {
            setForm({ ...form, category: e.target.value });
            setError("");
          }}
        />

        {/* Type */}
        <select
          value={form.type}
          className="w-full mb-4 p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setForm(initialForm); // ✅ reset on cancel
              setError("");
              onClose();
            }}
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