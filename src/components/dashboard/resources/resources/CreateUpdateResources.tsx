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
import { usePost } from "@/hooks/usePost";
import { useAppSelector } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ILanguage } from "../../setup/types/setup";
import { IResource } from "../types/types";
import { FileUploadController } from "./FileUploadController";
import { resourcesSchema } from "./Schema/Resources";
import { Progress } from "@/components/ui/progress";

export default function CreateUpdateResources({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IResource | undefined;
}) {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const { data: resourceCategories } = useGet<IResource[]>("/resource-categories", ["resource-categories"]);
  const { data: resourceKeywords } = useGet<IResource[]>("/resource-keywords", ["resource-keywords"]);
  const { data: languages } = useGet<ILanguage[]>("/languages", ["resource-languages"]);

  const { mutateAsync, error, reset: postReset } = usePost(
    "/resources",
    (data) => {
      console.log("POST success", data);
    },
    [["resources"]]
  );

  const { organizationId } = useAppSelector((state) => state.organizer);

  const methods = useForm({
    resolver: yupResolver(resourcesSchema),
    defaultValues: {
      organizationId: organizationId || "",
      title: "",
      description: "",
      isPrivate: false,
      languageId: "",
      categoryId: "",
      titleBn: "",
      descriptionBn: "",
      keywordIds: [],
      files: [{ title: "", description: "", languageId: "", file: undefined }],
    },
    mode: "onChange",
  });

  const { control, trigger, } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "files" });

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        title: "",
        titleBn: "",
        description: "",
        descriptionBn: "",
        isPrivate: false,
        languageId: "",
        categoryId: "",
        organizationId: "",
        keywordIds: [],
        files: [{ title: "", description: "", languageId: "", file: undefined }],
      });
      postReset();
      setUploading(false);
      setUploadProgress(0);
    }
  }, [isOpen, methods, postReset]);

  const addAnotherFile = async () => {
    const valid = await trigger();
    if (valid) {
      append({ title: "", description: "", languageId: "", file: "" });
    }
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    if (data.titleBn) formData.append("titleBn", data.titleBn);
    if (data.description) formData.append("description", data.description);
    if (data.descriptionBn) formData.append("descriptionBn", data.descriptionBn);
    formData.append("languageId", data.languageId);
    formData.append("categoryId", data.categoryId);
    formData.append("organizationId", organizationId ?? "");
    if (data.keywordIds?.length > 0) formData.append("keywordIds", data.keywordIds);
    formData.append("isPrivate", data.isPrivate);

    if (data.file) {
      if (typeof data.file === "string") {
        formData.append("file", data.file);
      } else {
        formData.append("file", data.file);
      }
    }

    data.files.forEach((f: any, idx: number) => {
      if (f.file) formData.append(`files[${idx}][file]`, f.file);
      formData.append(`files[${idx}][title]`, f.title);
      formData.append(`files[${idx}][description]`, f.description);
      formData.append(`files[${idx}][languageId]`, f.languageId);
    });

    if (!initialValues) {
      setUploading(true);

      mutateAsync({
        data: formData,
        config: {
          onUploadProgress: (evt: any) => {
            const percent = Math.round((evt.loaded * 100) / evt.total);
            setUploadProgress(percent);
          },
        },
      })
        .then(() => {
          toast.success("Resource created successfully");
          setUploading(false);
          setUploadProgress(0);
          methods.reset();
          onClose();
        })
        .catch(() => setUploading(false));

      return;
    }
  };

  const resourceCategoryOptions = mapToSelectOptions(resourceCategories?.data, "name", "id");
  const languageOptions = mapToSelectOptions(languages?.data, "name", "id");
  const keywordOptions = mapToSelectOptions(resourceKeywords?.data, "name", "id");

  useEffect(() => {
    if (fields.length === 0) append({ title: "", description: "", languageId: "", file: "" });
  }, [fields, append]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (!uploading) onClose();
      }}
    >
      <DialogContent className="bg-white max-h-[95vh] w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Resources" : "Create Resources"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="w-full">

              <div className="flex flex-col gap-6 mt-8">
              <div className="grid grid-cols-2  gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Title" required />
                  <ControlledInputField
                    name="title"
                    placeholder="Please enter your title"
                    className="bg-white"
                  />
                </div>
                <div>
                  <InputLabel label="Title (Bangla)" />
                  <ControlledInputField
                    name="titleBn"
                    placeholder="শিরোনাম লিখুন"
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
                <div>
                  <InputLabel label="Description (Bangla)" />
                  <ControlledTextareaField
                    name="descriptionBn"
                    placeholder="বিবরণ লিখুন"
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

              {/* Keywords */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Keywords" />
                  <ControlledMultiSelectField
                    name="keywordIds"
                    placeholder="Please enter your keyword"
                    options={keywordOptions}
                  />
                </div>
              </div>

              {/* Toggle */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <ControlledToggleField
                    name="isPrivate"
                    label="Private Resource"
                  />
                </div>
              </div>

              {/* Files Section */}
              <div>
                <div className="flex flex-col gap-3">
                  {fields.map((resources, index) => {
                    return (
                      <div
                        id={`files-${resources.id}`}
                        key={resources.id}
                        className="bg-slate-50 p-4 border rounded-lg flex flex-row gap-4"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <InputLabel
                              label="File"
                              required
                              className="text-black lg:mt-2"
                            />
                          </div>
                          <FileUploadController
                            name={`files.${index}.file`}
                            className="h-[224px]"
                          />
                        </div>
                        <div className="w-8/12 relative">
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm ml-auto absolute right-0 bg-rose-100 hover:bg-rose-200"
                          >
                            <Trash />
                          </Button>
                          <div className="mt-4 lg:mt-3 pb-4 lg:pb-0 border-b lg:border-none border-[#E4E4E4]">
                            <InputLabel
                              className="lg:text-smokyBlack lg:mb-1 lg:mt-2"
                              label="Title"
                              required
                            />
                            <ControlledInputField
                              name={`files.${index}.title`}
                              placeholder="Enter book title"
                              className="rounded-md lg:border-gray"
                            />
                          </div>
                          <div className="mt-4 lg:mt-3 pb-4 border-b lg:border-none border-[#E4E4E4]">
                            <InputLabel
                              label="Language"
                              required
                              className="lg:text-smokyBlack lg:mb-1"
                            />
                            <ControlledSelectField
                              name={`files.${index}.languageId`}
                              placeholder="Select language"
                              options={languageOptions}
                            />
                          </div>
                          <div className="mt-4 lg:mt-3 pb-4 lg:pb-0 border-b lg:border-none border-[#E4E4E4]">
                            <InputLabel
                              className="lg:text-smokyBlack lg:mb-2 lg:mt-2"
                              label="Description"
                              required
                            />
                            <ControlledInputField
                              name={`files.${index}.description`}
                              placeholder="Enter description name"
                              className="rounded-md lg:border-gray"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-4">
                    <Button
                      type="button"
                      onClick={addAnotherFile}
                      className="bg-dashboard-primary text-white"
                    >
                      + Add Another File
                    </Button>
                  </div>
                </div>
              </div>

              <ErrorMessage error={error} />
            </div>

              {/* <ErrorMessage error={error} /> */}
            </div>

            {/* Progress Bar */}
            {uploading && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">
                  Uploading... {uploadProgress}%
                </p>
                <Progress value={uploadProgress} className="w-full h-2" />
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="submit"
                disabled={uploading}
                className="bg-dashboard-primary hover:bg-dashboard-primary text-white"
              >
                {uploading ? "Uploading..." : initialValues ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}



