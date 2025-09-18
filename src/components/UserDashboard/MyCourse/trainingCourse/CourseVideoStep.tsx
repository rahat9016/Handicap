"use client"
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { useGet } from "@/hooks/useGet";
import extractYouTubeId from "@/utils/extractYouTubeId";
import { getVideoUrl } from "@/utils/video";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { ICourseContent } from "../types/traning";
import CoursePreview from "./CoursePreview";
import HlsPlayer from "./HlsPlayer";
import { Quiz } from "./Quiz";
import { VideoItemSkeleton } from "./VideoItemSkeleton";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";

export default function CourseVideoStep() {
  const { id } = useParams();
  const router = useRouter()
  const { data, isLoading } = useGet<ICourseContent[]>(`/course/${id}/items`, [
    "course",
  ]);
  const [selectedVideo, setSelectedVideo] = useState<ICourseContent | null>(
    null
  );

  useEffect(() => {
    if (data?.data?.length && !selectedVideo) {
      setSelectedVideo(data.data[0]);
    }
  }, [data, selectedVideo]);

  const videoUrl =
    selectedVideo && id && selectedVideo.contentId !== null
      ? getVideoUrl(id, selectedVideo.contentId)
      : null;

  const youtubeId =
    selectedVideo?.content?.contentType === "LINK" &&
    selectedVideo?.content?.link
      ? extractYouTubeId(selectedVideo.content?.link)
      : null;
  return (
    <div>
      <div className="container">
        <Button
        onClick={() => router.push("/user-dashboard/my-courses")}
        className="bg-dashboard-primary text-white h-10 mb-3"
      >
        <ChevronLeft /> Back
      </Button>
        <div className="w-3/4">
          <Title className="mb-3">{selectedVideo?.content?.title}</Title>
          <Paragraph className="text-[#8F8F8F] mb-14">
            {selectedVideo?.content?.description}
          </Paragraph>
        </div>
        <div className="flex items-start gap-4 mb-10">
          <div className="w-3/4 lg:min-h-[500px]">
            {selectedVideo?.type === "QUIZ" && selectedVideo?.quiz ? (
              <Quiz quiz={selectedVideo.quiz} />
            ) : selectedVideo?.content?.contentType === "VIDEO" ? (
              videoUrl ? (
                <HlsPlayer
                  src={videoUrl}
                  controls
                  autoPlay
                  width="100%"
                  height={520}
                  variants={selectedVideo?.content?.contentData?.variants || []}
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

          <div className="w-1/4">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <VideoItemSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div>
                <CoursePreview
                  courses={data?.data || []}
                  setSelectedVideo={setSelectedVideo}
                  selectedVideo={selectedVideo}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
