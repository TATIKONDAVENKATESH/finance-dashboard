export default function ConfirmModal({
    title = "Are you sure?",
    message = "This action cannot be undone.",
    onConfirm,
    onCancel,
}) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-[#0f172a] p-6 rounded-2xl w-80 text-white border border-white/10 shadow-xl">

                <h2 className="text-lg font-semibold mb-2">{title}</h2>

                <p className="text-gray-400 mb-4 text-sm">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-red-500 px-4 py-1.5 rounded hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
  }