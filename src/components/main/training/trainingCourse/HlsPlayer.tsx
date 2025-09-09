"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Hls, { Level } from "hls.js";
import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IVariant } from "../types/traning";

interface HlsPlayerProps {
  src: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  variants: IVariant[]
}

export default function HlsPlayer({
  src,
  width = "100%",
  height = "100%",
  controls = true,
  autoPlay = false,
  variants
}: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number>(-1);

  console.log(isPlaying);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    let hls: Hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      // AutoPlay
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
        if (autoPlay) {
          video.play().catch(() => console.warn("Autoplay blocked"));
        }
      });

      // Track auto switches
      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setSelectedLevel(data.level);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      if (autoPlay) video.play().catch(() => console.warn("Autoplay blocked"));
    }
  }, [src, autoPlay]);

  const handleLevelChange = (levelIndex: number) => {
    setSelectedLevel(levelIndex);
    if (hlsRef.current) hlsRef.current.currentLevel = levelIndex;
  };

  return (
    <div
      className="relative w-full"
      style={{ width, height}}
    >
      <video
        ref={videoRef}
        controls={controls}
        width={width}
        height={height}
        className="rounded-md"
        style={{
          backgroundColor: "black",
          width: width,
          height: height,
          objectFit: "fill",
        }}
      />
      <div className="absolute bottom-[29px] right-40">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-white p-2  rounded-full hover:bg-black/70">
              <Settings size={20} />
            </button>
          </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={8} 
              collisionPadding={0}
              className="bg-black/80 text-white"
            >
              <DropdownMenuItem
                className={selectedLevel === -1 ? "bg-gray-700" : ""}
                onClick={() => handleLevelChange(-1)}
              >
                Auto
              </DropdownMenuItem>

              {(variants.length > 0 ? variants : levels).map((v, idx) => (
                <DropdownMenuItem
                  key={idx}
                  className={selectedLevel === idx ? "bg-gray-700" : ""}
                  onClick={() => handleLevelChange(idx)}
                >
                  {v.height}p ({Math.round(v.bitrate / 1000)} kbps)
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
