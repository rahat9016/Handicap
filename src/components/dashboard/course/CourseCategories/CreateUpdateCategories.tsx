import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryForm, categorySchema } from "./Schema/Category";
import { ICategory } from "./types/Categories";

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
    error,
    reset: postReset,
  } = usePost<CategoryForm>(
    "/course-category",
    (data) => {
      console.log("POST success", data);
    },
    [["course-category"], ["categories"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
  } = usePatch((data) => console.log("Success", data), [["resource-categories"]]);

  const methods = useForm<CategoryForm>({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        description: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: CategoryForm) => {
    const organizedData: { name: string; description?: string | undefined; } = {
      name: data.name,
      
    }
    if (data.description) {
      organizedData.description = data.description;
    }
    if (initialValues) {
      patchAsync({
        url: `/resource-categories/${initialValues.id}`,
        data: organizedData,
      }).then(() => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialValues ? "Edit Category" : "Create Category"}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Name" required />
              <ControlledInputField
                name="name"
                placeholder="Enter the category name..."
              />
            </div>
            <div className="mb-4">
              <InputLabel label="Description" />
              <ControlledTextareaField
                name="description"
                placeholder="Write down here the description..."
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
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
