"use client";

import LoadingSpinner from "@/components/Ui/LoadingSpinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cuisine) => (
          <Link
            key={cuisine}
            href={`/categories/${encodeURIComponent(cuisine)}`}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <span className="text-xl font-medium text-gray-800 dark:text-gray-200">
              {cuisine}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
