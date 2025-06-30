import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import CoursePreview from "./CoursePreview";
import CourseVideo from "./CourseVideo";

export default function CourseVideoStep() {
  return (
    <div>
      <div className="container">
        <div className="w-3/4">
          <Title className="mb-3">Creating an Inclusive Workplace</Title>
          <Paragraph className="text-[#8F8F8F] mb-14">
            Disability inclusion means ensuring that persons with disabilities
            have equal opportunities to participate fully in all areas of life
          </Paragraph>
        </div>
        <div className="flex items-start gap-4 mb-10">
          <div className="w-3/4 lg:h-[500px]">
            <div></div>
            <CourseVideo />
          </div>
          <div className="w-1/4">
            <CoursePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
