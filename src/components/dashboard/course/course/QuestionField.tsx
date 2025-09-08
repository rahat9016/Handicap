import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import ControlledRadioField from "./ControlledRadioField";
import CorrectAnswerRadio from "./CorrectAnswerRadio";
import { QuizForm } from "./CreateUpdateCourseQuiz";

const QuestionField = ({
  questionIndex,
  remove,
  isFirst,
}: {
  questionIndex: number;
  remove: (index: number) => void;
  isFirst: boolean;
}) => {
  const { control, watch } = useFormContext<QuizForm>();
  const questionType = watch(`questions.${questionIndex}.questionType`);

  const {
    fields,
    append,
    remove: removeOption,
  } = useFieldArray({

    control,
    name: `questions.${questionIndex}.options`,
  });

  const addOption = () => {
    append({
      optionText: "",
      isCorrect: false,
      sequenceNumber: fields.length + 1,
    });
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
        {!isFirst && (
          <Button 
            type="button" 
            onClick={() => remove(questionIndex)} 
            variant="destructive"
            size="sm"
          >
            Remove
          </Button>
        )}
      </div>

      <div className="mb-4">
        <InputLabel label="Question Text" required />
        <ControlledInputField
          name={`questions.${questionIndex}.questionText`}
          placeholder="Enter your question here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <InputLabel label="Question Type" required />
          <ControlledSelectField
            name={`questions.${questionIndex}.questionType`}
            options={[
              { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
              { value: 'TRUE_FALSE', label: 'True/False' },
              { value: 'SHORT_ANSWER', label: 'Short Answer' },
              { value: 'ESSAY', label: 'Essay' },
            ]}
          />
        </div>
        <div>
          <InputLabel label="Points" required />
          <ControlledInputField
            name={`questions.${questionIndex}.points`}
            type="number"
          />
        </div>
      </div>

      {/* Options for Multiple Choice */}
      {questionType === 'MULTIPLE_CHOICE' && (
        <div className="mt-4">
          <InputLabel label="Options" required />
          <div className="space-y-3">
            {fields.map((field, optionIndex) => (
              <div key={field.id} className="flex items-center gap-2">
                <ControlledInputField
                  name={`questions.${questionIndex}.options.${optionIndex}.optionText`}
                  placeholder={`Option ${optionIndex + 1}`}
                />
                <div className="flex items-center">
                  <CorrectAnswerRadio 
                    questionIndex={questionIndex} 
                    optionIndex={optionIndex} 
                  />
                  <span className="text-sm ml-1">Correct</span>
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeOption(optionIndex)}
                    variant="ghost"
                    size="sm"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button type="button" onClick={addOption} variant="outline" className="mt-2">
            Add Option
          </Button>
        </div>
      )}

      {/* Options for True/False */}
      {questionType === 'TRUE_FALSE' && (
        <div className="mt-4">
          <InputLabel label="Correct Answer" required />
          <div className="flex gap-4">
            <label className="flex items-center">
              <ControlledRadioField
                name={`questions.${questionIndex}.correctAnswer`}
                value="true"
                label="True"
              />
            </label>
            <label className="flex items-center">
              <ControlledRadioField
                name={`questions.${questionIndex}.correctAnswer`}
                value="false"
                label="False"
              />
            </label>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuestionField;
