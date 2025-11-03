import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const HeroSectionSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative w-full min-h-[30vh] max-h-[30vh] overflow-hidden rounded-none bg-lightBlue",
        className
      )}
    >
      <div className="container mx-auto">
        <Skeleton className="w-full h-full absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Skeleton className="h-[5vh] w-6/12 mb-2 rounded-md" />
          <Skeleton className="h-[2vh] w-8/12 rounded-md mb-1" />
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSkeleton;
