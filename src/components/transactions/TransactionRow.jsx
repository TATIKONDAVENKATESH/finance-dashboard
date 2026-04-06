import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionRow({ t, role, onDelete, onEdit }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const isIncome = t.type === "income";

    return (
        <tr
            className={`border-t transition
        ${isDark
                    ? "border-gray-700 hover:bg-white/5"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
        >
            {/* Date */}
            <td className="py-2 text-gray-800 dark:text-gray-300">
                {t.date}
            </td>

            {/* Category */}
            <td className="text-gray-800 dark:text-gray-300">
                {t.category}
            </td>

            {/* Amount */}
            <td
                className={`font-medium
          ${isIncome
                        ? "text-green-500 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
            >
                {formatCurrency(t.amount)}
            </td>

            {/* Type Badge */}
            <td>
                <span
                    className={`px-2 py-1 rounded text-xs font-medium
            ${isIncome
                            ? "bg-green-500/20 text-green-500 dark:text-green-400"
                            : "bg-red-500/20 text-red-500 dark:text-red-400"
                        }`}
                >
                    {t.type}
                </span>
            </td>

            {/* Actions */}
            {role && (
                <td className="space-x-3">
                    <button
                        onClick={() => onEdit(t)}
                        className="text-blue-600 dark:text-blue-300 hover:underline"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(t.id)}
                        className="text-red-500 dark:text-red-400 hover:underline"
                    >
                        Delete
                    </button>
                </td>
            )}
        </tr>
    );
}