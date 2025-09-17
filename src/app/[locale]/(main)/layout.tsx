import Footer from "@/components/main/layout/Footer";
import Header from "@/components/main/layout/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  // const isDev = process.env.NODE_ENV === "development";
  return (
    <section className="bg-background text-primary content-center">
      {/* <AccessibilityControls /> */}
      <Header />
      <div>
        {children}
        <Footer />
      </div>
    </section>
  );
}
