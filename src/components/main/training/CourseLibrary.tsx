import EventCalendar from "../events/EventCalendar";
import CourseCard from "./CourseCard";
import { ICourse } from "./types/traning";

export default function CourseLibrary({ courses }: { courses: ICourse[] }) {
  //   const {
  //     userInformation: { id },
  //   } = useAppSelector((state) => state.auth);

  return (
    <div>
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-slate-50 rounded-sm">
          {/* <h1 className="font-inter text-xl text-black">
            The Events will be available soon
          </h1>
          <p className="text-sm font-inter">
            Please select right resource type
          </p> */}
          <EventCalendar />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {courses
            ?.filter(
              (
                course
              ): course is ICourse & {
                organization: NonNullable<ICourse["organization"]>;
              } => !!course.organization
            )
            .map((course, index) => (
              <CourseCard
                key={index}
                {...course}
                location={`/training/${course.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
