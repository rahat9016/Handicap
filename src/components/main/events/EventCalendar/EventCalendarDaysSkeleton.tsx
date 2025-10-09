import { Skeleton } from "@/components/ui/skeleton";

export default function EventCalendarDaysSkeleton() {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 p-1 sm:p-2">
      {Array.from({ length: 42 }).map((_, idx) => (
        <div
          key={idx}
          className="min-h-[80px] sm:min-h-[100px] p-2 border border-border rounded"
        >
          <Skeleton className="h-4 w-6 mb-2" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}
