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
import { CategoryForm, categorySchema } from "../Schema/Category";
import { ICategory } from "../types/Categories";
import EventCategoryForm from "./EventCategoryForm";

export default function CreateUpdateCategories({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ICategory | undefined;
}) {
  const {
    mutateAsync,
    error: postError,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<CategoryForm>(
    "/event-categories",
    () => {
      console.log("POST success");
    },
    [["event-categories"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch((data) => console.log("Success", data), [["event-categories"]]);

  const methods = useForm<CategoryForm>({
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

  const onSubmit = (data: CategoryForm) => {
    if (initialValues) {
      const newChangedData = getChangedFields(data, initialValues);
      patchAsync({
        url: `/event-categories/${initialValues.id}`,
        data: newChangedData,
      }).then(() => {
        console.log("Events Category updated successfully");
        onClose();
        methods.reset();
      });
      return;
    }
    const { isActive: _isActive, ...postData } = data;
    mutateAsync(postData)
      .then(() => {
        toast.success("News Category created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create category");
        console.error(error);
      });
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
          <EventCategoryForm
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
