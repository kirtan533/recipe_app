"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({ recipeId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const savedRatings = JSON.parse(
      localStorage.getItem("recipeRatings") || "{}",
    );
    if (savedRatings[recipeId]) {
      setRating(savedRatings[recipeId]);
    }
  }, [recipeId]);

  const handleRating = (value) => {
    setRating(value);
    const savedRatings = JSON.parse(
      localStorage.getItem("recipeRatings") || "{}",
    );
    savedRatings[recipeId] = value;
    localStorage.setItem("recipeRatings", JSON.stringify(savedRatings));
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none"
          aria-label={`Rate ${star} stars`}
        >
          <FaStar
            className={`w-6 h-6 transition-colors ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {rating > 0 ? `${rating} / 5` : "Not rated"}
      </span>
    </div>
  );
}
