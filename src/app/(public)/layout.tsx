import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CallToAction from "@/components/home/CallToAction";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      {/* CTA & Footer hanya muncul di Public Layout */}
      <CallToAction />
      <Footer />
    </div>
  );
}