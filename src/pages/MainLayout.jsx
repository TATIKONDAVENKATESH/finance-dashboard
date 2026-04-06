import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <div
            className={`flex min-h-screen transition-colors duration-300
                ${isDark ? "bg-gray-900" : "bg-gray-50"}
            `}
        >
            <Sidebar />

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-17xl mx-auto space-y-6">
                    <Topbar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}