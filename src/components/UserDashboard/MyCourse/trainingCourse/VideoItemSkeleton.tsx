import { Skeleton } from "@/components/ui/skeleton";

export function VideoItemSkeleton() {
  return (
    <div className="bg-white flex items-start gap-2 px-5 py-3 rounded-lg">
      {/* Checkbox skeleton */}
      <Skeleton className="h-4 w-4 rounded-sm" />

      <div className="flex flex-col gap-1">
        {/* Title skeleton */}
        <Skeleton className="h-4 min-w-48 rounded" />
        {/* Subtitle skeleton */}
        <Skeleton className="h-3 w-28 rounded" />
      </div>
    </div>
  );
}
