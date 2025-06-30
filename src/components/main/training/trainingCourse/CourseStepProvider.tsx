import CourseVideoStep from "./CourseVideoStep";

const CourseStepProvider = ({ activeStep }: { activeStep: number }) => {
  switch (activeStep) {
    case 0:
      return <CourseVideoStep />;
    case 1:
      return <CourseVideoStep />;
    case 2:
      return <CourseVideoStep />;
    case 3:
      return <CourseVideoStep />;
    default:
      return null;
  }
};

export default CourseStepProvider;
