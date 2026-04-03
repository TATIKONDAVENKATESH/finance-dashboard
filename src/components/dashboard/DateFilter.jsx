export default function DateFilter({ range, setRange }) {
    const options = [
        { label: "All", value: "all" },
        { label: "30 Days", value: "30" },
        { label: "90 Days", value: "90" },
    ];

    return (
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-fit">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => setRange(opt.value)}
                    className={`px-4 py-1 rounded-lg text-sm transition ${range === opt.value
                            ? "bg-indigo-500 text-white"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
  }