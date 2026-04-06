import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
import { User, Shield } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Topbar() {
  const { theme } = useContext(ThemeContext);
  const { role, setRole } = useAppContext();
  const location = useLocation();

  const isDark = theme === "dark";
  const isAdmin = role === "admin";

  const path = location.pathname.split("/")[1];

  const routeTitles = {
    "": "Dashboard",
    "transactions": "Transactions",
    "insights": "Insights",
  };

  const title = routeTitles[path] || "Dashboard";

  return (
    <div
      className={`flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6
        px-4 py-3 rounded-xl border
        ${isDark
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
        }
      `}
    >
      {/* Title */}
      <h1
        className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"
          }`}
      >
        {title}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        <ThemeToggle />

        {/* Role Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border
            ${isAdmin
              ? isDark
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-green-100 text-green-700 border-green-200"
              : isDark
                ? "bg-gray-700 text-gray-300 border-gray-600"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }
          `}
        >
          {isAdmin ? <Shield size={16} /> : <User size={16} />}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </div>

        {/* Role Selector */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`p-2 rounded-lg border transition
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${isDark
              ? "bg-gray-800 text-white border-gray-700 hover:border-gray-500"
              : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
            }
          `}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

      </div>
    </div>
  );
}