import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import RecipesPage from "./RecipesPage";
import { fetchRecipes } from "@/libs/fetchRecipes";

export default async function Page({ searchParams }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipesPage searchParams={searchParams} />
    </HydrationBoundary>
  );
}
