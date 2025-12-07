"use client";

import { ITraining } from "@/components/dashboard/traning/types/Training";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useGet";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function StaticCourse() {
  const { data, isLoading } = useGet<ITraining[]>(
      `/link-courses/all?isActive=true`,
      ["link-course"]
    );
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-100 p-6 flex flex-col items-center text-center"
            >
              <Skeleton className="h-20 w-20 rounded-full mb-5" />

              <Skeleton className="h-5 w-40 mb-3" />

              <Skeleton className="h-10 w-full mt-auto rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className=" bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data?.data.map((course, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Card className="rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-full mb-5">
                  <GraduationCap className="w-16 h-16 text-blue" />
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 font-inter">
                  {course.title}
                </h2>

                <div className="mt-auto w-full">
                  <Button
                    asChild
                    className="bg-blue hover:bg-blue text-white w-full py-2 rounded-lg transition-all font-inter"
                  >
                    <a
                      href={course.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to Course
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
