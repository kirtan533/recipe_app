import Link from "next/link";
import Button from "../Ui/Button";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";

export default function RecipeCard({ recipe, from }) {
  const href = from
    ? `/recipes/${recipe.id}?from=${encodeURIComponent(from)}`
    : `/recipes/${recipe.id}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative h-48">
        <Image
          src={recipe.image}
          alt={recipe.name}
          height={300}
          width={400}
          quality={75}
          priority={false}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
          {recipe.cuisine}
        </span>
        <div className="absolute top-52 right-3">
          <FavoriteButton recipeId={recipe.id} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {recipe.name}
        </h3>

        <div className="flex items-center space-x-4 text-sm mb-3">
          <span className="text-gray-600 dark:text-gray-300">
            ⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            📊 {recipe.difficulty}
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            ⭐ {recipe.rating}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.mealType?.map((type, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
            >
              {type}
            </span>
          ))}
        </div>
        <Link href={href}>
          <Button variant="primary" className="w-full cursor-pointer">
            View Recipe
          </Button>
        </Link>
      </div>
    </div>
  );
}
