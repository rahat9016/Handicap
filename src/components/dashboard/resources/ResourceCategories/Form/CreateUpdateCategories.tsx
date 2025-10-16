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
import { IResource } from "../types/Categories";
import CategoryForm from "./CategoryForm";

export default function CreateUpdateCategories({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IResource | undefined;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<CategoryFormType>(
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

  const onSubmit = (data: CategoryFormType) => {
    const organizedData: {
      name: string;
      description: string | undefined;
      parentId?: number;
    } = {
      name: data.name,
      description: data.description,
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
        toast.success("Category created successfully");
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
          <CategoryForm
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
