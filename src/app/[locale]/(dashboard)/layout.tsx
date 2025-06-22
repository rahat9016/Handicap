import { DashboardSidebar } from "@/components/common/sidebar/DashboardSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-background text-primary content-center">
            <DashboardSidebar>{children}</DashboardSidebar>
        </section>
    );
}