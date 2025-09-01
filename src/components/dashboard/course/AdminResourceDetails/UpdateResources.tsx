/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledMultiSelectField from "@/components/share/ControlledMultiSelectField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import ControlledToggleField from "@/components/share/ControlledToggleField";
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
import { useAppSelector } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IResource } from "../../resources/types/types";
import { ILanguage } from "../../setup/types/setup";
import { resourcesInformationUpdateSchema } from "./Schema/Resources";
import { IResourceUpdate } from "./types";

export default function UpdateResources({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IResourceUpdate | undefined;
}) {
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
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
  } = usePatch((data) => console.log("Success", data), [["resources"]]);

  const { organizationId } = useAppSelector((state) => state.organizer);
  // Initialize form methods
  const methods = useForm({
    resolver: yupResolver(resourcesInformationUpdateSchema),
    defaultValues: {
      organizationId: organizationId || "",
      title: "",
      description: "",
      isPrivate: false,
      languageId: "",
      categoryId: "",
      keywordIds: [],
    },
    mode: "onChange",
  });

  
  useEffect(() => {
    if (initialValues) {
      methods.reset({
        title: initialValues.title,
        description: initialValues.description,
        isPrivate: initialValues.isPrivate,
        languageId: String(initialValues.languageId),
        categoryId: String(initialValues.categoryId),
        organizationId: organizationId,
        keywordIds: initialValues.keywordIds || [],
      });
    }
  }, [initialValues, methods, organizationId]);

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
      });
      patchReset();
    }
  }, [isOpen, methods, patchReset]);

  

   
  const onSubmit = (data: any) => {
    console.log({ data });
    const formData = new FormData();

    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("languageId", data.languageId);
    formData.append("categoryId", data.categoryId);
    formData.append("organizationId", organizationId);

    if (data.keywordIds && data.keywordIds.length > 0) {
      formData.append("keywordIds", data.keywordIds);
    }
    formData.append("isPrivate", data.isPrivate);

    
    // // If initialValues is provided, it means we are updating an existing resource
    patchAsync({
      url: `/resources/${initialValues?.id ? initialValues.id : data.id}`,
      data: formData,
    }).then(() => {
      toast.success("Resource updated successfully");
      patchReset();
      onClose();
      // Reset the form after successful submission
      methods.reset();
    });
  };

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
            {initialValues ? "Update Resources" : "Create Resources"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
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
                  <InputLabel label="Category" required />
                  <ControlledSelectField
                    name="categoryId"
                    placeholder="Please enter your category"
                    options={resourceCategoryOptions}
                  />
                </div>
                <div>
                  <InputLabel label="Languages" required />
                  <ControlledSelectField
                    name="languageId"
                    placeholder="Please enter your language"
                    options={languageOptions}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
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
