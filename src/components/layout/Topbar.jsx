import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";

import { User, Shield } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Topbar() {
  const { theme } = useContext(ThemeContext);
  const { role, setRole } = useAppContext(); // ✅ FIXED

  const isDark = theme === "dark";
  const isAdmin = role === "admin";

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Role Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
            ${isAdmin
              ? "bg-green-500/20 text-green-500 dark:text-green-400"
              : isDark
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          {isAdmin ? <Shield size={16} /> : <User size={16} />}
          {role}
        </div>

        {/* Role Selector */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)} // ✅ now works
          className={`p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${isDark
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-gray-800 border-gray-300"
            }`}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

      </div>
    </div>
  );
}