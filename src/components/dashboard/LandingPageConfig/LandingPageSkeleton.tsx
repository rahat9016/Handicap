import { Skeleton } from "@/components/ui/skeleton";


export default function LandingPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center border-b pb-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-20" />
      </div>

      {/* Stats Fields Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="border p-4 rounded-lg bg-gray-50 space-y-3">
            {/* Field Title */}
            <Skeleton className="h-5 w-36 mb-2" />

            {/* Field Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Title (EN) */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
              {/* Title (BN) */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
              {/* Value (EN) */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
              {/* Value (BN) */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
