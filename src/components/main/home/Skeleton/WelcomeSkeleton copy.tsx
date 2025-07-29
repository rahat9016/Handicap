import { Skeleton } from "@/components/ui/skeleton";

export default function WelcomeSkeleton() {
  return (
    <div className="pt-10 pb-20 bg-white">

    <div className="container">
      <div className="grid grid-cols-2 items-center gap-10">
        <div>
          <Skeleton className="w-10/12 h-[440px] rounded-xl mx-auto" /> 
        </div>
        <div>
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" /> 

          <div className="flex">
            <Skeleton className="h-[46px] w-[150px] rounded-md" />
            <Skeleton className="h-[46px] w-[150px] rounded-md ml-4" /> 
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
