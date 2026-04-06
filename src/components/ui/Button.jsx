import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

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
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const base =
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500";

    const variants = {
        primary: "bg-indigo-500 text-white hover:bg-indigo-600 shadow",

        secondary: isDark
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200",

        danger: "bg-red-500 text-white hover:bg-red-600 shadow",

        ghost: isDark
            ? "bg-transparent text-gray-300 hover:bg-white/10"
            : "bg-transparent text-gray-700 hover:bg-gray-100",
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
        ${disabled || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-[1.02] active:scale-[0.98]"
                }
        ${className}
      `}
        >
            {loading ? (
                <span className="animate-pulse">Loading...</span>
            ) : (
                <>
                    {icon && <span className="flex items-center">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
}