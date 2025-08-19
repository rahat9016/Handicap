import { Skeleton } from "@/components/ui/skeleton";

export function ResourceCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col">
      {/* Image */}
      <Skeleton className="relative w-full h-56" />

      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          {/* Title */}
          <Skeleton className="h-5 w-3/4 mb-3" />

          {/* Description */}
          <div className="space-y-2 mb-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
export default ResourceCardSkeleton;