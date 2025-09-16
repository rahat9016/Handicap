import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  FileText,
  Play,
  Trophy,
} from "lucide-react";

export default function Dashboard() {
  const data = [
    {
      icon: BookOpen,
      shape: "/images/dashboard/cardShape2.svg",
      title: "Enrolled Courses",
      count: 14,
    },
    {
      icon: FileText,
      shape: "/images/dashboard/cardShape1.svg",
      title: "Completed Quizzes ",
      count: 10,
    },
    {
      icon: Clock,
      shape: "/images/dashboard/cardShape1.svg",
      title: "Study Time",
      count: 10,
    },
    {
      icon: Trophy,
      shape: "/images/dashboard/cardShape1.svg",
      title: "Average Score",
      count: 10,
    },
  ];
  return (
    <div>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, John!
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/student-profile.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">
                    John Doe
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Computer Science Student
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Joined March 2024
                  </p>
                </div>
              </div>
              <Button className="w-full bg-transparent" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
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
                {[
                  {
                    name: "Python Programming",
                    progress: 75,
                    instructor: "Dr. Smith",
                  },
                  {
                    name: "Data Structures",
                    progress: 60,
                    instructor: "Prof. Johnson",
                  },
                  {
                    name: "Web Development",
                    progress: 90,
                    instructor: "Ms. Davis",
                  },
                ].map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">
                        {course.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        by {course.instructor}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Python Basics Quiz",
                  score: 85,
                  status: "completed",
                  date: "2 days ago",
                },
                {
                  name: "Data Types Assessment",
                  score: 92,
                  status: "completed",
                  date: "1 week ago",
                },
                {
                  name: "Functions & Modules",
                  score: 78,
                  status: "completed",
                  date: "2 weeks ago",
                },
              ].map((quiz, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">
                      {quiz.name}
                    </h4>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Score
                      </span>
                      <Badge
                        variant={quiz.score >= 80 ? "default" : "secondary"}
                      >
                        {quiz.score}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
