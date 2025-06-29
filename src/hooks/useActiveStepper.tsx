
import { useState } from "react";

const useActiveStepper = () => {
  const [active, setActive] = useState(0);
  const [steps, setSteps] = useState([
    {
      icon: "/images/training/video.svg",
      label: "Video Tutorials",
      desc: "Pre-Recorded Videos",
      isCompleted: false,
      isActive: true,
    },
    {
      icon: "/images/training/Document.svg",
      label: "Documents",
      desc: "Course Resources",
      isCompleted: false,
      isActive: false,
    },
    {
      icon: "/images/training/Quiz.svg",
      label: "Quiz & Exams",
      desc: "Course Resources",
      isCompleted: false,
      isActive: false,
    },
    {
      icon: "/images/training/Review.svg",
      label: "Workplace",
      desc: "Accommodation",
      isCompleted: false,
      isActive: false,
    },
  ]);
  const handleNext = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => {
        if (index === active) {
          return { ...step, isActive: false, isCompleted: true };
        } else if (index === active + 1) {
          return { ...step, isActive: true };
        }
        return { ...step, isActive: false };
      })
    );

    setActive((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (active === 0) return;
    setSteps((prevStep) =>
      prevStep.map((step, index) => {
        if (index === active) {
          return { ...step, isActive: false };
        } else if (index === active - 1) {
          return { ...step, isActive: true, isCompleted: false };
        }
        return { ...step, isActive: false };
      })
    );

    setActive((prev) => prev - 1);
  };

  return { steps, active, handleNext, handlePrev };
};

export default useActiveStepper;
