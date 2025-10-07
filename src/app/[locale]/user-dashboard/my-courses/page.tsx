"use client";

import { ICourse } from "@/components/main/training/types/traning";
import ResourceCardSkeleton from "@/components/main/userResources/ResourceCardSkeleton";
import MyCourseLibrary from "@/components/UserDashboard/MyCourse/MyCourseLibrary";
import { useGet } from "@/hooks/useGet";

export interface ICourseEnrollment {
  id: number;
  courseId: number;
  userId: number;
  enrolledAt: string;
  updatedAt: string;
  progress: number;
  status: "ENROLLED" | "IN_PROGRESS" | "COMPLETED";
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
      <div className="bg-lightBlue border px-3 py-4 rounded-lg">
        <h3 className="text-black font-inter font-medium ">My Courses </h3>
      </div>
      <div className="pt-4 bg-lightBlue border mt-5 px-3 py-4 rounded-lg min-h-screen">
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
