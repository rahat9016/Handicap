import { Skeleton } from "@/components/ui/skeleton";
export function AdminTotalCardSectionSkeleton() {
  return (
    <div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border p-6 shadow-sm h-[186px]"
          >
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-12 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
