export default function CategorySkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Title */}
      <div className="h-8 w-60 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 dark:bg-gray-700 rounded-lg p-6 h-24"
          ></div>
        ))}
      </div>
    </div>
  );
}
