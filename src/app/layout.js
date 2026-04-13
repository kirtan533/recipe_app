"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideFooter = pathname === "/login";

  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-8">
          {children}
        </main>
        {!hideFooter && <Footer />}
      </body>
    </html>
  );
}
