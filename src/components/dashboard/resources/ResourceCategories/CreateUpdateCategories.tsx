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
import { usePost } from "@/hooks/usePost";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryForm, categorySchema } from "./Schema/Category";
import { IResource } from "./types/Categories";

export default function CreateUpdateCategories({
  isOpen,
  onClose,
}: // initialValues,
{
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IResource | undefined;
}) {
  const { data } = useGet<IResource[]>("/resource-categories/all-parent", [
    "categories",
  ]);
  const { mutateAsync, error } = usePost<CategoryForm>(
    "/resource-categories",
    (data) => {
      console.log("POST success", data);
    },
    [["resource-categories"], ["categories"]]
  );

  const methods = useForm<CategoryForm>({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = (data: CategoryForm) => {
    mutateAsync(data)
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
          <DialogTitle>Create Category</DialogTitle>
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
            {error?.errors?.length && (
              <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
                {error?.errors && error?.errors[0]}
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="submit"
                className="bg-dashboard-primary hover:bg-dashboard-primary text-white"
              >
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
