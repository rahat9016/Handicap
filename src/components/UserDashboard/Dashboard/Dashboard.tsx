"use client"
import { ICourseEnrollment } from "@/app/[locale]/user-dashboard/my-courses/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  BookOpen,
  FileText,
  Play,
  Trophy
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter()
  const { userInformation:{firstName, lastName} } = useAppSelector(state => state.auth)
  const { data: courseData } = useGet<ICourseEnrollment[]>(
      `/course-enrollment/my-enrollments`,
      ["course-published"]
    );
  const data = [
    {
      icon: BookOpen,
      shape: "/images/dashboard/cardShape2.svg",
      title: "Enrolled Courses",
      count: courseData?.data?.length || 0,
    },
    {
      icon: FileText,
      shape: "/images/dashboard/cardShape1.svg",
      title: "Completed Quizzes ",
      count: 10,
    }
  ];
  return (
    <div>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {firstName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Continue your learning journey
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground"
            >
              <Trophy className="h-3 w-3 mr-1" />
              Level 5
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <Card
              key={index}
              className="group group hover:bg-dashboard-primary "
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primaryLight group-hover:bg-white border border-[#C6DFF8] rounded-lg">
                    <item.icon className="h-8 w-8 text-dashboard-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground group-hover:text-white">
                      {item.count}
                    </p>
                    <p className="text-sm text-muted-foreground group-hover:text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/user-icon.png" />
                  <AvatarFallback>{firstName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/student-profile.png" />
                  <AvatarFallback className="bg-dashboard-primary text-white text-lg">
                    {firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Student
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData?.data?.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">
                        {course?.course?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        by {course?.course?.organization?.name}
                      </p>
                    </div>
                    <Button onClick={() => router.push(`/user-dashboard/my-courses/${course?.course?.id}`)} size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
