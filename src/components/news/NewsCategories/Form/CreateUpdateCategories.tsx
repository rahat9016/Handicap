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
import { CategoryFormType, categorySchema } from "../Schema/Category";
import { INews } from "../types/Categories";
import CategoryForm from "./CategoryForm";

export default function CreateUpdateCategories({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: INews | undefined;
}) {
  const {
    mutateAsync: postAsync,
    error: postError,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<CategoryFormType>(
    "/news-category",
    (data) => console.log("POST success", data),
    [["news-category"]]
  );

  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch(
    (data) => console.log("PATCH success", data),
    [["news-category"]]
  );

  const methods = useForm<CategoryFormType>({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
        isActive: initialValues.isActive,
      });
    }
  }, [initialValues, methods]);

  // reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        description: "",
        isActive: false,
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = async (data: CategoryFormType) => {
    try {
      if (initialValues) {
        const newChangedData = getChangedFields(data, initialValues);

        if (Object.keys(newChangedData).length === 0) {
          toast.info("No changes detected.");
          return;
        }

        await patchAsync({
          url: `/news-category/${initialValues.id}`,
          data: newChangedData,
        });

        toast.success("News Category updated successfully");
      } else {
        const postPayload = {
          name: data.name,
          description: data.description,
        };

        await postAsync(postPayload);
        toast.success("News Category created successfully");
      }

      onClose();
      methods.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save category");
    }
  };

  const isPending = isPostPending || isPatchPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <CategoryForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={postError || patchError}
            isPending={isPending}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
