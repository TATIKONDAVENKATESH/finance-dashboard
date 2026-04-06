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
        rounded-2xl border transition-all duration-200
        ${padding}
        
        ${isDark
                    ? "bg-white/10 border-white/10 text-gray-100 shadow-lg backdrop-blur-lg"
                    : "bg-white border-gray-200 text-gray-900 shadow-sm"
                }

        ${hover
                    ? isDark
                        ? "hover:bg-white/15"
                        : "hover:bg-gray-50"
                    : ""
                }

        ${className}
      `}
        >
            {/* Header */}
            {(title || actions) && (
                <div className="flex justify-between items-center mb-3">
                    {title && (
                        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
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