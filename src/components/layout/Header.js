"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import DarkModeToggle from "../Ui/DarkModeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const pathName = usePathname();
  const router = useRouter();

  const navLink = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "About", href: "/about" },
    { name: "Categories", href: "/categories" },
  ];

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    checkUser();
    window.addEventListener("userChanged", checkUser);
    return () => window.removeEventListener("userChanged", checkUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    setUser(null);
    setIsMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-start items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-red-500 dark:text-red-400 mr-5"
          >
            <span className="flex items-center">
              <GoSearch size={25} className="mr-4" />
              RecipeApp
            </span>
          </Link>
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex space-x-8 items-center">
              {navLink.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition ${
                    pathName === link.href
                      ? "text-red-500 dark:text-red-400 font-bold"
                      : "text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/favorites"
                className={`transition ${
                  pathName === "/favorites"
                    ? "text-red-500 dark:text-red-400 font-bold"
                    : "text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                }`}
              >
                ❤️ Favorites
              </Link>
              <DarkModeToggle />
            </div>
            <div className="ml-auto flex items-center gap-3">
              {user ? (
                <>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <button
                    onClick={logout}
                    className="bg-white text-black px-4 py-2 rounded cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="bg-white text-black px-4 py-2 rounded cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
          <button
            className="md:hidden text-2xl text-gray-600 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navLink.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 ${
                  pathName === link.href
                    ? "text-red-500 dark:text-red-400 font-bold"
                    : "text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/favorites"
              className={`block py-2 ${
                pathName === "/favorites"
                  ? "text-red-500 dark:text-red-400 font-bold"
                  : "text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              ❤️ Favorites
            </Link>
            <div className="py-2">
              <DarkModeToggle />
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            {user ? (
              <div className="pt-2 space-y-2">
                <p className="text-sm text-gray-400 truncate">{user.email}</p>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white text-black py-2 rounded cursor-pointer font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-white text-black py-2 rounded cursor-pointer font-medium">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
