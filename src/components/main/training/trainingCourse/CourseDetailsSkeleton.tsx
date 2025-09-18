import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@radix-ui/react-select"

export default function CourseDetailsSkeleton() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-white text-dashboard-primary">
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Course Image */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm border-4 border-dashboard-primary/10">
                <Skeleton className="w-full h-full" />
              </div>
            </div>

            {/* Course Info */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-20 w-full" />

              {/* Action Button */}
              <div className="pt-2">
                <Skeleton className="h-12 w-40 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container my-10">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card className="border shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Skeleton className="h-8 w-60" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card className="border shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-0">
                <CardTitle>
                  <Skeleton className="h-8 w-40" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl border"
                    >
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-48" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between py-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    {i < 3 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
