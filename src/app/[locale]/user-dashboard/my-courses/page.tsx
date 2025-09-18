"use client";

import { ICourse } from "@/components/main/training/types/traning";
import ResourceCardSkeleton from "@/components/main/userResources/ResourceCardSkeleton";
import MyCourseLibrary from "@/components/UserDashboard/MyCourse/MyCourseLibrary";
import { useGet } from "@/hooks/useGet";

export interface ICourseEnrollment {
  id: number;
  courseId: number;
  userId: number;
  enrolledAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  progress: number; // percentage or number
  status: "ENROLLED" | "IN_PROGRESS" | "COMPLETED"; // extendable union type
  grade: number | null;
  course: ICourse;
}

export default function Page() {
  const { data, isLoading } = useGet<ICourseEnrollment[]>(
    `/course-enrollment/my-enrollments`,
    ["course-published"]
  );
  return (
    <div>
      <div className="pt-4">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 10 }, (_, index) => (
              <ResourceCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div>
            <MyCourseLibrary courses={data?.data || []} />
          </div>
        )}
      </div>
    </div>
  );
}
