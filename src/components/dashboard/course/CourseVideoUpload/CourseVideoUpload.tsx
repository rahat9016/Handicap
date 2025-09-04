"use client";

import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ICourseDetails } from "../types/types";
import CourseVideoUploadDetails from "./CourseVideoUploadDetails";
import CourseVideoUploadSkeleton from "./CourseVideoUploadSkeleton";
import CreateUpdateCourseVideoFiles from "./CreateUpdateCourseVideoFiles";

export default function CourseVideoUpload() {
  const { id } = useParams();
  const router = useRouter()
  const { data, isLoading } = useGet<ICourseDetails>(
    `/course/${id}`,
    ["courseList"],
    {},
    { enabled: id !== undefined }
  );

  return (
    <div>
      <Button
          onClick={() => router.push("/admin/course/course-list")}
          className="bg-dashboard-primary text-white h-10 mb-3"
        >
          <ChevronLeft /> Back
        </Button>
      {isLoading ? (
        <CourseVideoUploadSkeleton />
      ) : (
        data?.data && <CourseVideoUploadDetails {...data?.data} />
      )}
      <CreateUpdateCourseVideoFiles />
    </div>
  );
}
