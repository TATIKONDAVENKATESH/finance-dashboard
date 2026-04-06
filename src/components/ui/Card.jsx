import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Card({
    children,
    className = "",
    title,
    actions,
    hover = false,
    padding = "p-4",
}) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <div
            className={`
        rounded-2xl shadow-lg border backdrop-blur-lg
        ${padding}
        ${isDark
                    ? "bg-white/10 border-white/10"
                    : "bg-white border-gray-200"
                }
        ${hover
                    ? isDark
                        ? "hover:bg-white/15 transition"
                        : "hover:bg-gray-50 transition"
                    : ""
                }
        ${className}
      `}
        >
            {/* Header */}
            {(title || actions) && (
                <div className="flex justify-between items-center mb-3">
                    {title && (
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    )}
                    {actions && <div>{actions}</div>}
                </div>
            )}

            {/* Content */}
            <div>{children}</div>
        </div>
    );
}