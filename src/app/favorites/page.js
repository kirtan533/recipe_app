"use client";

import RecipeGrid from "@/components/recipes/RecipeGrid";
import RecipeCardSkeleton from "@/components/Ui/RecipeCardSkeleton";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FavoritePage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const getFavoriteFromStorage = () => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (allRecipes.length > 0) {
      loadFavorites();
    } else {
      const favorites = getFavoriteFromStorage();
      setFavoriteRecipes([]);
      setLoading(false);
    }
  }, [allRecipes]);

  useEffect(() => {
    const handleFavoritesUpdate = () => {
      if (allRecipes.length > 0) {
        loadFavorites();
      }
    };
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    return () =>
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
  }, [allRecipes]);

  const fetchAllRecipes = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/recipes?limit=50`);
      const data = await res.json();
      setAllRecipes(data.recipes || []);
    } catch (error) {
      console.log(`Error fetching recipes:`, error);
      setAllRecipes([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      if (allRecipes.length > 0) {
        loadFavorites();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [allRecipes]);

  const loadFavorites = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const filtered = allRecipes.filter((recipe) =>
        favorites.includes(recipe.id),
      );
      setFavoriteRecipes(filtered);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavoriteRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <RecipeCardSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorite Recipes ❤️</h1>
      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            No favorite recipes yet!
          </p>
          <p className="dark:text-gray-300">
            Start adding recipes to your favorites by clicking the ❤️ button on
            any recipe!
          </p>
          <Link
            href="/recipes"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition mt-4"
          >
            Browse Recipes →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You have {favoriteRecipes.length} saved
            {favoriteRecipes.length === 1 ? "recipe" : "recipes"}
          </p>
          <RecipeGrid recipes={favoriteRecipes} />
        </>
      )}
    </div>
  );
}
