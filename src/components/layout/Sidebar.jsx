import {
  LayoutDashboard,
  ListOrdered,
  Lightbulb,
} from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Transactions", icon: ListOrdered },
    { name: "Insights", icon: Lightbulb },
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
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${item.active
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "hover:bg-white/5 text-gray-300"
                }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </div>
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