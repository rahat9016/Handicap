import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="pt-10 pb-20 bg-white">
      <div className="container">
        {/* Responsive grid: single column on small screens, two columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          
          {/* Left content skeleton */}
          <div className="order-2 md:order-1">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-6" />

            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-[46px] w-full sm:w-[150px] rounded-md" />
              <Skeleton className="h-[46px] w-full sm:w-[150px] rounded-md" />
            </div>
          </div>

          {/* Right image skeleton */}
          <div className="order-1 md:order-2 flex justify-center">
            <Skeleton className="w-full sm:w-10/12 h-[250px] sm:h-[350px] md:h-[440px] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
