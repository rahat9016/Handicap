import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
// import { getChangedFields } from "@/utils/getChangedFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TagsFormType, tagsSchema } from "../Schema/Tags";
import { ITags } from "../types/Tags";
import TagsForm from "./TagsForm";

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
    "/news-tag",
    () => toast.success("Tag created successfully"),
    [["news-tag"]]
  );

  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch<TagsFormType>(
    () => toast.success("Tag updated successfully"),
    [["news-tag"]]
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
        isActive: false,
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
      // const newChangedData = getChangedFields(data, initialValues);
      const newData = {
        name: data.name,
        isActive: data.isActive,
      };
      patchAsync({
        url: `/news-tag/${initialValues.id}`,
        data: newData,
      }).then(() => {
        // toast.success("Tag updated successfully");
        onClose();
        methods.reset();
      });
      return;
    }
    // If initialValues is not provided, it means we are creating a new keyword
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
          <TagsForm
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
