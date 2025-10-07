// adjust import if needed
import * as yup from "yup";

export const quizFormSchema = yup.object({
  title: yup
    .string()
    .required("Quiz title is required")
    .min(2, "Title must be at least 3 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(2, "Description must be at least 5 characters"),

  timeLimitMinutes: yup
    .number()
    .typeError("Time Limit must be a number")
    .positive("Time Limit must be greater than 0")
    .required("Time Limit are required"),

  passingScore: yup
    .number()
    .typeError("Passing score must be a number")
    .positive("Passing score must be greater than 0")
    .required("Passing score is required")
    .test(
      "passing-score-validation",
      "Passing score cannot exceed total points of all questions",
      function (passingScore) {
        const { questions } = this.parent;
        if (!questions || !Array.isArray(questions)) return true;

        const totalPoints = questions.reduce((sum, question) => {
          return sum + (question.points || 0);
        }, 0);

        return passingScore <= totalPoints;
      }
    ),

  questions: yup
    .array()
    .of(
      yup.object({
        questionText: yup
          .string()
          .required("Question text is required")
          .min(3, "Question must be at least 3 characters"),

        questionType: yup
          .mixed<"MULTIPLE_CHOICE" | "MCQ" | "TRUE_FALSE">()
          .oneOf(["MULTIPLE_CHOICE", "MCQ", "TRUE_FALSE"])
          .required("Question type is required"),

        points: yup
          .number()
          .typeError("Points must be a number")
          .positive("Points must be greater than 0")
          .required("Points are required"),

        sequenceNumber: yup.number().required(),

        options: yup
          .array()
          .of(
            yup.object({
              optionText: yup.string().required("Option text is required"),
              isCorrect: yup.boolean().required(),
              sequenceNumber: yup.number().required(),
            })
          )
          .when("questionType", {
            is: "MULTIPLE_CHOICE",
            then: (schema) =>
              schema
                .min(1, "At least one options are required")
                .test(
                  "at-least-one-correct",
                  "At least one option must be correct",
                  (options) =>
                    options ? options.some((opt) => opt.isCorrect) : false
                ),
          })
          .when("questionType", {
            is: "MCQ",
            then: (schema) =>
              schema
                .min(1, "At least one options are required")
                .test(
                  "exactly-one-correct",
                  "Exactly one option must be marked as correct",
                  (options) =>
                    options
                      ? options.filter((o) => o.isCorrect).length === 1
                      : false
                ),
          })
          .when("questionType", {
            is: "TRUE_FALSE",
            then: (schema) => schema.notRequired(),
          }),
        // .when("questionType", {
        //   is: "MULTIPLE_CHOICE",
        //   then: (schema) =>
        //     schema
        //       .min(1, "At least two options are required")
        //       .test(
        //         "at-least-one-correct",
        //         "At least one option must be correct",
        //         (options) =>
        //           options ? options.some((opt) => opt.isCorrect) : false
        //       ),
        //   otherwise: (schema) => schema.notRequired(),
        // }),
        // .when("questionType", {
        //   is: "MCQ",
        //   then: (schema) =>
        //     schema
        //       .min(1, "At least two options are required")
        //       .test(
        //         "exactly-one-correct",
        //         "Exactly one option must be marked as correct",
        //         (options) =>
        //           options
        //             ? options.filter((o) => o.isCorrect).length === 1
        //             : false
        //       ),
        //   otherwise: (schema) => schema.notRequired(),
        // }),

        correctAnswer: yup.string().when("questionType", {
          is: "TRUE_FALSE",
          then: (schema) =>
            schema
              .oneOf(["true", "false"], "Correct answer must be true or false")
              .required("Correct answer is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    )
    .min(1, "At least one question is required")
    .test(
      "total-points-validation",
      "Total points must be at least equal to passing score",
      function (questions) {
        const { passingScore } = this.parent;
        if (!passingScore || !questions) return true;

        const totalPoints = questions.reduce((sum, question) => {
          return sum + (question.points || 0);
        }, 0);

        return totalPoints >= passingScore;
      }
    ),
});
