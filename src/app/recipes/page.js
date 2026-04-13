"use client";

import FilterBar from "@/components/forms/FilterBar";
import SeachBar from "@/components/forms/SearchBar";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import RecipeSkeletonGrid from "@/components/Ui/RecipeSkeletonGrid";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSearch, setLocalSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");

  const [visibleCount, setVisibleCount] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    setSearchQuery(searchParams.get("search") || "");
    setCuisineFilter(searchParams.get("cuisine") || "");
  }, [searchParams]);

  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setLocalSearch(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    filterRecipes();
  }, [recipes, localSearch, cuisineFilter]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes?limit=30`);

      if (!response.ok) {
        throw new Error(`Failed to fetch recipes`);
      }
      const data = await response.json();
      setRecipes(data?.recipes || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const filterRecipes = () => {
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
    setFilteredRecipes(filtered);
  };

  const handleSearchChange = (value) => {
    setLocalSearch(value);
  };

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setLoadingMore(false);
    }, 500);
  };

  if (loading) {
    return <RecipeSkeletonGrid />;
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
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
            onSearchChange={handleSearchChange}
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
