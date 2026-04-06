import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-15xl mx-auto space-y-6">
                    <Topbar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}