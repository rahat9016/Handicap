import CourseCard from "./CourseCard";
import { ICourse } from "./types/traning";

export default function CourseLibrary({
   courses
}: {
  courses: ICourse[]
}) {

  return (
    <div>
      {courses.length === 0 ? (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-slate-50 rounded-sm">
          <h1 className="font-inter text-xl text-black">The training package will be available soon</h1>
          <p className="text-sm font-inter">Please select right resource type</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            ?.filter((course): course is ICourse & { organization: NonNullable<ICourse["organization"]> } => !!course.organization)
            .map((course, index) => (
              <CourseCard key={index} {...course} location={`/training/${course.id}`} />
            ))}
        </div>
      )}
    </div>
  );
}
