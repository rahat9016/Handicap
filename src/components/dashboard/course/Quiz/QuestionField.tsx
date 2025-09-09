import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import ControlledRadioField from "../course/ControlledRadioField";
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

  const { fields, append, remove: removeOption } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  return (
    <div className="p-6 border rounded-lg bg-gray-50 shadow-sm">
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
          placeholder="Enter your question..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <InputLabel label="Question Type" required />
          <ControlledSelectField
            name={`questions.${questionIndex}.questionType`}
            options={[
              { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
              { value: "TRUE_FALSE", label: "True / False" },
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

      {/* MULTIPLE CHOICE */}
      {questionType === "MULTIPLE_CHOICE" && (
        <div>
          <InputLabel label="Options" required />
          <div className="space-y-2">
            {fields.map((field, optionIndex) => (
              <div key={field.id} className="flex items-center gap-2">
                <ControlledInputField
                  name={`questions.${questionIndex}.options.${optionIndex}.optionText`}
                  placeholder={`Option ${optionIndex + 1}`}
                />
                <ControlledRadioField
                  name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                  value="true"
                  label="Correct"
                />
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() =>
              append({
                optionText: "",
                isCorrect: false,
                sequenceNumber: fields.length + 1,
              })
            }
          >
            ➕ Add Option
          </Button>
        </div>
      )}

      {/* TRUE/FALSE */}
      {questionType === "TRUE_FALSE" && (
        <div>
          <InputLabel label="Correct Answer" required />
          <div className="flex gap-4">
            <ControlledRadioField
              name={`questions.${questionIndex}.correctAnswer`}
              value="true"
              label="True"
            />
            <ControlledRadioField
              name={`questions.${questionIndex}.correctAnswer`}
              value="false"
              label="False"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionField;
