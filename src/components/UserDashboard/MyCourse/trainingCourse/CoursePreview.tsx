import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  FileText,
  Lock,
  PlayCircle,
  ShieldX,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ICourseContent, ICourseProgress } from "../types/traning";

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
  handleMarkItemCompleted,
  courseProgress,
}: {
  selectedCourseItem: ICourseContent | null;
  courses: ICourseContent[];
  setSelectedVideo: Dispatch<SetStateAction<ICourseContent | null>>;
  handleMarkItemCompleted: (course: ICourseContent) => Promise<void>;
  courseProgress: ICourseProgress | undefined;
}) {
  const [showLockedDialog, setShowLockedDialog] = useState(false);

  const handleLessonClick = async (lesson: ICourseContent) => {
    const index = courses.findIndex((i) => i.id === lesson.id);
    const prevItem = index > 0 ? courses[index - 1] : null;

    if (prevItem && !prevItem.isCompleted) {
      setShowLockedDialog(true);
      return;
    }
    if (!lesson.isCompleted && lesson.type === "CONTENT") {
      await handleMarkItemCompleted(lesson);
    }

    setSelectedVideo(lesson);
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
          <Paragraph className="text-white text-xs font-medium">
            {Math.round(courseProgress?.percentComplete ?? 0)}%
          </Paragraph>
        </div>
      </div>

      <Card className="p-3 rounded-t-none">
        <div className="space-y-1">
          {courses.length === 0 && (
            <div className="flex items-center justify-center py-28">
              <p>No video available</p>
            </div>
          )}
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
      <Dialog open={showLockedDialog} onOpenChange={setShowLockedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-inter">Locked Lesson</DialogTitle>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4 my-5 mx-auto ">
              <ShieldX className="text-red-500 w-10 h-10" />
            </div>
            <DialogDescription className="text-center font-inter text-sm">
              You must complete the previous item before unlocking this lesson.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowLockedDialog(false)}
              className="bg-dashboard-primary"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
