"use client";
import Sidebar from "@/components/common/sidebar/Sidebar";
import DashboardHeader from "@/components/main/layout/dashboardLayout/DashboardHeader";
import { ReactNode, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex w-full min-h-screen bg-culturedLight">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 ml-0 transition-all duration-300 ease-in-out w-full">
        <div className="w-full sticky top-0 z-50 bg-white">
          <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <div className="p-2 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
