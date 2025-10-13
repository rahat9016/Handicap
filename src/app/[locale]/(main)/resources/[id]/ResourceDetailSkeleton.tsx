import { Skeleton } from "@/components/ui/skeleton";

export default function ResourceDetailSkeleton() {
  return (
    <main className="flex-1">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Skeleton className="h-6 sm:h-7 md:h-8 w-24 sm:w-28 md:w-32 rounded" />
            <Skeleton className="h-4 sm:h-5 md:h-6 w-16 sm:w-20 md:w-24 rounded" />
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <Skeleton className="h-7 sm:h-8 w-16 sm:w-18 md:w-20 rounded" />
              <Skeleton className="h-7 sm:h-8 w-16 sm:w-18 md:w-20 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-3 sm:px-4 md:px-6 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Resource Header Details */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-7 md:mb-8">
          <Skeleton className="h-8 sm:h-9 md:h-10 w-3/4 sm:w-4/5 rounded" />
          <Skeleton className="h-4 sm:h-5 md:h-6 w-full rounded" />
          <Skeleton className="h-4 sm:h-5 md:h-6 w-5/6 rounded" />

          {/* Metadata - Stack on mobile, row on larger screens */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm">
            <Skeleton className="h-3 sm:h-4 w-20 sm:w-24 md:w-28 rounded" />
            <Skeleton className="h-3 sm:h-4 w-18 sm:w-20 md:w-24 rounded" />
            <Skeleton className="h-3 sm:h-4 w-18 sm:w-20 md:w-24 rounded" />
            <Skeleton className="h-3 sm:h-4 w-24 sm:w-28 md:w-36 rounded" />
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm">
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-18 md:w-20 rounded" />
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-18 md:w-20 rounded" />
          </div>

          {/* Keywords */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t flex flex-wrap gap-1 sm:gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-5 sm:h-6 w-12 sm:w-16 md:w-20 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - File Preview */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 md:space-y-6">
            <Skeleton className="h-6 sm:h-7 md:h-8 w-32 sm:w-40 md:w-48 rounded" />
            <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <Skeleton className="h-4 sm:h-5 md:h-6 w-full rounded" />
              <Skeleton className="h-4 sm:h-5 md:h-6 w-5/6 rounded" />
              <Skeleton className="h-64 sm:h-80 md:h-96 w-full rounded-lg" />
            </div>
          </div>

          {/* Right Column - Download Section */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5 md:space-y-6">
            <Skeleton className="h-10 sm:h-11 md:h-12 w-full rounded-lg" />
            <div className="space-y-3 sm:space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-16 sm:h-18 md:h-20 w-full rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
