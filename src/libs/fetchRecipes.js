export const fetchRecipes = async () => {
  const res = await fetch(`https://dummyjson.com/recipes?limit=30`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return res.json();
};
