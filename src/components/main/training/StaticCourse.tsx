"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const courses = [
  {
    title: "Age and Disability Inclusion in Humanitarian Action",
    link: "https://chatgpt.com/c/68f9a897-9c14-8322-86e6-23d9df6f2f7e",
  },
  {
    title: "IASC e-Learning on Gender Equality in Humanitarian Action",
    link: "https://portal.trainingcentre.unwomen.org/product/iasc-e-learning-on-gender-equality-in-humanitarian-action/?utm_source=chatgpt.com",
  },
  {
    title:
      "Collecting Data for the Inclusion of Persons with Disabilities in Humanitarian Action",
    link: "https://kayaconnect.org/course/info.php?id=1221",
  },
  {
    title: "Disability Inclusion in the Workplace",
    link: "https://alison.com/course/disability-inclusion-in-the-workplace?",
  },
  {
    title: "Disability Inclusive Disaster Risk Reduction",
    link: "https://kayaconnect.org/course/info.php?id=11411",
  },
  {
    title: "Humanitarian Aid Learning",
    link: "https://academy.europa.eu/local/euacademy/pages/course/community-overview.php?title=dg-echo-humanitarian-aid-learning",
  },
];

export default function StaticCourse() {
  return (
    <div className=" bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 sm:px-10 lg:px-20">
      {/* Section Header */}
      
      {/* Course Cards */}
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 mt-8">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Card className="rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-full mb-5">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  {course.title}
                </h2>

                <div className="mt-auto w-full">
                  <Button
                    asChild
                    className="bg-blue hover:bg-blue text-white w-full py-2 rounded-lg transition-all"
                  >
                    <a
                      href={course.link}
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
