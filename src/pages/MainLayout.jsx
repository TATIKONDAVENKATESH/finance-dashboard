import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex bg-white dark:bg-[#020617] min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6">
                <Topbar />
                <Outlet />
            </div>
        </div>
    );
}