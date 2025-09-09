import { useFormContext } from "react-hook-form";
import { QuizForm } from "../Quiz/CreateUpdateCourseQuiz";

const CorrectAnswerRadio = ({ 
  questionIndex, 
  optionIndex 
}: { 
  questionIndex: number; 
  optionIndex: number; 
}) => {
  const { watch, setValue } = useFormContext<QuizForm>();
  
  const options = watch(`questions.${questionIndex}.options`);
  const isChecked = options[optionIndex]?.isCorrect;

  const handleChange = () => {
    // Set all options to false first
    options.forEach((_, idx) => {
      setValue(
        `questions.${questionIndex}.options.${idx}.isCorrect`,
        false
      );
    });
    // Set the selected option to true
    setValue(
      `questions.${questionIndex}.options.${optionIndex}.isCorrect`,
      true
    );
  };

  return (
    <input
      type="radio"
      checked={isChecked}
      onChange={handleChange}
      className="ml-2"
    />
  );
};

export default CorrectAnswerRadio;