import { Suspense } from "react";
import RecipesPage from "./RecipesPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipesPage />
    </Suspense>
  );
}
