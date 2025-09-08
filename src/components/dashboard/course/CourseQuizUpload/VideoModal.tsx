import HlsPlayer from "@/components/main/training/trainingCourse/HlsPlayer";
import YoutubeVideoPlayer from "@/components/main/training/trainingCourse/YoutubeVideoPlayer";
import { IVideoContent } from "@/components/main/training/types/traning";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import extractYouTubeId from "@/utils/extractYouTubeId";
import { getVideoUrl } from "@/utils/video";
import { useParams } from "next/navigation";

export default function VideoModal({
  video,
  onClose,
}: {
  video: IVideoContent;
  onClose: () => void;
}) {
  const { id } = useParams();
  const videoUrl =
    video && id && video.id !== null ? getVideoUrl(id, video.id) : null;
  const youtubeId =
    video?.contentType === "LINK" && video?.link
      ? extractYouTubeId(video?.link)
      : null;

  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="max-h-[95vh] w-[800px] !max-w-none ">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>

        <div className="w-full">
          <div className="w-full lg:h-[500px]">
            {video?.contentType === "VIDEO" ? (
              videoUrl ? (
                <HlsPlayer
                  src={videoUrl}
                  controls
                  autoPlay
                  width="100%"
                  height={520}
                  variants={video?.contentData?.variants || []}
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
          <p className="mt-10 font-inter">{video.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
