"use client";

import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  Clock,
  Globe,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CreateUpdateCourseQuiz from "../Quiz/CreateUpdateCourseQuiz";
import { ICourseDetails } from "../types/types";

export default function CourseQuizUploadDetails({
  title,
  description,
  objectives,
  durationMinutes,
  createdAt,
  updatedAt,
  creator,
  organization,
  CourseCategory,
  thumbnailUrl,
  isActive,
  className,
  courseId,
  quiz,
}: ICourseDetails) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "space-y-6 mb-8 bg-slate-50 border p-6 rounded-lg shadow-sm",
        className
      )}
    >
      <Button
        onClick={() => router.push("/admin/course/course-list")}
        className="bg-dashboard-primary text-white h-10 mb-3"
      >
        <ChevronLeft /> Back
      </Button>
      {thumbnailUrl && (
        <div className="w-full h-60 relative rounded-lg overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Title & Description */}
      <div className="flex items-center justify-between">
        <Title>{title}</Title>
        <Button onClick={() => setIsModalOpen(true)} className="text-white">
          {quiz?.id ? "Update Quiz" : "Add Quiz"}
        </Button>
      </div>
      <Paragraph>{description}</Paragraph>

      {/* Objectives */}
      {objectives && (
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue" />
            Learning Objectives
          </h3>
          <p className="text-sm  leading-relaxed">{objectives}</p>
        </div>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap gap-6 text-sm text-black border-t pt-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>
            {creator?.firstName} {creator?.lastName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            Published {createdAt && new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>
            Updated {updatedAt && new Date(updatedAt).toLocaleDateString()}
          </span>
        </div>
        {organization?.name && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>{organization.name}</span>
          </div>
        )}
      </div>

      {/* Extra Info */}
      <div className="flex flex-wrap gap-4 text-sm mt-4">
        {CourseCategory && (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            {CourseCategory.name}
          </Badge>
        )}
        <Badge
          className={cn(
            "border",
            isActive
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-red-100 text-red-700 border-red-300"
          )}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
        {durationMinutes > 0 && (
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            Duration: {durationMinutes} min
          </Badge>
        )}
      </div>
      <CreateUpdateCourseQuiz
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        id={courseId as string}
        quizId={quiz?.id}
      />
    </div>
  );
}
