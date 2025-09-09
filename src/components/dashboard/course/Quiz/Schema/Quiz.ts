// adjust import if needed
import * as yup from "yup";

export const quizFormSchema = yup.object({
  title: yup
    .string()
    .required("Quiz title is required")
    .min(3, "Title must be at least 3 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),

  questions: yup
    .array()
    .of(
      yup.object({
        questionText: yup
          .string()
          .required("Question text is required")
          .min(3, "Question must be at least 3 characters"),

        questionType: yup
          .mixed<"MULTIPLE_CHOICE" | "TRUE_FALSE">()
          .oneOf(["MULTIPLE_CHOICE", "TRUE_FALSE"])
          .required("Question type is required"),

        points: yup
          .number()
          .typeError("Points must be a number")
          .positive("Points must be greater than 0")
          .required("Points are required"),

        sequenceNumber: yup.number().required(),

        options: yup.array().when("questionType", (val, schema) => {
          const type = val as unknown as string;
          if (type === "MULTIPLE_CHOICE") {
            return schema
              .of(
                yup.object({
                  optionText: yup.string().required("Option text is required"),
                  isCorrect: yup.boolean().required(),
                  sequenceNumber: yup.number().required(),
                })
              )
              .min(2, "At least two options are required")
              .test(
                "at-least-one-correct",
                "At least one option must be correct",
                (options) =>
                  options ? options.some((opt) => opt.isCorrect) : false
              );
          }
          return schema.strip();
        }),

        correctAnswer: yup.string().when("questionType", (val, schema) => {
          const type = val as unknown as string;
          if (type === "TRUE_FALSE") {
            return schema
              .oneOf(["true", "false"], "Correct answer must be true or false")
              .required("Correct answer is required");
          }
          return schema.strip();
        }),
      })
    )
    .min(1, "At least one question is required"),
});
