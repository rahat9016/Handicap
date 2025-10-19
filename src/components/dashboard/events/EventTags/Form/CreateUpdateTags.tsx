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
import { TagsFormType, tagsSchema } from "../Schema/Tags";
import { ITags } from "../types/Tags";
import TagForm from "./TagForm";

export default function CreateUpdateTags({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ITags | undefined;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<TagsFormType>(
    "/event-tags",
    (data) => {
      console.log("POST success", data);
    },
    [["event-tags"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch<TagsFormType>(
    (data) => {
      console.log("PATCH success", data);
    },
    [["event-tags"]]
  );

  const methods = useForm<TagsFormType>({
    resolver: yupResolver(tagsSchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
        name: initialValues?.name,
        isActive: initialValues?.isActive,
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: TagsFormType) => {
    const organizedData = {
      name: data.name,
    };

    if (initialValues) {
      const newChangedData = getChangedFields(data, initialValues);
      patchAsync({
        url: `/event-tags/${initialValues.id}`,
        data: newChangedData,
      }).then(() => {
        toast.success("Keyword updated successfully");
        onClose();
        methods.reset();
      });
      return;
    }

    mutateAsync(organizedData)
      .then(() => {
        toast.success("Keyword created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create keyword");
        console.error(error);
      });
  };
  const isPending = isPostPending || isPatchPending;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Tags" : "Create Tags"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <TagForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={error || patchError}
            isPending={isPending || isPatchPending}
          />
          {/* <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Name" required />
              <ControlledInputField
                name="name"
                placeholder="Enter the category name..."
              />
            </div>
            <ErrorMessage error={error} />
            <ErrorMessage error={patchError} />
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="submit"
                className="bg-dashboard-primary hover:bg-dashboard-primary text-white"
              >
                {initialValues ? "Update" : "Create"}
              </Button>
            </div>
          </form> */}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
