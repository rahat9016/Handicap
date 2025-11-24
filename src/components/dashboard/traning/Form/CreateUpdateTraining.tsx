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
import { TrainingFormType, trainingSchema } from "../Schema/Training";
import { ITraining } from "../types/Training";
import TrainingForm from "./TrainingForm";

export default function CreateUpdateTraining({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ITraining | undefined;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<TrainingFormType>(
    "/resource-categories",
    (data) => {
      console.log("POST success", data);
    },
    [["resource-categories"], ["categories"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch(
    (data) => console.log("Success", data),
    [["resource-categories"]]
  );

  const methods = useForm<TrainingFormType>({
    resolver: yupResolver(trainingSchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        link: initialValues.link
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        link:"",
        isActive: false,
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: TrainingFormType) => {
    const organizedData: {
      name: string;
      link: string | undefined
    } = {
      name: data.name,
      link: data.link
    };
    if (initialValues) {
      const newChangedData = getChangedFields(data, initialValues);
      patchAsync({
        url: `/resource-categories/${initialValues.id}`,
        data: newChangedData,
      }).then(() => {
        console.log("Resource updated successfully");
        onClose();
        // Reset the form after successful submission
        methods.reset();
      });
      return;
    }
    mutateAsync(organizedData)
      .then(() => {
        toast.success("Training created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create Training");
        console.error(error);
      });
  };
  const isPending = isPostPending || isPatchPending;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Training" : "Create Training"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <TrainingForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={error || patchError}
            isPending={isPending}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
