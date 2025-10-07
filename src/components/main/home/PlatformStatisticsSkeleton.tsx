"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PlatformStatisticsSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[60px]">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="relative bg-[#F3F3F4] p-6 border border-gray-200 overflow-hidden rounded-lg"
          >
            <div className="relative space-y-4">
              {/* Icon */}
              <Skeleton className="h-8 w-8 rounded-md" />

              {/* Value + subtext */}
              <div className="space-y-2">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>

              {/* Divider */}
              <Skeleton className="h-[1px] w-full" />

              {/* Label */}
              <Skeleton className="h-5 w-1/2" />

              {/* Description */}
              <div className="space-y-2 mt-3">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
