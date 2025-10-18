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
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<CategoryFormType>(
    "/news-category",
    (data) => {
      console.log("POST success", data);
    },
    [["news-category"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch((data) => console.log("Success", data), [["news-category"]]);

  const methods = useForm<CategoryFormType>({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
        isActive: initialValues?.isActive,
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
    } = {
      name: data.name,
      description: data.description,
    };
    const newChangedData = getChangedFields(data, initialValues);
    if (initialValues) {
      patchAsync({
        url: `/news-category/${initialValues.id}`,
        data: newChangedData,
      }).then(() => {
        onClose();
        methods.reset();
      });
      return;
    }
    mutateAsync(organizedData)
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
          <CategoryForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={error || patchError}
            isPending={isPending}
          />
          {/* <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
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
            {!!initialValues && (
              <div className="mb-4">
                <InputLabel label="Is Active" />
                <ControlledCheckField
                  name="isActive"
                  label="Active (Visible on website)"
                />
              </div>
            )}
            <ErrorMessage error={error || patchError} />
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
