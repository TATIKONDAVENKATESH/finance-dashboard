import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import {
  LayoutDashboard,
  ListOrdered,
  Lightbulb,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Transactions", icon: ListOrdered, path: "/transactions" },
    { name: "Insights", icon: Lightbulb, path: "/insights" },
  ];

  return (
    <div
      className={`w-64 h-screen p-5 hidden md:flex flex-col border-r
        ${isDark
          ? "bg-[#0f172a] text-white border-white/10"
          : "bg-white text-gray-800 border-gray-200"
        }`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        FinDash
      </h1>

      {/* Navigation */}
      <nav className="space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${isActive
                  ? "bg-indigo-500/20 text-indigo-500 dark:text-indigo-400"
                  : isDark
                    ? "text-gray-300 hover:bg-white/5"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500 dark:text-gray-400">
        2026 FinDash
      </div>
    </div>
  );
}