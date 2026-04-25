export default function RecipeSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      {/* Back button */}
      <div className="mb-6 w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Image */}
        <div className="w-full h-96 bg-gray-300 dark:bg-gray-700"></div>

        <div className="p-8">
          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

          {/* Meta info */}
          <div className="flex gap-4 mb-6">
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"
              ></div>
            ))}
          </div>

          {/* Instructions */}
          <div>
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
