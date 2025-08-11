import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import { IOrganizationResponse } from "@/components/organizer/types";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledMultiSelectField from "@/components/share/ControlledMultiSelectField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import ControlledToggleField from "@/components/share/ControlledToggleField";
import ImageFileInput from "@/components/share/ImageFileInput";
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
import { ILanguage } from "../../setup/types/setup";
import { IResource } from "../types/types";
import { resourcesSchema, SUPPORTED_FORMATS } from "./Schema/Resources";

export default function CreateUpdateResources({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IResource | undefined;
}) {
  const { data } = useGet<IOrganizationResponse[]>("/organizations", [
    "organizations",
  ]);
  const { data: resourceCategories } = useGet<IResource[]>(
    "/resource-categories",
    ["resource-categories"]
  );
  const { data: resourceKeywords } = useGet<IResource[]>("/resource-keywords", [
    "resource-keywords",
  ]);
  const { data: languages } = useGet<ILanguage[]>("/languages", [
    "resource-languages",
  ]);
  const {
    mutateAsync,
    error,
    reset: postReset,
  } = usePost(
    "/resources",
    (data) => {
      console.log("POST success", data);
    },
    [["resources"]]
  );

  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
  } = usePatch(
    (data) => console.log("Success", data),
    [["resources"]]
  );

  // Initialize form methods
  const methods = useForm({
    resolver: yupResolver(resourcesSchema),
    defaultValues: {
      keywordIds: [4],
    },
  });
console.log(methods.formState.errors);
  useEffect(() => {
    if (initialValues) {
      methods.reset({
        file: initialValues.filePath,
        title: initialValues.title,
        description: initialValues.description,
        isPrivate: initialValues.isPrivate,
        languageId: String(initialValues.language.id),
        categoryId: String(initialValues.category.id),
        organizationId: String(initialValues.organization.id),
        keywordIds: initialValues.keywords?.map((k) => k.keyword.id) || []
      });
    }
  }, [initialValues, methods]);

  // Open the dialog when isOpen changes
  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        title: "",
        description: "",
        isPrivate: false,
        languageId: "",
        categoryId: "",
        organizationId: "",
        keywordIds: [],
        file: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("languageId", data.languageId);
    formData.append("categoryId", data.categoryId);
    formData.append("organizationId", data.organizationId);

    if (data.keywordIds && data.keywordIds.length > 0) {
      formData.append("keywordIds", data.keywordIds);
    }
    formData.append("isPrivate", data.isPrivate);

    if (data.file) {
      if (typeof data.file === "string") {
        // If file is URL string, send it as is
        formData.append("file", data.file);
      } else {
        // File object
        formData.append("file", data.file);
      }
    }
    if (!initialValues) {
      mutateAsync(formData).then(() => {
        toast.success("Resource created successfully");
        onClose();
        methods.reset();
      });
      return;
    }
    // If initialValues is provided, it means we are updating an existing resource
    patchAsync({
      url: `/resources/${initialValues.id}`,
      data: formData,
    }).then(() => {
      toast.success("Resource updated successfully");
      patchReset();
      onClose();
      // Reset the form after successful submission
      methods.reset();
    });
  };

  const organizationOptions = mapToSelectOptions(data?.data, "name", "id");
  const resourceCategoryOptions = mapToSelectOptions(
    resourceCategories?.data,
    "name",
    "id"
  );
  const languageOptions = mapToSelectOptions(languages?.data, "name", "id");
  const keywordOptions = mapToSelectOptions(
    resourceKeywords?.data,
    "name",
    "id"
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-h-[95vh]  w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Organization" : "Create Organization"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="border-b pb-8">
              <InputLabel label="Image" />
              <ImageFileInput
                name="file"
                supportedPdfType="application/pdf"
                supportedImageTypes={SUPPORTED_FORMATS}
              />
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <div className="grid grid-cols-1 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Title" required />
                  <ControlledInputField
                    name="title"
                    placeholder="Please enter your title"
                    className="bg-white"
                  />
                </div>
                <div>
                  <InputLabel label="Description" />
                  <ControlledTextareaField
                    name="description"
                    placeholder="Enter your description"
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Organizations" required />
                  <ControlledSelectField
                    name="organizationId"
                    placeholder="Please enter your organization"
                    options={organizationOptions}
                  />
                </div>
                <div>
                  <InputLabel label="Category" required />
                  <ControlledSelectField
                    name="categoryId"
                    placeholder="Please enter your category"
                    options={resourceCategoryOptions}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Languages" required />
                  <ControlledSelectField
                    name="languageId"
                    placeholder="Please enter your language"
                    options={languageOptions}
                  />
                </div>
                <div>
                  <InputLabel label="Keywords" required />
                  <ControlledMultiSelectField
                    name="keywordIds"
                    placeholder="Please enter your keyword"
                    options={keywordOptions}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <ControlledToggleField
                    name="isPrivate"
                    label="Private Resource"
                  />
                </div>
              </div>
              <ErrorMessage error={error} />
              <ErrorMessage error={patchError} />
            </div>
            <div className="flex justify-end gap-3 mt-4">
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
