import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function AddTransactionModal({ onAdd, onClose, existing }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const initialForm = {
    date: "",
    amount: "",
    category: "",
    type: "expense",
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setForm({
        date: existing.date || "",
        amount: existing.amount || "",
        category: existing.category || "",
        type: existing.type || "expense",
      });
    } else {
      setForm(initialForm);
    }
  }, [existing]);

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) {
      setError("All fields are required");
      return;
    }

    if (Number(form.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    onAdd({
      ...form,
      id: existing ? existing.id : Date.now(),
      amount: Number(form.amount),
      category: form.category.trim(),
    });

    setForm(initialForm);
    setError("");
    onClose();
  };

  const inputStyle = `w-full mb-3 p-2 rounded outline-none focus:ring-2 focus:ring-indigo-500 ${isDark
      ? "bg-gray-800 text-white border border-gray-700"
      : "bg-white text-gray-800 border border-gray-300"
    }`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div
        className={`w-96 p-6 rounded-2xl shadow-xl border
          ${isDark
            ? "bg-[#0f172a] border-white/10 text-white"
            : "bg-white border-gray-200 text-gray-800"
          }`}
      >
        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold">
          {existing ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Error */}
        {error && (
          <p className="text-sm mb-3 text-red-500 dark:text-red-400">
            {error}
          </p>
        )}

        {/* Date */}
        <input
          type="date"
          value={form.date}
          className={inputStyle}
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
          className={inputStyle}
          onChange={(e) => {
            setForm({ ...form, amount: e.target.value });
            setError("");
          }}
        />

        {/* Category */}
        <input
          placeholder="Category"
          value={form.category}
          className={inputStyle}
          onChange={(e) => {
            setForm({ ...form, category: e.target.value });
            setError("");
          }}
        />

        {/* Type */}
        <select
          value={form.type}
          className={`${inputStyle} mb-4`}
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
              setForm(initialForm);
              setError("");
              onClose();
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-500 px-4 py-1.5 rounded text-white hover:bg-indigo-600 transition shadow"
          >
            {existing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}