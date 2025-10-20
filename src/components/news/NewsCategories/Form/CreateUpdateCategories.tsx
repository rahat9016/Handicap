import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
// import { getChangedFields } from "@/utils/getChangedFields";
========
import { getChangedFields } from "@/utils/getChangedFields";
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
import { CategoryFormType, categorySchema } from "../Schema/Category";
import { INews } from "../types/Categories";
import CategoryForm from "./CategoryForm";
========
import { CategoryForm, categorySchema } from "../Schema/Category";
import { ICategory } from "../types/Categories";
import EventCategoryForm from "./EventCategoryForm";
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx

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
    error: postError,
    reset: postReset,
    isPending: isPostPending,
<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
  } = usePost<CategoryFormType>(
    "/news-category",
    (data) => {
      console.log("POST success", data);
========
  } = usePost<CategoryForm>(
    "/event-categories",
    () => {
      console.log("POST success");
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx
    },
    [["news-category"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
  } = usePatch((data) => console.log("Success", data), [["news-category"]]);
========
  } = usePatch((data) => console.log("Success", data), [["event-categories"]]);
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx

  const methods = useForm<CategoryFormType>({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
        isActive: initialValues?.isActive,
========
        isActive: initialValues.isActive,
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx
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

<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
  const onSubmit = (data: CategoryFormType) => {
    console.log('data', data)
    const organizedData: {
      name: string;
      description: string | undefined;
    } = {
      name: data.name,
      description: data.description,
    };
    // const newChangedData = getChangedFields(data, initialValues);
========
  const onSubmit = (data: CategoryForm) => {
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx
    if (initialValues) {
      const newChangedData = getChangedFields(data, initialValues);
      patchAsync({
<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
        url: `/news-category/${initialValues.id}`,
        data: data,
========
        url: `/event-categories/${initialValues.id}`,
        data: newChangedData,
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx
      }).then(() => {
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
<<<<<<<< HEAD:src/components/news/NewsCategories/Form/CreateUpdateCategories.tsx
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
========
          <EventCategoryForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={postError || patchError}
            isPending={isPending}
          />
>>>>>>>> 1cb4c18 (changed):src/components/dashboard/events/EventsCategories/Form/CreateUpdateCategories.tsx
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
