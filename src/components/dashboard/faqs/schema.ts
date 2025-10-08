import * as Yup from "yup";
import { InferType } from "yup";

export const pageSectionSchema = Yup.object().shape({
  question: Yup.string().required(),
  questionBn: Yup.string().required(),
  answer: Yup.string().required(),
  answerBn: Yup.string().required(),
});

export type FAQsSchema = InferType<typeof pageSectionSchema>;
