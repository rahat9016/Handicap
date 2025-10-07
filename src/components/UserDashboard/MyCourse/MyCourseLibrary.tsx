import { ICourseEnrollment } from "@/app/[locale]/user-dashboard/my-courses/page";
import MyCourseCard from "./trainingCourse/MyCourseCard";

export default function MyCourseLibrary({
  courses,
}: {
  courses: ICourseEnrollment[];
}) {
  return (
    <div>
      {courses.length === 0 ? (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-slate-50 rounded-sm">
          <h1 className="font-inter text-xl text-black">
            Course data not available{" "}
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {courses?.map((course, index) => {
            return (
              <MyCourseCard
                key={index}
                {...course?.course}
                organization={course.course.organization!}
                location={`/user-dashboard/my-courses/${course.course.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
