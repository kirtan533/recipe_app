import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Outfit } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";

export const metadata = {
  title: "RecipeApp - Delicious Recipes",
  description: "Find and share amazing recipes",
};

const outFit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${outFit.className}`}>
        <QueryProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </QueryProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
