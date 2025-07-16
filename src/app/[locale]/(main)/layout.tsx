import Footer from "@/components/main/layout/Footer";
import Header from "@/components/main/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background text-primary content-center">
      <Header />
      <div>
        {children}
        <Footer />
      </div>
    </section>
  );
}
