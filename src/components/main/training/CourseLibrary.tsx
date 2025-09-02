import CourseCard from "./CourseCard";
import { ICourse } from "./types/traning";

export default function CourseLibrary({
   courses
}: {
  courses: ICourse[]
}) {
//   const {
//     userInformation: { id },
//   } = useAppSelector((state) => state.auth);
  
  return (
    <div>
      {courses.length === 0 ? (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-slate-50 rounded-sm">
          <h1 className="font-inter text-xl text-black">Resource data not available </h1>
          <p className="text-sm font-inter">Please select right resource type</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {courses?.map((course, index) => {
            return (
                <CourseCard key={index} {...course} />
            );
          })}
        </div>
      )}
    </div>
  );
}
