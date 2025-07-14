import Sidebar from "@/components/common/sidebar/Sidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
