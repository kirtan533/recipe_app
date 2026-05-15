"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import FilterBar from "@/components/forms/FilterBar";
import SeachBar from "@/components/forms/SearchBar";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import RecipeSkeletonGrid from "@/components/Ui/RecipeSkeletonGrid";
import { fetchRecipes } from "@/libs/fetchRecipes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const cuisineFilter = searchParams.get("cuisine") || "";

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    staleTime: 1000 * 60 * 5,
  });

  const recipes = data?.recipes || [];

  const filteredRecipes = useMemo(() => {
    let filtered = [...recipes];

    if (localSearch) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          recipe.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(localSearch.toLowerCase()),
          ),
      );
    }

    if (cuisineFilter) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.cuisine?.toLowerCase() === cuisineFilter.toLowerCase(),
      );
    }
    return filtered;
  }, [recipes, localSearch, cuisineFilter]);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setLoadingMore(false);
    }, 500);
  };

  if (isLoading) {
    return <RecipeSkeletonGrid />;
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          {error.message || "something went wrong!"}
        </p>
        <button
          onClick={fetchRecipes}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Try again!
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-8">All Recipes</h1>
        <div className="mb-6">
          <SeachBar
            initialSearch={localSearch}
            onSearchChange={setLocalSearch}
          />
        </div>

        <FilterBar currentCuisine={cuisineFilter} />

        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Found {filteredRecipes.length} recipes
          {searchQuery && ` matching "${searchQuery}"`}
          {cuisineFilter && ` in ${cuisineFilter} cuisine`}
        </p>

        <RecipeGrid
          recipes={filteredRecipes.slice(0, visibleCount)}
          from="/recipes"
        />

        {visibleCount < filteredRecipes.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span> Loading...
                </span>
              ) : (
                "Load More Recipes"
              )}
            </button>
          </div>
        )}

        {visibleCount >= filteredRecipes.length &&
          filteredRecipes.length > 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              You've seen all {filteredRecipes.length} recipes! 🎉
            </p>
          )}
      </div>
    </>
  );
}
