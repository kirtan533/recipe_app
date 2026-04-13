import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, from }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No recipes found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} from={from} />
      ))}
    </div>
  );
}
