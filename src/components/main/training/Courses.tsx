import CoursesFilter from "./CoursesFilter";
import CoursesList from "./CoursesList";

export default function Courses() {
  return (
    <div className="bg-[#f3f3f3]">
      <div className="container py-10 lg:py-20 lg:pb-40">
        <div className="flex items-start gap-6">
          <div className="w-3/12 lg:w-2/12">
            <CoursesFilter />
          </div>
          <div className="w-9/12 lg:w-10/12">
            <CoursesList />
          </div>
        </div>
      </div>
    </div>
  );
}
