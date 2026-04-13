"use client";
export const dynamic = "force-dynamic";

import Button from "@/components/Ui/Button";
import Image from "next/image";
import LoadingSpinner from "@/components/Ui/LoadingSpinner";
import { TfiTimer } from "react-icons/tfi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Rating from "@/components/recipes/Rating";
import FavoriteButton from "@/components/recipes/FavoriteButton";

export default function SingleRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decodedFrom, setDecodedFrom] = useState(null);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");

    setDecodedFrom(from ? decodeURIComponent(from) : null);
  }, []);

  let backHref = "/recipes";
  let backText = "← Back to Recipes";

  if (decodedFrom === "recipes") {
    backHref = "/recipes";
    backText = "← Back to All Recipes";
  } else if (decodedFrom && decodedFrom.startsWith("categories/")) {
    const category = decodedFrom.split("/").pop();
    backHref = `/${decodedFrom}`;
    backText = `← Back to ${category} Recipes`;
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/recipes/${id}`);
      if (!res.ok) {
        throw new Error(`Recipe not found!`);
      }
      const data = await res.json();
      setRecipe(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Link href="/recipes">
          <Button variant="primary" className="mt-4">
            Back To Recipes
          </Button>
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={backHref} className="text-red-500 hover:underline">
          {backText}
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.name}
          height={400}
          width={400}
          quality={75}
          priority={false}
          className="object-cover w-full h-96"
        />
        <div className="p-8">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
            <span className="ml-3 mb-1">
              <FavoriteButton recipeId={recipe.id} />
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-6 text-gray-600 dark:text-gray-300">
            <span className="flex items-center">
              <TfiTimer className="mr-2" /> Prep: {recipe.prepTimeMinutes} mins
            </span>
            <span className="flex items-center">
              <TfiTimer className="mr-2" /> Cook: {recipe.cookTimeMinutes} mins
            </span>
            <span>📊 Difficulty: {recipe.difficulty}</span>
            <span>⭐ Rating: {recipe.rating}/5</span>
            <span>👥 Servings: {recipe.servings}</span>
          </div>

          <div className="mb-6">
            <Rating recipeId={recipe.id} />
          </div>
          <div className="mb-6">
            <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-full mr-2">
              {recipe.cuisine}
            </span>
            {recipe.mealType?.map((type, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full mr-2"
              >
                {type}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions?.map((step, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
