import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionRow({ t, role, onDelete, onEdit }) {
    return (
        <tr className="border-t border-gray-700 hover:bg-white/5 transition">

            {/* Date */}
            <td className="py-2">{t.date}</td>

            {/* Category */}
            <td className="text-gray-300">{t.category}</td>

            {/* Amount */}
            <td
                className={
                    t.type === "income"
                        ? "text-green-400 font-medium"
                        : "text-red-400 font-medium"
                }
            >
                {formatCurrency(t.amount)}
            </td>

            {/* Type Badge */}
            <td>
                <span
                    className={`px-2 py-1 rounded text-xs ${t.type === "income"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                >
                    {t.type}
                </span>
            </td>

            {/* Actions */}
            {role === "admin" && (
                <td className="space-x-3">
                    <button
                        onClick={() => onEdit(t)}
                        className="text-blue-400 hover:text-blue-300 transition"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(t.id)}
                        className="text-red-400 hover:text-red-300 transition"
                    >
                        Delete
                    </button>
                </td>
            )}
        </tr>
    );
}