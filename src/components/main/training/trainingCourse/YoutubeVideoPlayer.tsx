import { useState } from "react";
import YouTube from "react-youtube";

export default function YoutubeVideoPlayer({ youtubeId }: { youtubeId: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[520px] bg-black rounded-md overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <span className="text-white">Loading...</span>

        </div>
      )}

      <YouTube
        videoId={youtubeId}
        opts={{
          width: "100%",
          height: "520",
          playerVars: { autoplay: 1 },
        }}
        onReady={() => setIsLoading(false)} 
      />
    </div>
  );
}