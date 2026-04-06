import {
  LayoutDashboard,
  ListOrdered,
  Lightbulb,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Transactions", icon: ListOrdered, path: "/transactions" },
    { name: "Insights", icon: Lightbulb, path: "/insights" },
  ];

  return (
    <div className="w-64 h-screen bg-[#0f172a] text-white p-5 hidden md:flex flex-col border-r border-white/10">

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
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "hover:bg-white/5 text-gray-300"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500">
        © 2026 FinDash
      </div>
    </div>
  );
}