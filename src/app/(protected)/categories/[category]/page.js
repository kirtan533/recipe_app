"use client";

import RecipeGrid from "@/components/recipes/RecipeGrid";
import RecipeSkeletonGrid from "@/components/Ui/RecipeSkeletonGrid";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/recipes?limit=100`);
        if (!res.ok) throw new Error(`Failed to Fetch!`);
        const data = await res.json();

        const filtered = data.recipes.filter(
          (recipe) => recipe.cuisine.toLowerCase() === category.toLowerCase(),
        );
        setRecipes(filtered);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipesByCategory();
  }, [category]);

  if (loading) return <RecipeSkeletonGrid />;
  if (error)
    return <div className="text-center text-red-500">Error : {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/categories"
        className="text-red-500 hover:underline mb-4 inline-block "
      >
        ← Back to Categories
      </Link>
      <h1 className="text-3xl font-bold mb-8">{category} Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <RecipeGrid
          recipes={recipes}
          from={`categories/${encodeURIComponent(category)}`}
        />
      )}
    </div>
  );
}
