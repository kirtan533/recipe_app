"use client";

import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function FavoriteButton({ recipeId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(recipeId));
  }, [recipeId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== recipeId);
    } else {
      newFavorites = [...favorites, recipeId];
    }
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition cursor-pointer ${isFavorite ? `bg-red-500 text-white` : `bg-gray-200 text-gray-600 hover:bg-gray-300`}`}
    >
      {isFavorite ? <FaHeart size={21} /> : <FaRegHeart size={21} />}
    </button>
  );
}
