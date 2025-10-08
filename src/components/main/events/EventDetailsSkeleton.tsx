"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Skeleton className="h-10 w-32 rounded" />
        <Skeleton className="h-5 w-28 rounded" />
      </div>

      <Skeleton className="h-10 sm:h-12 md:h-14 w-full max-w-3xl rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/6 rounded" />
      </div>
      <Skeleton className="w-full h-[200px] sm:h-[350px] md:h-[450px] rounded-lg" />
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6 space-y-4">
        <Skeleton className="h-6 w-40 rounded" />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 sm:p-6 space-y-3">
        <Skeleton className="h-6 w-44 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-5/6 rounded" />
          <Skeleton className="h-3 w-4/6 rounded" />
        </div>
      </div>
    </div>
  );
}
