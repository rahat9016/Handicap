import { IVideoContent } from "@/components/main/training/types/traning";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { MessageCircleQuestionMark } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CreateUpdateCourseQuiz from "../Quiz/CreateUpdateCourseQuiz";
import EditVideoModal from "./EditVideoModal";
import VideoModal from "./VideoModal";

export default function CourseVideoList({
  courseContentList,
  className,
}: {
  courseContentList: IVideoContent[] | never[];
  className?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<IVideoContent | null>(
    null
  );
  const [modalType, setModalType] = useState<"view" | "edit" | null>(null);

  // const handleOpen = (video: IVideoContent, type: "view" | "edit") => {
  //   setSelectedVideo(video);
  //   setModalType(type);
  // };

  const handleClose = () => {
    setSelectedVideo(null);
    setModalType(null);
  };

  return (
    <div
      className={cn(
        "space-y-6 bg-slate-50 border p-6 rounded-lg shadow-sm",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseContentList?.map((item) => (
          <Card
            key={item.id}
            className="relative cursor-pointer hover:shadow-lg transition border rounded-xl"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex-shrink-0">
                {item.contentType === "VIDEO" ? (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image
                      className="w-10 h-10"
                      src="/video.png"
                      alt="video"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image
                      className="w-10 h-10"
                      src="/youtube_play.png"
                      alt="youtube"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-4 right-4 flex items-center text-white bg-dashboard-primary p-1 rounded-md text-sm"
                  >
                    <MessageCircleQuestionMark size={16} /> Add Quiz
                  </button>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {modalType === "view" && selectedVideo && (
        <VideoModal video={selectedVideo} onClose={handleClose} />
      )}
      {modalType === "edit" && selectedVideo && (
        <EditVideoModal
          video={selectedVideo}
          open={modalType === "edit"}
          onClose={handleClose}
        />
      )}
      <CreateUpdateCourseQuiz
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
