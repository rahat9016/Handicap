import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Play } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ICourseContent } from "../types/traning";

export default function CoursePreview({
  courses,
  setSelectedVideo,
  selectedVideo
}: {
  selectedVideo: ICourseContent | null;
  courses: ICourseContent[];
  setSelectedVideo: Dispatch<SetStateAction<ICourseContent | null>>;
}) {

  return (
    <div>
      <div className="flex w-full bg-black px-4 py-5 rounded-t-xl items-center justify-between">
        <div>
          <Title className="text-white font-bold text-sm">Course Preview</Title>
          <Paragraph className="text-[#B7B7B7]">
            {courses.length} Modules (Videos)
          </Paragraph>
        </div>
        <div className="border border-white rounded-full px-3 py-1.5">
          <Paragraph className="text-white text-xs font-medium">40%</Paragraph>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 mt-2">
        {courses.length === 0 ? (
        <Paragraph>No course content available.</Paragraph>
      ) : (
        courses.map((course, idx) => {
          const isActive = selectedVideo?.id === course.id;
          return (
          <div
            key={idx}
            className={`group shadow-sm border flex flex-col px-5 py-3 rounded-lg cursor-pointer hover:bg-[#0F3BB7] ${isActive ? "bg-[#0F3BB7] " : "bg-slate-50 "}`}
            onClick={() => setSelectedVideo(course)}
          >
            <Title className={`text-black group-hover:text-white font-medium text-sm lg:text-sm leading-none flex items-center gap-1 ${isActive ? "text-white " : ""}`}>
              {isActive && <Play size={14} className="text-green-400 animate-pulse" />}
              {course.content?.title}
            </Title>
            <Paragraph className={`text-black group-hover:text-white lg:text-xs ${isActive ? "text-white" : ""}`}>
              Video •  N/A
            </Paragraph>
          </div>
        )
        })
      )}
      </div>
    </div>
  );
}

