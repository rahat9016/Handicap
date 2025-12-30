import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";

import { yupResolver } from "@hookform/resolvers/yup";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FileUploadController } from "../resources/FileUploadController";
import { ILanguage } from "../types/types";
import { resourcesFileUpdateForm, resourcesFileUpdateSchema } from "./Schema/Resources";
import { IFileResource } from "./types";
import { usePatch } from "@/hooks/usePatch";
import { toast } from "react-toastify";

interface UpdateResourceFilesProps {
  initialValues: IFileResource[] | undefined;
  resourceId: number;
}

export default function UpdateResourceFiles({
  initialValues,
  resourceId,
}: UpdateResourceFilesProps) {
  const { data: languages } = useGet<ILanguage[]>("/languages", [
    "resource-languages",
  ]);

  const { mutateAsync: patchAsync } = usePatch(
    (data) => console.log("Success", data),
    [["resources"]]
  );

  const [filesToDelete, setFilesToDelete] = useState<number[]>([]);



  const methods = useForm<resourcesFileUpdateForm>({
    resolver: yupResolver(resourcesFileUpdateSchema),
    defaultValues: {
      existingFiles: [],
      newFiles: [],
    },
    mode: "onChange",
  });

  const { control, trigger, watch } = methods;

  const { fields: existingFilesFields, remove: removeExistingFile } =
    useFieldArray({
      control,
      name: "existingFiles",
    });

  const {
    fields: newFilesFields,
    append: appendNewFile,
    remove: removeNewFile,
  } = useFieldArray({
    control,
    name: "newFiles",
  });

  useEffect(() => {
    if (initialValues && initialValues.length > 0) {
      const existingFilesData = initialValues.map((file: IFileResource) => ({
        id: file.id, 
        title: file.title ?? "",
        description: file.description ?? "",
        languageId: file.language?.id.toString() ?? "",
        file: file.filePath ?? "",
      }));

      methods.reset({
        existingFiles: existingFilesData,
        newFiles: [], 
      });
    }
  }, [initialValues, methods]);

  const addNewFile = async () => {
    const isValid = await trigger("newFiles");
    if (!isValid) return;

    appendNewFile({
      title: "",
      description: "",
      languageId: "",
      file: undefined as unknown as File,
    });
  };

  const handleDeleteExistingFile = (index: number, fileId: number) => {
    setFilesToDelete((prev) => [...prev, fileId]);
    removeExistingFile(index);
  };

  const onSubmit = async (data: resourcesFileUpdateForm) => {
  const formData = new FormData();

  data.existingFiles.forEach((file, index) => {
    formData.append(`existingFiles[${index}].id`, String(file.id));
    formData.append(`existingFiles[${index}].title`, file.title);
    formData.append(`existingFiles[${index}].description`, file.description);
    formData.append(`existingFiles[${index}].languageId`, file.languageId);

    if (file.file instanceof File) {
      formData.append(`existingFiles[${index}].file`, file.file);
    }
  });

  data.newFiles.forEach((file, index) => {
    formData.append(`newFiles[${index}].title`, file.title);
    formData.append(`newFiles[${index}].description`, file.description);
    formData.append(`newFiles[${index}].languageId`, file.languageId);
    formData.append(`newFiles[${index}].file`, file.file as File);
  });

  if (filesToDelete.length) {
    formData.append("filesToDelete", filesToDelete.join(","));
  }

  await patchAsync({
    url: `/resources/${resourceId}/files`,
    data: formData,
  });

  toast.success("Resource files updated successfully");
};
  const languageOptions = mapToSelectOptions(languages?.data, "name", "id");

  return (
    <div className="bg-white p-7 border rounded-lg">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          {existingFilesFields.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Existing Files
              </h3>
              <div className="flex flex-col gap-4">
                {existingFilesFields.map((file, index) => {
                  const fileId = watch(`existingFiles.${index}.id`);
                  return (
                    <div
                      key={file.id}
                      className="bg-slate-50 p-4 border rounded-lg flex flex-row gap-4 relative"
                    >
                      <div className="flex-1">
                        <div className="w-full flex items-center justify-between mb-2">
                          <InputLabel
                            label="File"
                            className="text-black lg:mt-2"
                          />
                        </div>
                        <FileUploadController
                          name={`existingFiles.${index}.file`}
                          className="h-[200px]"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Current file will be replaced if you upload a new one
                        </div>
                      </div>
                      <div className="flex-[2] relative">
                        <Button
                          type="button"
                          onClick={() =>
                            handleDeleteExistingFile(index, fileId)
                          }
                          className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm ml-auto absolute right-0 top-0 bg-rose-100 hover:bg-rose-200"
                        >
                          <Trash size={16} />
                        </Button>
                        <div className="grid grid-cols-2 gap-4 items-center mt-3">
                          <div className="border-b lg:border-none border-[#E4E4E4]">
                            <InputLabel
                              className="text-black lg:mb-1"
                              label="Title"
                              required
                            />
                            <ControlledInputField
                              name={`existingFiles.${index}.title`}
                              placeholder="Enter file title"
                              className="rounded-md lg:border-gray"
                            />
                          </div>
                          <div className="lg:border-none border-[#E4E4E4]">
                            <InputLabel
                              label="Language"
                              required
                              className="text-black lg:mb-1"
                            />
                            <ControlledSelectField
                              name={`existingFiles.${index}.languageId`}
                              placeholder="Select language"
                              options={languageOptions}
                            />
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-3 pb-4 lg:pb-0 border-b lg:border-none border-[#E4E4E4]">
                          <InputLabel
                            className="text-black lg:mb-2 lg:mt-2"
                            label="Description"
                          />
                          <ControlledTextareaField
                            name={`existingFiles.${index}.description`}
                            placeholder="Enter description"
                            className="rounded-md lg:border-gray h-[120px] bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* New Files Section */}
          <div className="mb-2">
            <div className="flex justify-between items-center ">
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Files
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {newFilesFields.map((file, index) => (
                <div
                  key={file.id}
                  className="bg-blue-50 p-4 border border-blue-200 rounded-lg flex flex-row gap-4 relative"
                >
                  <div className="flex-1">
                    <div className="w-full flex items-center justify-between mb-2">
                      <InputLabel
                        label="File"
                        required
                        className="text-black lg:mt-2"
                      />
                    </div>
                    <FileUploadController
                      name={`newFiles.${index}.file`}
                      className="h-[200px]"
                    />
                  </div>
                  <div className="flex-[2] relative">
                    <Button
                      type="button"
                      onClick={() => removeNewFile(index)}
                      className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm ml-auto absolute right-0 top-0 bg-rose-100 hover:bg-rose-200"
                    >
                      <Trash size={16} />
                    </Button>
                    <div className="grid grid-cols-2 gap-4 items-center mt-3">
                      <div className="border-b lg:border-none border-[#E4E4E4]">
                        <InputLabel
                          className="text-black lg:mb-1"
                          label="Title"
                          required
                        />
                        <ControlledInputField
                          name={`newFiles.${index}.title`}
                          placeholder="Enter file title"
                          className="rounded-md lg:border-gray"
                        />
                      </div>
                      <div className="lg:border-none border-[#E4E4E4]">
                        <InputLabel
                          label="Language"
                          required
                          className="text-black lg:mb-1"
                        />
                        <ControlledSelectField
                          name={`newFiles.${index}.languageId`}
                          placeholder="Select language"
                          options={languageOptions}
                        />
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-3 pb-4 lg:pb-0 border-b lg:border-none border-[#E4E4E4]">
                      <InputLabel
                        className="text-black lg:mb-2 lg:mt-2"
                        label="Description"
                      />
                      <ControlledTextareaField
                        name={`newFiles.${index}.description`}
                        placeholder="Enter description"
                        className="rounded-md lg:border-gray h-[120px] bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" flex justify-between items-center ">
            <Button
              type="button"
              onClick={addNewFile}
              className="bg-dashboard-primary text-white "
              variant="outline"
            >
              + Add New File
            </Button>
            <Button
              type="submit"
              className="bg-dashboard-primary text-white px-8"
            >
              Update Resource Files
            </Button>
          </div>

          {/* Debug info */}
          {filesToDelete.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> {filesToDelete.length} file(s) will be
                deleted on submission.
              </p>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
