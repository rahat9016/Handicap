import { Skeleton } from "@/components/ui/skeleton";

export default function HeroStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/30 rounded-lg px-6 py-5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`flex-1 text-center ${
            i !== 4 ? "lg:border-r border-white/30" : ""
          } flex flex-col items-center`}
        >
          {/* Title skeleton */}
          <Skeleton className="h-4 w-24 mb-2 bg-white/20" />
          {/* Value skeleton */}
          <Skeleton className="h-8 w-16 bg-white/30" />
        </div>
      ))}
    </div>
  );
}
