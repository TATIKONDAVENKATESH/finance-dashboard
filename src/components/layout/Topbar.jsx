import { User, Shield } from "lucide-react";

export default function Topbar({ role, setRole }) {
  const isAdmin = role === "admin";

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-white">
        Dashboard
      </h1>

      {/* Controls */}
      <div className="flex items-center gap-3">

        {/* Role Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${isAdmin
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-700 text-gray-300"
            }`}
        >
          {isAdmin ? <Shield size={16} /> : <User size={16} />}
          {role}
        </div>

        {/* Role Selector */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

      </div>
    </div>
  );
}