import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CertificateCardSkeleton() {
  return (
    <Card className="w-full p-6 bg-card shadow">
      <div className="space-y-4">
        <div>
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>
    </Card>
  )
}
