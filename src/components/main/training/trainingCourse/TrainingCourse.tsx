"use client";

import HeroSection from "@/components/share/HeroSection";
import useActiveStepper from "@/hooks/useActiveStepper";

import Training from "./Training";
import TrainingStepper from "./TrainingStepper";

export default function TrainingCourse() {
  const { steps, active, handleNext, handlePrev } = useActiveStepper();
  // const params = useParams<{ local: string; id: string }>();
console.log(active)
  return (
    <div>
      <HeroSection/>
      <TrainingStepper steps={steps} />
      <Training active={active} handleNext={handleNext} handlePrev={handlePrev}  />
    </div>
  );
}
