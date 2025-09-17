import Sidebar from "@/components/common/sidebar/Sidebar";
import DashboardHeader from "@/components/main/layout/dashboardLayout/DashboardHeader";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-culturedLight w-full min-h-screen">
      <div className="">
        <Sidebar className="" />
      </div>
      <div className="ml-[300px] w-full lg:w-10/12 xl:w-10/12 2xl:w-full">
        <div className="w-full sticky top-0 bg-white z-50">
          <DashboardHeader />
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
