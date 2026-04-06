import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Badge({
    children,
    variant = "default",
    size = "sm",
}) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const variants = {
        default: isDark
            ? "bg-gray-700 text-gray-200"
            : "bg-gray-100 text-gray-700",

        success: "bg-green-500/20 text-green-500 dark:text-green-400",

        danger: "bg-red-500/20 text-red-500 dark:text-red-400",

        info: "bg-indigo-500/20 text-indigo-500 dark:text-indigo-400",

        outline: isDark
            ? "border border-gray-600 text-gray-300"
            : "border border-gray-300 text-gray-700",
    };

    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span
            className={`inline-flex items-center rounded-md font-medium transition
        ${variants[variant] || variants.default}
        ${sizes[size]}`}
        >
            {children}
        </span>
    );
}