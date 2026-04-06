import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ConfirmModal({
    title = "Are you sure?",
    message = "This action cannot be undone.",
    onConfirm,
    onCancel,
}) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onCancel}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-80 p-6 rounded-2xl shadow-xl border
          ${isDark
                        ? "bg-[#0f172a] border-white/10 text-white"
                        : "bg-white border-gray-200 text-gray-800"
                    }`}
            >
                {/* Title */}
                <h2 className="text-lg font-semibold mb-2">
                    {title}
                </h2>

                {/* Message */}
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-red-500 px-4 py-1.5 rounded text-white hover:bg-red-600 transition shadow"
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
}