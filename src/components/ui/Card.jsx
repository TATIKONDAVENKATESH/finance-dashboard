export default function Card({
    children,
    className = "",
    title,
    actions,
    hover = false,
    padding = "p-4",
}) {
    return (
        <div
            className={`
          bg-white/10 backdrop-blur-lg border border-white/10 
          rounded-2xl shadow-lg 
          ${padding}
          ${hover ? "hover:bg-white/15 transition" : ""}
          ${className}
        `}
        >
            {/* Header */}
            {(title || actions) && (
                <div className="flex justify-between items-center mb-3">
                    {title && (
                        <h2 className="text-white font-semibold">{title}</h2>
                    )}
                    {actions && <div>{actions}</div>}
                </div>
            )}

            {/* Content */}
            <div>{children}</div>
        </div>
    );
  }