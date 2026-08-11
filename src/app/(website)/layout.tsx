import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

interface Props {
  children: React.ReactNode;
}

export default function WebsiteLayout({
  children,
}: Props) {
  return (
    <>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Components */}
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}