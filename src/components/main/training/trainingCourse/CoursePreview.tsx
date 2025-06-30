import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Checkbox } from "@/components/ui/checkbox";

export default function CoursePreview() {
  return (
    <div>
      <div className="flex w-full bg-black px-4 py-5 rounded-t-xl items-center justify-between">
        <div className="">
          <Title className="text-white font-bold text-sm">Course Preview</Title>
          <Paragraph className="text-[#B7B7B7]">4 Modules (Videos)</Paragraph>
        </div>
        <div className="border border-white rounded-full px-3 py-1.5">
          <Paragraph className="text-white text-xs font-medium">40%</Paragraph>
        </div>
      </div>
      <div className="bg-[#F9F9F9] overflow-y-auto flex flex-col gap-5  h-[408px] px-3 py-9">
        {Array.from({ length: 6 }).map((_, idx) => {
          const checkboxId = `course-checkbox-${idx}`;
          return (
            <div
              key={idx}
              className="bg-[#1651CF] flex items-start gap-2 px-5 py-3 rounded-lg"
            >
              <Checkbox id={checkboxId} />
              <label htmlFor={checkboxId} className="cursor-pointer">
                <Title className="text-white font-medium text-sm lg:text-sm leading-none">
                  Understanding Disability Inclusion
                </Title>
                <Paragraph className="text-white lg:text-xs">
                  Video • 15:25
                </Paragraph>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
