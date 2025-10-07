import UserDashboardHeader from "@/components/UserDashboard/Layout/UserDashboardHeader";
import UserDashboardSidebar from "@/components/UserDashboard/UserDashboard/UserDashboardSidebar";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <UserDashboardSidebar />
      <main className="flex-1 overflow-auto">
        <UserDashboardHeader />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
