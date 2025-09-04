import { getBaseUrl } from "@/config/envConfig";
import { ParamValue } from "next/dist/server/request/params";

// utils/video.ts
export const getVideoUrl = (courseId: ParamValue |string | number, videoId: string | number) => {
  if (!courseId || !videoId) return null;
  return `${getBaseUrl()}/course/course-${courseId}/content-${videoId}/master.m3u8`;
};
