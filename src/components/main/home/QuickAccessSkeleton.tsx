import { Skeleton } from "@/components/ui/skeleton";

function QuickAccessSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="p-6 border border-gray-200 rounded-lg bg-[#F3F3F4]"
        >
          <Skeleton className="h-5 w-1/4 mb-3" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default QuickAccessSkeleton;
