"use client";

import HeroSection from "@/components/share/HeroSection";
import useActiveStepper from "@/hooks/useActiveStepper";

import Training from "./Training";

export default function TrainingCourse() {
  const { active, handleNext, handlePrev } = useActiveStepper();

  return (
    <div>
      <HeroSection/>
      {/* <TrainingStepper steps={steps} /> */}
      <Training active={active} handleNext={handleNext} handlePrev={handlePrev}  />
    </div>
  );
}
