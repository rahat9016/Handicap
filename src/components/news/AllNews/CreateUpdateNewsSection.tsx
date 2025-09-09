import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import MultipleImageFileInput from "@/components/share/MultipleImageFileInput";
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
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { FieldError, FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { NewsSectionForm, newsSectionSchema } from "./schema";
import { INewsSection } from "./types";
import ControlledMultiSelectField from "@/components/share/ControlledMultiSelectField";
import { INews } from "../NewsCategories/types/Categories";
import { useGet } from "@/hooks/useGet";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { ITags } from "../NewsTags/types/Tags";
const EditorWrapper = dynamic(
  () => import("@/components/share/EditorWrapper"),
  { ssr: false }
);

interface CreateUpdateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: INewsSection | undefined;
}

export default function CreateUpdateNewsSectionModal({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateSectionModalProps) {
  const { data: categoryData } = useGet<INews[]>("/news-category", [
    "news-category",
  ]);
  const { data: tagsData } = useGet<ITags[]>("/news-tag", ["news-tag"]);
  const newsTagsOptions = mapToSelectOptions(tagsData?.data, "name", "id");
  const newsCategoryOptions = mapToSelectOptions(
    categoryData?.data,
    "name",
    "id"
  );
  console.log(newsCategoryOptions);

  const { mutateAsync, error } = usePost(
    "/news/upload",
    (data) => {
      console.log("POST success", data);
    },
    [["all-news"]]
  );
  const { mutateAsync: patchAsync, error: patchError } = usePatch<FormData>(
    (data) => console.log("Success", data),
    [["all-news"]]
  );
  const isEditMode = !!initialValues;
  const methods = useForm<NewsSectionForm>({
    resolver: yupResolver(newsSectionSchema),
    defaultValues: {
      isActive: true,
      isPublished: true,
    },
    mode: "onChange",
  });
const formValues = useWatch({ control: methods.control });
console.log(formValues);

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        title: initialValues.title,
        summary: initialValues.summary,
        content: initialValues.content,
        isPublished: Boolean(initialValues.isPublished),
        isActive: Boolean(initialValues?.isActive),
        images: initialValues?.images?.map((img) => img.imageUrl) ?? [],
        categoryIds:
          initialValues?.categories?.map((cat) => cat.categoryId) ??
          [],
        tagIds: initialValues?.tags?.map((tag) => tag.tagId) ?? [],
      });
    }
    const categoryIds = initialValues;
    console.log("categoryIds", categoryIds);
  }, [initialValues, methods]);

  const onSubmit = (data: NewsSectionForm) => {
    const formData = new FormData();
    formData.append("isPublished", String(data.isPublished));
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("content", data.content);
    console.log("data", data);

    (data.categoryIds || []).forEach((id) => {
      if (id) formData.append("categoryIds", String(id));
    });
    (data.tagIds || []).forEach((id) => {
      if (id) formData.append("tagIds", String(id));
    });
    const currentImages = data.images || [];
    const newFiles = currentImages.filter((img) => img instanceof File);
    newFiles.forEach((file) => formData.append("images", file));
    const existingUrls = currentImages.filter(
      (img) => typeof img === "string"
    ) as string[];
    let imagesToDelete: {imageUrl:string;id:number}[] = [];
    if (isEditMode && initialValues?.images) {
      const oldUrls = initialValues.images.map((img) => ({
        imageUrl: img.imageUrl,
        id: img.id,
      }));

       imagesToDelete = oldUrls.filter(
        (url) => !existingUrls.includes(url.imageUrl)
      );
    }
     (imagesToDelete || []).forEach((obj) => {
       if (obj) formData.append("removeImageIds", String(obj.id));
     });
    if (isEditMode) {
      patchAsync({
        url: `/news/${initialValues?.id}`,
        data: formData,
      }).then(() => {
        console.log("News updated successfully");
        toast.success("News updated successfully");
        onClose();
        methods.reset();
      });
      return;
    }
    mutateAsync(formData)
      .then(() => {
        toast.success("News created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create news");
        console.error(error);
      });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        methods.reset();
        onClose();
      }}
    >
      <DialogContent className="bg-white !max-w-[60vw] w-[60vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create News</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Required Fields */}
              <div>
                <InputLabel label="Title" />
                <ControlledInputField
                  name="title"
                  placeholder="Main heading for the section"
                />
              </div>
              <div>
                <InputLabel label="Summary" />
                <ControlledInputField
                  name="summary"
                  placeholder="Summary for the News"
                />
              </div>
              <div>
                <InputLabel label="Category" required />
                <ControlledMultiSelectField
                  name="categoryIds"
                  placeholder="Please enter your category"
                  options={newsCategoryOptions}
                />
              </div>
              <div>
                <InputLabel label="Tags" required />
                <ControlledMultiSelectField
                  name="tagIds"
                  placeholder="Please enter your tags"
                  options={newsTagsOptions}
                />
              </div>
              <div className="col-span-2">
                <InputLabel label="Content" />
                <EditorWrapper
                  value={methods.watch("content") || ""}
                  onChange={(value) => methods.setValue("content", value)}
                />
              </div>

              {/* Action Fields */}
              <div className="col-span-2">
                <InputLabel label="Section Image" />
                <MultipleImageFileInput
                  name="images"
                  errors={{
                    images: methods.formState.errors.images as FieldError,
                  }}
                />
              </div>

              {/* Status Field */}
              <div className="col-span-2 flex items-center gap-2">
                <ControlledCheckField name="isPublished" label="Published" />
              </div>
            </div>
            {error?.errors?.length ||
              (patchError?.errors?.length && (
                <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
                  {error?.errors && error?.errors[0]}
                  {patchError?.errors && patchError?.errors[0]}
                </div>
              ))}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="min-w-[100px] bg-dashboard-primary hover:bg-dashboard-primary  text-white hover:text-white"
              >
                {isEditMode ? "Update Section" : "Create Section"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

