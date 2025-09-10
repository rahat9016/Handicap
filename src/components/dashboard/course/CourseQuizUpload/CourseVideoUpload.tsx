"use client";

import { IVideoContent } from "@/components/main/training/types/traning";
import { useGet } from "@/hooks/useGet";
import { useParams } from "next/navigation";
import { ICourseDetails } from "../types/types";
import CourseContentCardSkeleton from "./CourseContentCardSkeleton";
import CourseVideoList from "./CourseVideoList";
import CourseQuizUploadDetails from "./CourseVideoUploadDetails";
import CourseVideoUploadSkeleton from "./CourseVideoUploadSkeleton";

export default function CourseQuizUpload() {
  const { id } = useParams();
  const { data, isLoading } = useGet<ICourseDetails>(
    `/course/${id}`,
    ["courseList"],
    {},
    { enabled: id !== undefined }
  );
  const { data: allCourseContentList, isLoading: allCourseContentListLoading } =
    useGet<IVideoContent[]>(
      `/course/all-course-content/${id}`,
      ["allCourseList"],
      {},
      { enabled: id !== undefined }
    );

  return (
    <div>
      {isLoading ? (
        <CourseVideoUploadSkeleton />
      ) : (
        data?.data && <CourseQuizUploadDetails {...data?.data} courseId={id as string} />
      )}
      <div className="mb-8">
        {allCourseContentListLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseContentCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <CourseVideoList
            courseContentList={allCourseContentList?.data || []}
            courseId={id as string}
          />
        )}
      </div>
      
    </div>
  );
}
