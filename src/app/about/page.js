"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About RecipeApp</h1>

      <div className="max-w-3xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
        <p className="text-lg">
          Welcome to{" "}
          <span className="font-semibold text-red-500">RecipeApp</span> - your
          go-to place for discovering delicious recipes from around the world!
        </p>
        <p>
          Whether you're a seasoned chef or just starting out in the kitchen,
          our app helps you explore a wide variety of dishes, filter by cuisine,
          save your favorites, and even rate the recipes you try.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">✨ Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Browse hundreds of recipes with beautiful images</li>
          <li>Search by name or ingredient</li>
          <li>Filter by cuisine (Italian, Asian, Mexican, and more)</li>
          <li>Save recipes to your personal favorites list</li>
          <li>Rate recipes – your ratings are stored locally</li>
          <li>Dark mode support for comfortable viewing</li>
          <li>Fully responsive – works on desktop, tablet, and mobile</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          About the Developer
        </h2>
        <p>
          This app was built as a learning project to explore Next.js, React
          hooks, and Tailwind css. It demonstrates dynamic routing, client-side
          data fetching, localStorage persistance, and a smooth user experience.
        </p>
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 tracking-wider">
          Built with ❤️ using Next.js 14, Tailwind css, and the free{" "}
          <a
            href="https://dummyjson.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:underline"
          >
            DummyJSON
          </a>
          API.
        </p>
      </div>
    </div>
  );
}
