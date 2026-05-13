"use client";

import CategorySkeleton from "@/components/Ui/categorySkeleton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes?limit=100`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueCuisine = [...new Set(data.recipes.map((r) => r.cuisine))];
        setCategories(uniqueCuisine.sort());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CategorySkeleton />;

  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">
        Recipe Categories
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cuisine) => (
          <Link
            key={cuisine}
            href={`/categories/${encodeURIComponent(cuisine)}`}
            className="bg-white dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {cuisine}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
