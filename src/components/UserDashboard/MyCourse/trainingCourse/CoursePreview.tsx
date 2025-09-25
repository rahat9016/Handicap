import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, Lock, PlayCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { ICourseContent } from "../types/traning";

const getLessonIcon = (lesson: ICourseContent) => {
  if (lesson.isCompleted)
    return <CheckCircle2 className="w-4 h-4" style={{ color: "#0ea5e9" }} />;
  if (lesson.isLocked)
    return <Lock className="w-4 h-4" style={{ color: "#64748b" }} />;

  switch (lesson.type) {
    case "CONTENT":
      return <PlayCircle className="w-4 h-4" style={{ color: "#64748b" }} />;
    case "QUIZ":
      return <FileText className="w-4 h-4" style={{ color: "#64748b" }} />;
    default:
      return <FileText className="w-4 h-4" style={{ color: "#64748b" }} />;
  }
};

export default function CoursePreview({
  courses,
  setSelectedVideo,
  selectedCourseItem,
  handleMarkItemCompleted
}: {
  selectedCourseItem: ICourseContent | null;
  courses: ICourseContent[];
  setSelectedVideo: Dispatch<SetStateAction<ICourseContent | null>>;
  handleMarkItemCompleted: (course: ICourseContent) => Promise<void>;
}) {
  const handleLessonClick = async (lesson: ICourseContent) => {
    const index = courses.findIndex((i) => i.id === lesson.id);
    const prevItem = index > 0 ? courses[index - 1] : null;
    if (lesson.isLocked) {
      if (prevItem && !prevItem.isLocked && prevItem.isCompleted) {
        await handleMarkItemCompleted(lesson).then(() => {
          setSelectedVideo(lesson);
        });
      } else {
        toast.error("You must unlock the previous item first.");
      }
    } else {
      setSelectedVideo(lesson);
    }
  };
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

      <Card className="p-3 rounded-t-none">
        <div className="space-y-1">
          {courses?.map((lesson) => (
            <div
              key={lesson.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group hover:bg-dashboard-primary  cursor-pointer  ${
                lesson.id === selectedCourseItem?.id
                  ? "bg-dashboard-primary border/90 border-dashboard-primary"
                  : "bg-lightBlue border"
              }`}
              onClick={() => handleLessonClick(lesson)}
            >
              <div className="flex-shrink-0">{getLessonIcon(lesson)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-sm font-medium font-inter truncate group-hover:text-white ${
                      lesson.id === selectedCourseItem?.id
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {lesson.order.toString().padStart(2, "0")}.
                  </span>
                  <h4
                    className={`text-sm font-medium font-inter truncate group-hover:text-white ${
                      lesson.id === selectedCourseItem?.id
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {lesson.content?.title ||
                      lesson.quiz?.title ||
                      `Lesson ${lesson.order}`}
                  </h4>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs group-hover:text-light ${
                    lesson.id === selectedCourseItem?.id
                      ? "text-light"
                      : "text-black"
                  } `}
                >
                  {lesson.type === "CONTENT" ? (
                    <PlayCircle className="w-3 h-3" />
                  ) : (
                    <FileText className="w-3 h-3" />
                  )}
                  {lesson.type === "CONTENT" ? "Video" : "Quiz"}
                  {lesson.isLocked && (
                    <Badge
                      variant="outline"
                      className={`text-xs py-0 px-1.5 group-hover:text-light`}
                    >
                      Locked
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* <div className="flex flex-col gap-0.5 mt-2">
        {courses.length === 0 ? (
          <Paragraph>No course content available.</Paragraph>
        ) : (
          courses.map((course, idx) => {
            const isActive = selectedCourseItem?.id === course.id;
            return (
              <div
                key={idx}
                className={`group shadow-sm border flex flex-col px-5 py-3 rounded-lg cursor-pointer hover:bg-[#0F3BB7] ${
                  isActive ? "bg-[#0F3BB7] " : "bg-slate-50 "
                }`}
                onClick={() => setSelectedVideo(course)}
              >
                <Title
                  className={`text-black group-hover:text-white font-medium text-sm lg:text-sm leading-none flex items-center gap-1 ${
                    isActive ? "text-white " : ""
                  }`}
                >
                  {isActive && (
                    <Play size={14} className="text-green-400 animate-pulse" />
                  )}
                  {course.content?.title || selectedCourseItem?.quiz?.title}
                </Title>
                {selectedCourseItem?.content?.contentType === "VIDEO" && (
                  <Paragraph
                    className={`text-black group-hover:text-white lg:text-xs ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    Video • N/A
                  </Paragraph>
                )}
              </div>
            );
          })
        )}
      </div> */}
    </div>
  );
}
