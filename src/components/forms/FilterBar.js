"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterBar({ currentCuisine = "" }) {
  const [selectedCuisine, setSelectedCuisine] = useState(currentCuisine);
  const router = useRouter();

  const cuisine = [
    "All",
    "Italian",
    "Asian",
    "Mexican",
    "Indian",
    "American",
    "Mediterranean",
    "French",
  ];

  const handleFilterChange = (cuisine) => {
    setSelectedCuisine(cuisine);
    if (cuisine === "All") {
      router.push("/recipes");
    } else {
      router.push(`/recipes?cuisine=${encodeURIComponent(cuisine)}`);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Filter by Cuisine:
      </h3>
      <div className="flex flex-wrap gap-2">
        {cuisine.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => handleFilterChange(cuisine)}
            className={`px-4 py-2 rounded-full transition cursor-pointer ${
              selectedCuisine === cuisine ||
              (cuisine === "All" && !selectedCuisine)
                ? "bg-red-500 text-white dark:bg-red-600"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
}
