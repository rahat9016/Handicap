import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuizSkeleton() {
  return (
    <div className="space-y-6 bg-gray-50 border p-6 rounded-lg shadow-sm animate-pulse">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray rounded-full text-sm font-medium w-32 h-6 mx-auto"></div>
        <div className="h-8 bg-gray rounded-md w-64 mx-auto"></div>
        <div className="h-4 bg-gray rounded-md w-96 max-w-full mx-auto"></div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray">
            <div className="h-6 w-10 bg-gray rounded-md"></div>
            <div className="h-4 w-16 bg-gray rounded-md"></div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray">
            <div className="h-4 w-4 bg-gray rounded-full"></div>
            <div className="h-4 w-20 bg-gray rounded-md"></div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray">
            <div className="h-4 w-16 bg-gray rounded-md"></div>
            <div className="h-4 w-10 bg-gray rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Questions Skeleton */}
      <div className="space-y-6">
        {[...Array(3)].map((_, idx) => (
          <Card
            key={idx}
            className="shadow-sm border border-gray bg-white hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-start gap-3 text-lg">
                <div className="h-6 w-10 bg-gray rounded-md"></div>
                <div className="h-4 w-3/4 bg-gray rounded-md"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {[...Array(4)].map((_, optionIdx) => (
                <div
                  key={optionIdx}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray"
                >
                  <div className="w-6 h-6 rounded-full bg-gray"></div>
                  <div className="flex-1 h-4 bg-gray rounded-md"></div>
                </div>
              ))}
              <div className="mt-4 pt-3 border-t border-gray flex justify-between text-sm">
                <div className="h-4 w-16 bg-gray rounded-md"></div>
                <div className="h-4 w-24 bg-gray rounded-md"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
