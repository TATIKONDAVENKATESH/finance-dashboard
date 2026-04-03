export default function Badge({
    children,
    variant = "default",
    size = "sm",
}) {
    const variants = {
        default: "bg-gray-700 text-gray-200",
        success: "bg-green-500/20 text-green-400",
        danger: "bg-red-500/20 text-red-400",
        info: "bg-indigo-500/20 text-indigo-400",
        outline: "border border-gray-500 text-gray-300",
    };

    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span
            className={`inline-flex items-center rounded-md font-medium ${variants[variant] || variants.default
                } ${sizes[size]}`}
        >
            {children}
        </span>
    );
  }