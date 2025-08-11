import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGet } from "@/hooks/useGet";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryForm, categorySchema } from "./Schema/Category";
import { IResource } from "./types/Categories";

export default function CreateUpdateCategories({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IResource | undefined;
}) {
  const { data } = useGet<IResource[]>("/resource-categories/all-parent", [
    "categories",
  ]);
  const {
    mutateAsync,
    error,
    reset: postReset,
  } = usePost<CategoryForm>(
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
  } = usePatch((data) => console.log("Success", data), [["resource-categories"]]);

  const methods = useForm<CategoryForm>({
    resolver: yupResolver(categorySchema),
  });
  console.log(initialValues);
  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
        category: String(initialValues.parentId) || "",
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        description: "",
        category: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: CategoryForm) => {
    const organizedData: { name: string; description: string | undefined; parentId?: number } = {
      name: data.name,
      description: data.description,
    }
    if(data.category === ""){
      organizedData.parentId = Number(data.category);
    }
    if (initialValues) {
      patchAsync({
        url: `/resource-categories/${initialValues.id}`,
        data: organizedData,
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

  const options = mapToSelectOptions(data?.data, "name", "id");
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
              <InputLabel label="Category" />
              <ControlledSelectField
                options={options}
                name="category"
                placeholder="Select Category"
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
