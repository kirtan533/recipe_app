"use client";

import RecipeGrid from "@/components/recipes/RecipeGrid";
import Button from "@/components/Ui/Button";
import RecipeSkeletonGrid from "@/components/Ui/RecipeSkeletonGrid";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchFeaturedRecipes();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const fetchFeaturedRecipes = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/recipes?limit=6`);
      const data = await res.json();
      setFeaturedRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      console.log(`Error fetching recipes :`, error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-12 mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to RecipeApp</h1>
        <p className="text-xl mb-8">
          Discover delicious recipes from around the world.
        </p>
        <Link href="/recipes">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-red-500 cursor-pointer"
          >
            Explore Recipes
          </Button>
        </Link>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-6">Featured Recipes</h2>
        {loading ? (
          <RecipeSkeletonGrid />
        ) : (
          <RecipeGrid recipes={featuredRecipes} />
        )}
      </div>
      <div className="text-center mt-12">
        <Link href="/recipes">
          <Button
            variant="primary"
            className="px-8 py-3 text-lg cursor-pointer"
          >
            View All Recipes
          </Button>
        </Link>
      </div>
    </div>
  );
}
