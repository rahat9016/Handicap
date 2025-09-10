import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { BookOpenCheck } from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
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
  const { control, watch, setValue, formState } = useFormContext<QuizForm>();
  const questionType = watch(`questions.${questionIndex}.questionType`);

    // Get errors for this specific question
  const questionErrors = formState.errors.questions?.[questionIndex];
  const optionsError = questionErrors?.options;
  const {
    fields,
    append,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  useEffect(() => {
    if (questionType === "TRUE_FALSE") {
      // Clear options array for TRUE_FALSE questions
      setValue(`questions.${questionIndex}.options`, []);
    } else if (questionType === "MULTIPLE_CHOICE") {
      // Ensure at least one option exists for MCQ
      const currentOptions = watch(`questions.${questionIndex}.options`);
      if (!currentOptions || currentOptions.length === 0) {
        setValue(`questions.${questionIndex}.options`, [
          { optionText: "", isCorrect: false, sequenceNumber: 1 },
        ]);
      }
    }
  }, [questionType, questionIndex, setValue, watch]);

  const addOption = () => {
    append({
      optionText: "",
      isCorrect: false,
      sequenceNumber: fields.length + 1,
    });
  };

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

                <Controller
                  control={control}
                  name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                  render={({ field }) => (
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={field.value || false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span>Correct</span>
                    </label>
                  )}
                />

                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeOption(optionIndex)}
                    className="w-5 h-5 bg-rose-200 hover:bg-rose-300 text-rose-700 p-0"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
          {optionsError?.message && (
            <p className="text-red-500 text-xs mt-2 font-inter flex items-center gap-1"><BookOpenCheck size={16} /> {optionsError.message}</p>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addOption}
          >
            ➕ Add Option
          </Button>
        </div>
      )}

      {/* TRUE/FALSE */}
      {questionType === "TRUE_FALSE" && (
        <div>
          <InputLabel label="Correct Answer" required />
          <div className="flex flex-col gap-0">
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
