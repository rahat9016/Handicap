"use client";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { useGet } from "@/hooks/useGet";
import extractYouTubeId from "@/utils/extractYouTubeId";
import { getVideoUrl } from "@/utils/video";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { ICourseContent, ICourseEnrollmentResponse } from "../types/traning";
import CoursePreview from "./CoursePreview";
import HlsPlayer from "./HlsPlayer";
import { Quiz } from "./Quiz";
import { VideoItemSkeleton } from "./VideoItemSkeleton";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";

export default function CourseModules() {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useGet<ICourseEnrollmentResponse>(
    `/course-enrollment/${id}/items`,
    ["course", String(id)]
  );
  const { mutateAsync } = usePost(
    ``,
    () => {
      console.log("POST success");
    },
    [["course", String(id)]]
  );
  const enrollmentCourseData = data?.data;
  const [selectedCourseItem, setSelectedCourseItem] =
    useState<ICourseContent | null>(null);

  const handleMarkItemCompleted = async (course: ICourseContent) => {
    await mutateAsync({
      endpoint: `/course-enrollment/mark-item-completed/${course.courseId}/${course.id}/`,
    });
  };

  useEffect(() => {
    if (
      enrollmentCourseData &&
      enrollmentCourseData?.items?.length &&
      !selectedCourseItem
    ) {
      setSelectedCourseItem(enrollmentCourseData.items[0]);
      if (!enrollmentCourseData.items[0].isLocked)
        handleMarkItemCompleted(enrollmentCourseData.items[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrollmentCourseData, selectedCourseItem]);

  const videoUrl =
    selectedCourseItem && id && selectedCourseItem.contentId !== null
      ? getVideoUrl(id, selectedCourseItem.contentId)
      : null;

  const youtubeId =
    selectedCourseItem?.content?.contentType === "LINK" &&
    selectedCourseItem?.content?.link
      ? extractYouTubeId(selectedCourseItem.content?.link)
      : null;

  return (
    <div>
      <div className="container">
        <Button
          onClick={() => router.push("/user-dashboard/my-courses")}
          className="bg-dashboard-primary text-white h-10"
        >
          <ChevronLeft /> Back
        </Button>
        {selectedCourseItem?.content?.title && (
          <div className="w-full xl:w-3/4  bg-lightBlue border px-3 py-4 rounded-lg mt-4">
            <Title className="mb-1">{selectedCourseItem?.content?.title}</Title>
            <Paragraph className="text-[#8F8F8F]">
              {selectedCourseItem?.content?.description}
            </Paragraph>
          </div>
        )}
        <div className="flex flex-col xl:flex-row items-start gap-4 mb-10 mt-5">
          <div className="w-full xl:w-3/4 lg:min-h-[500px]">
            {selectedCourseItem?.type === "QUIZ" && selectedCourseItem?.quiz ? (
              <Quiz quiz={selectedCourseItem.quiz} />
            ) : selectedCourseItem?.content?.contentType === "VIDEO" ? (
              videoUrl ? (
                <HlsPlayer
                  src={videoUrl}
                  controls
                  autoPlay
                  width="100%"
                  height={500}
                  variants={
                    selectedCourseItem?.content?.contentData?.variants || []
                  }
                />
              ) : (
                <p>Loading video...</p>
              )
            ) : youtubeId ? (
              <YoutubeVideoPlayer youtubeId={youtubeId} />
            ) : (
              <p>No video available</p>
            )}
          </div>

          <div className="w-full xl:w-1/4">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <VideoItemSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div>
                <CoursePreview
                  courses={enrollmentCourseData?.items || []}
                  setSelectedVideo={setSelectedCourseItem}
                  selectedCourseItem={selectedCourseItem}
                  handleMarkItemCompleted={handleMarkItemCompleted}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
