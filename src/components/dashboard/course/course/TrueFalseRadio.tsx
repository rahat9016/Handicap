import { useFormContext } from "react-hook-form";
import { QuizForm } from "../Quiz/CreateUpdateCourseQuiz";

const TrueFalseRadio = ({ 
  questionIndex, 
  value 
}: { 
  questionIndex: number; 
  value: string; 
}) => {
  const { setValue, watch } = useFormContext<QuizForm>();
  
  const options = watch(`questions.${questionIndex}.options`);
  const isChecked = options[0]?.optionText === value && options[0]?.isCorrect;

  const handleChange = () => {
    setValue(
      `questions.${questionIndex}.options.0.optionText`,
      value
    );
    setValue(
      `questions.${questionIndex}.options.0.isCorrect`,
      true
    );
    // Set the other option
    setValue(
      `questions.${questionIndex}.options.1.optionText`,
      value === 'True' ? 'False' : 'True'
    );
    setValue(
      `questions.${questionIndex}.options.1.isCorrect`,
      false
    );
  };

  return (
    <div className="flex items-center">
      <input
        type="radio"
        checked={isChecked}
        onChange={handleChange}
        className="mr-2"
      />
      <span>{value}</span>
    </div>
  );
};

export default TrueFalseRadio;