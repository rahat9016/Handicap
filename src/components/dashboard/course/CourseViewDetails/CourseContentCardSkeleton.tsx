import { Card, CardContent } from "@/components/ui/card";

export default function CourseContentCardSkeleton() {
  return (
    <Card className="border rounded-xl">
      <CardContent className="flex items-center gap-4 p-4 animate-pulse">
        <div className="w-10 h-10 bg-gray rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray rounded w-3/4" />
          <div className="h-3 bg-gray rounded w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
}