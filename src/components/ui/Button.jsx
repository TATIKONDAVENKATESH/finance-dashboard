export default function Button({
    children,
    onClick,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
}) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500";

    const variants = {
        primary: "bg-indigo-500 text-white hover:bg-indigo-600",
        secondary: "bg-gray-700 text-white hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        ghost: "bg-transparent text-gray-300 hover:bg-white/10",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-5 py-3 text-lg",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
          ${base}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
          ${className}
        `}
        >
            {loading ? "Loading..." : (
                <>
                    {icon && <span className="flex items-center">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
  }