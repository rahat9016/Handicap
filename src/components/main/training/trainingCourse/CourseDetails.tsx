import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  PlayCircle,
  Star,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ICourse } from "../types/traning";
import CourseDetailsSkeleton from "./CourseDetailsSkeleton";

export function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();
  const {
    userInformation: { id: userLoginId, roleName },
  } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGet<ICourse>(
    `/course/published/details/${id}`,
    ["courseDetails", ""],
    undefined,
    {
      enabled: !!id,
    }
  );
  const { mutateAsync } = usePost(
    `/course-enrollment/enroll/${id}`,
    () => {
      console.log("POST success");
    },
    [["courseDetails"]]
  );
  const course = data?.data;
  const handleEnrollClick = (id: number) => {
    if (!userLoginId) {
      router.push("/login");
      return;
    }

    if (roleName !== "USER") {
      toast.error("Only users can enroll in courses");
      return;
    }

    mutateAsync({ courseId: id })
      .then((res) => {
        console.log(res);
        toast.success("Course Enrolled Successfully");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleContinueClick = () => {
    router.push("/user-dashboard/my-courses")
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 font-inter">
      {isLoading ? (
        <CourseDetailsSkeleton />
      ) : (
        <div>
          <div className="relative bg-white text-dashboard-primary">
            <div className="relative container mx-auto px-4 py-16">
              <div className="grid lg:grid-cols-2 gap-12 items-">
                {/* Course Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm border-4 border-dashboard-primary/10">
                    <Image
                      src={
                        course?.thumbnailUrl ||
                        "/python-programming-course-thumbnail-with-code-edit.jpg"
                      }
                      alt={course?.title ?? "Course Details"}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                      <div className="bg-dashboard-primary/20 backdrop-blur-sm rounded-full p-4 hover:bg-dashboard-primary/30 transition-colors cursor-pointer">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className="bg-dashboard-primary/10 text-dashboard-primary border-dashboard-primary/20 hover:bg-dashboard-primary/20">
                      <Star className="w-3 h-3 mr-1" />
                      {course?.level}
                    </Badge>
                    <Badge className="bg-dashboard-primary/10 text-dashboard-primary border-dashboard-primary/20 hover:bg-dashboard-primary/20">
                      <Video className="w-3 h-3 mr-1" />
                      {course?.courseType}
                    </Badge>
                    {course?.isQuizExist && (
                      <Badge className="bg-dashboard-primary/10 text-dashboard-primary border-dashboard-primary/20 hover:bg-dashboard-primary/20">
                        <Award className="w-3 h-3 mr-1" />
                        Quiz Available
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-balance">
                    {course?.title}
                  </h1>

                  <p className="text-base text-black leading-relaxed text-pretty">
                    {course?.description}
                  </p>

                  {/* Action Button */}
                  <div className="pt-2">
                    {course && course.CourseEnrollment?.length > 0 ? (
                      <Button
                        size="lg"
                        className="bg-dashboard-primary text-white hover:bg-dashboard-primary/90 px-8 py-4 text-lg font-medium rounded shadow-md hover:shadow-xl transition-all"
                        onClick={handleContinueClick}
                        disabled={!!userLoginId && roleName !== "USER"}
                      >
                        <PlayCircle className="w-5 h-5" />
                        Continue Learning
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="bg-dashboard-primary text-white hover:bg-dashboard-primary/90 px-8 py-4 text-lg font-medium rounded shadow-md hover:shadow-xl transition-all"
                        onClick={() => course && handleEnrollClick(course.id)}
                        disabled={!!userLoginId && roleName !== "USER"}
                      >
                        <BookOpen className="w-5 h-5" />
                        Enroll Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container my-10">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border shadow-sm bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl text-[#135393]">
                      <div className="p-2 bg-[#135393]/10 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-[#135393]" />
                      </div>
                      What You&apos;ll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                      {course?.objectives}
                    </p>
                  </CardContent>
                </Card>

                {/* Course Features */}
                <Card className="border shadow-sm bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-2xl text-[#135393]">
                      Course Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#135393]/5 to-[#135393]/10 border border-[#135393]/20">
                        <div className="p-2 bg-[#135393] rounded-lg">
                          <PlayCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-[#135393]">
                          Video Content
                        </span>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#135393]/5 to-[#135393]/10 border border-[#135393]/20">
                        <div className="p-2 bg-[#135393] rounded-lg">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-[#135393]">
                          Resource Library
                        </span>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#135393]/5 to-[#135393]/10 border border-[#135393]/20">
                        <div className="p-2 bg-[#135393] rounded-lg">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-[#135393]">
                          Community
                        </span>
                      </div>
                      {course?.isQuizExist && (
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#135393]/5 to-[#135393]/10 border border-[#135393]/20">
                          <div className="p-2 bg-[#135393] rounded-lg">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-[#135393]">
                            Quizzes & Assessment
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Course Stats */}
                <Card className="border shadow-sm bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#135393]">
                      Course Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-0">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground font-medium">
                        Level
                      </span>
                      <Badge className="bg-[#135393]/10 text-[#135393] border-[#135393]/20 hover:bg-[#135393]/20">
                        {course?.level}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground font-medium">
                        Format
                      </span>
                      <span className="font-medium text-[#135393]">
                        {course?.courseType}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground font-medium">
                        Duration
                      </span>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#135393]" />
                        <span className="font-medium text-[#135393]">
                          {course &&
                            course?.durationMinutes >= 0 &&
                            `${course.durationMinutes} min`}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground font-medium">
                        Created
                      </span>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#135393]" />
                        <span className="font-medium text-[#135393]">
                          {formatDate(course?.createdAt ?? "")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
