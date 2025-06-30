import { Button } from "@/components/ui/button";
import CourseStepProvider from "./CourseStepProvider";

export default function Training({ active, handleNext, handlePrev }: { active: number; handleNext: () => void; handlePrev: () => void }) {
  return (
    <div className="container pb-10">
      <CourseStepProvider activeStep={active} />
      <div className="flex items-center justify-between w-full lg:w-3/4">
        <Button onClick={handlePrev} className="bg-[#D9D9D9] hover:bg-[#D9D9D9] text-[#01014E] w-[113px] rounded-none h-10">Previous</Button>
        <Button onClick={handleNext} className="bg-primary text-white w-[113px] rounded-none h-10">Next</Button>
      </div>
    </div>
  );
}
