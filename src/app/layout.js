import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Outfit } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "react-hot-toast";

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
        <AuthProvider>
          <Header />
          <main className="min-h-screen container mx-auto px-4 py-8">
            {children}
          </main>
        </AuthProvider>
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
