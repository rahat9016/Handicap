import { AccessibilityControls } from "@/components/common/accessibility/AccessibilityControls";
import Footer from "@/components/main/layout/Footer";
import Header from "@/components/main/layout/Header";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background text-primary content-center">
      <AccessibilityControls />
      <Header />
      <div className="mt-20 md:mt-24 lg:mt-40">
        <AnalyticsProvider>{children}</AnalyticsProvider>
        <Footer />
      </div>
    </section>
  );
}
