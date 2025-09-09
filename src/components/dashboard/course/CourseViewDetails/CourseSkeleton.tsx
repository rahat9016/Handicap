import { Skeleton } from "@/components/ui/skeleton";

export default function CourseSkeleton() {
  return (
    <div className="space-y-6 mb-8 bg-slate-50 border p-6 rounded-lg shadow-sm">
      {/* Thumbnail */}
      <Skeleton className="w-full h-60 rounded-lg" />

      {/* Title */}
      <Skeleton className="h-8 w-2/3 rounded" />

      {/* Description */}
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />

      {/* Objectives */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/4 rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-6 pt-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      {/* Badges */}
      <div className="flex gap-4 mt-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
    </div>
  );
}
