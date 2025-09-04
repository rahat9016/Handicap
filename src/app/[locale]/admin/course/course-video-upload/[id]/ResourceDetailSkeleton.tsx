import { Skeleton } from "@/components/ui/skeleton";

export default function ResourceDetailSkeleton() {
  return (
    <main className="flex-1">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-8 w-20 rounded" />
              <Skeleton className="h-8 w-20 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8 max-w-7xl mx-auto">
        <div className="space-y-6 mb-8">
          <Skeleton className="h-10 w-3/4 rounded" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-5/6 rounded" />

          <div className="flex flex-wrap gap-8 text-sm">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-36 rounded" />
          </div>

          <div className="flex gap-8 text-sm">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Skeleton className="h-8 w-48 rounded" />
            <div className="space-y-4 mt-4">
              <Skeleton className="h-6 w-full rounded" />
              <Skeleton className="h-6 w-5/6 rounded" />
              <Skeleton className="h-96 w-full rounded" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Skeleton className="h-12 w-full rounded" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
