export default function RecipeCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>

      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>

        <div className="flex gap-3 mb-3">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
