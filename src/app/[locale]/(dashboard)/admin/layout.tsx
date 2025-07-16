import Sidebar from "@/components/common/sidebar/Sidebar";
import DashboardHeader from "@/components/main/layout/dashboardLayout/DashboardHeader";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-culturedLight w-full min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="ml-[300px] w-full">
        <div className="w-full">
          <DashboardHeader />
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
