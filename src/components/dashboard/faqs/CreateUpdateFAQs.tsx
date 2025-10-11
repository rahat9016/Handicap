import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { getChangedFields } from "@/utils/getChangedFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FAQsSchema, pageSectionSchema } from "./schema";
import { IFaqItem } from "./types";

interface CreateUpdateFAQsProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IFaqItem | undefined;
}

const CreateUpdateFAQs = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateFAQsProps) => {
  const {
    mutateAsync,
    error,
    reset: postReset,
  } = usePost(
    "/faqs",
    (data) => {
      console.log("POST success", data);
    },
    [["faqs"]]
  );

  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
  } = usePatch((data) => console.log("Success", data), [["faqs"]]);

  const isEditMode = !!initialValues;
  const methods = useForm<FAQsSchema>({
    resolver: yupResolver(pageSectionSchema),
    defaultValues: {
      question: "",
      questionBn: "",
      answer: "",
      answerBn: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        question: "",
        questionBn: "",
        answer: "",
        answerBn: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: FAQsSchema) => {
    data = {
      question: data.question,
      questionBn: data.questionBn,
      answer: data.answer,
      answerBn: data.answerBn,
    };
    if (isEditMode) {
      const changedData = getChangedFields<FAQsSchema>(data, initialValues);
      patchAsync({
        url: `/faqs/${initialValues?.id}`,
        data: changedData,
      }).then(() => {
        console.log("Page section updated successfully");
        toast.success("Page section updated successfully");
        onClose();
        // Reset the form after successful submission
        methods.reset();
      });
      return;
    }
    mutateAsync(data)
      .then(() => {
        toast.success("FAQ created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create FAQ");
        console.error(error);
      });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        methods.reset();
        onClose();
      }}
    >
      <DialogContent className="bg-white !max-w-[60vw] w-[60vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Page Section</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <InputLabel label="Question (English)" />
                <ControlledInputField
                  name="question"
                  placeholder="Frequently asked question (EN)"
                />
              </div>

              <div>
                <InputLabel label="Question (Bangla)" />
                <ControlledInputField
                  name="questionBn"
                  placeholder="Frequently asked question (BN)"
                />
              </div>

              <div>
                <InputLabel label="Answer (English)" />
                <ControlledInputField name="answer" placeholder="Answer (EN)" />
              </div>

              <div>
                <InputLabel label="Answer (Bangla)" />
                <ControlledInputField
                  name="answerBn"
                  placeholder="Answer (BN)"
                />
              </div>
            </div>
            {error?.errors?.length ||
              (patchError?.errors?.length && (
                <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
                  {error?.errors && error?.errors[0]}
                  {patchError?.errors && patchError?.errors[0]}
                </div>
              ))}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="min-w-[100px] bg-dashboard-primary hover:bg-dashboard-primary  text-white hover:text-white"
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateFAQs;
