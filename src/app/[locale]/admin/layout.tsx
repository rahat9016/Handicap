"use client";
import Sidebar from "@/components/common/sidebar/Sidebar";
import DashboardHeader from "@/components/main/layout/dashboardLayout/DashboardHeader";
import { ReactNode, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-culturedLight">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-0 min-w-0 w-full">
        <div className="w-full sticky top-0 z-30 bg-white">
          <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <div className="p-3 sm:p-4 lg:p-6 w-full overflow-y-auto h-screen scrollbar-hide">
          <div className="w-full max-w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
