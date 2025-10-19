// /* eslint-disable @typescript-eslint/no-explicit-any */
// import ControlledInputField from "@/components/share/ControlledInputField";
// import ControlledSelectField from "@/components/share/ControlledSelectField";
// import ControlledTextareaField from "@/components/share/ControlledTextareaField";
// import InputLabel from "@/components/share/InputLabel";
// import { Button } from "@/components/ui/button";
// import { useGet } from "@/hooks/useGet";
// import { usePost } from "@/hooks/usePost";
// import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
// import urlToFile from "@/utils/urlToFile";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Trash } from "lucide-react";
// import { useEffect } from "react";
// import { FormProvider, useFieldArray, useForm } from "react-hook-form";
// import { FileUploadController } from "../resources/FileUploadController";
// import { ILanguage } from "../types/types";
// import { resourcesFileUpdateSchema } from "./Schema/Resources";
// import { IFileResource } from "./types";

// export default function UpdateResourceFiles({
//   initialValues,
// }: {
//   initialValues: IFileResource[] | undefined;
// }) {
//   const { data: languages } = useGet<ILanguage[]>("/languages", [
//     "resource-languages",
//   ]);

//   const { mutateAsync } = usePost(
//     "/resources",
//     (data) => {
//       console.log("POST success", data);
//     },
//     [["resources"]]
//   );

//   const methods = useForm({
//     resolver: yupResolver(resourcesFileUpdateSchema),
//     defaultValues: {
//       files: [{ title: "", description: "", languageId: "", file: undefined }],
//     },
//     mode: "onChange",
//   });
//   const { control, trigger, getValues, watch } = methods;
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "files",
//   });

//   useEffect(() => {
//     if (initialValues) {
//       methods.reset({
//         files: initialValues.map((file: any) => ({
//           title: file.title ?? "",
//           description: file.description ?? "",
//           languageId: file.language?.id.toString() ?? "",
//           file: file.filePath ?? "",
//         })),
//       });
//     }
//   }, [initialValues, methods]);
//   //   console.log({initialValues},getValues("files"))
//   const addAnotherFile = async () => {
//     const valid = await trigger();
//     const values = getValues("files");

//     values?.forEach((_file, idx) => {
//       const currentFile = watch(`files.${idx}` as const);
//       ["title", "description", "languageId", "file"].every(
//         (field) => !!currentFile?.[field as keyof typeof currentFile]
//       );
//     });

//     if (valid) {
//       append({
//         title: "",
//         description: "",
//         languageId: "",
//         file: "",
//       });
//     }
//   };

//   const onSubmit = async (data: any) => {
//     const formData = new FormData();

//     const filePromises = data.files.map(async (f: any, idx: number) => {
//       let fileToAppend: File | null = null;

//       if (f.file) {
//         if (f.file instanceof File) {
//           fileToAppend = f.file;
//         } else if (typeof f.file === "string" && f.file.startsWith("http")) {
//           const filename = f.title || `file-${idx}`;
//           fileToAppend = await urlToFile(f.file, filename);
//         }
//       }

//       if (fileToAppend) {
//         formData.append(`files[${idx}][file]`, fileToAppend);
//       }

//       // Always append meta fields
//       formData.append(`files[${idx}][title]`, f.title);
//       formData.append(`files[${idx}][description]`, f.description);
//       formData.append(`files[${idx}][languageId]`, f.languageId);
//     });

//     // Run all conversions in parallel
//     await Promise.all(filePromises);

//     mutateAsync(formData);
//   };

//   const languageOptions = mapToSelectOptions(languages?.data, "name", "id");

//   useEffect(() => {
//     if (fields.length === 0)
//       append({ title: "", description: "", languageId: "", file: "" });
//   }, [fields, append]);
//   return (
//     <div className="bg-white p-7 border rounded-lg">
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
//           {
//             <div className="flex flex-col gap-3">
//               {fields.map((resources, index) => {
//                 return (
//                   <div
//                     id={`files-${resources.id}`}
//                     key={resources.id}
//                     className="bg-slate-50 p-4 border rounded-lg flex flex-row gap-4 relative "
//                   >
//                     <div>
//                       <div className="w-4/12 flex items-center justify-between">
//                         <InputLabel
//                           label="File"
//                           required
//                           className="text-black lg:mt-2"
//                         />
//                       </div>
//                       <FileUploadController
//                         name={`files.${index}.file`}
//                         className="h-[224px]"
//                       />
//                     </div>
//                     <div className="w-[80%] relative ">
//                       <Button
//                         type="button"
//                         onClick={() => remove(index)}
//                         className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm ml-auto absolute right-0 bg-rose-100 hover:bg-rose-200"
//                       >
//                         <Trash />
//                       </Button>
//                       <div className="grid grid-cols-2 gap-4 items-center mt-3">
//                         <div className="border-b lg:border-none border-[#E4E4E4]">
//                           <InputLabel
//                             className="text-black lg:mb-1 "
//                             label="Title"
//                             required
//                           />
//                           <ControlledInputField
//                             name={`files.${index}.title`}
//                             placeholder="Enter book title"
//                             className="rounded-md lg:border-gray"
//                           />
//                         </div>
//                         <div className=" lg:border-none border-[#E4E4E4]">
//                           <InputLabel
//                             label="Language"
//                             required
//                             className="text-black lg:mb-1"
//                           />
//                           <ControlledSelectField
//                             name={`files.${index}.languageId`}
//                             placeholder="Select language"
//                             options={languageOptions}
//                           />
//                         </div>
//                       </div>
//                       <div className="mt-4 lg:mt-3 pb-4 lg:pb-0 border-b lg:border-none border-[#E4E4E4]">
//                         <InputLabel
//                           className="text-black lg:mb-2 lg:mt-2"
//                           label="Description"
//                           required
//                         />
//                         <ControlledTextareaField
//                           name={`files.${index}.description`}
//                           placeholder="Enter description name"
//                           className="rounded-md lg:border-gray h-[136px] bg-white"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div className="mt-4 flex justify-between">
//                 <Button
//                   type="button"
//                   onClick={addAnotherFile}
//                   className="bg-dashboard-primary text-white"
//                 >
//                   + Add Another File
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-dashboard-primary text-white"
//                 >
//                   Update Resource
//                 </Button>
//               </div>
//             </div>
//           }
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { resourcesFileUpdateSchema } from "./Schema/Resources";
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
    [["user"]]
  );

  const [filesToDelete, setFilesToDelete] = useState<number[]>([]);

  type FormValues = {
    existingFiles: {
      id: number;
      title: string;
      description: string;
      languageId: string;
      file?: any;
    }[];
    newFiles: {
      title: string;
      description: string;
      languageId: string;
      file?: any;
    }[];
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(resourcesFileUpdateSchema as any),
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
      // Map existing files to existingFiles array
      const existingFilesData = initialValues.map((file: IFileResource) => ({
        id: file.id, // Include the file ID for existing files
        title: file.title ?? "",
        description: file.description ?? "",
        languageId: file.language?.id.toString() ?? "",
        file: file.filePath ?? "", // This will be used to show current file
      }));

      methods.reset({
        existingFiles: existingFilesData,
        newFiles: [], // Start with empty new files
      });
    }
  }, [initialValues, methods]);

  const addNewFile = async () => {
    const valid = await trigger("newFiles");

    if (valid) {
      appendNewFile({
        title: "",
        description: "",
        languageId: "",
        file: undefined,
      });
    }
  };

  const handleDeleteExistingFile = (index: number, fileId: number) => {
    // Add to filesToDelete list
    setFilesToDelete((prev) => [...prev, fileId]);
    // Remove from form
    removeExistingFile(index);
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    console.log("Submitting data:", data);

    // Process existing files (updates)
    if (data.existingFiles && data.existingFiles.length > 0) {
      data.existingFiles.forEach(async (file: any, index: number) => {
        formData.append(`existingFiles[${index}].id`, file.id.toString());
        formData.append(`existingFiles[${index}].title`, file.title);
        formData.append(
          `existingFiles[${index}].description`,
          file.description
        );
        formData.append(`existingFiles[${index}].languageId`, file.languageId);

        // Handle file upload for existing files (if new file selected)
        if (file.file && file.file instanceof File) {
          formData.append(`existingFiles[${index}].file`, file.file);
        } else if (
          typeof file.file === "string" &&
          !file.file.startsWith("http")
        ) {
          // If it's a string but not a URL, it might be the existing file path
          // We don't need to append the file again
          console.log(`Keeping existing file for file ID ${file.id}`);
        }
      });
    }

    // Process new files (additions)
    if (data.newFiles && data.newFiles.length > 0) {
      data.newFiles.forEach(async (file: any, index: number) => {
        formData.append(`newFiles[${index}].title`, file.title);
        formData.append(`newFiles[${index}].description`, file.description);
        formData.append(`newFiles[${index}].languageId`, file.languageId);

        // New files must have a file
        if (file.file && file.file instanceof File) {
          formData.append(`newFiles[${index}].file`, file.file);
        }
      });
    }

    // Add files to delete
    if (filesToDelete.length > 0) {
      formData.append("filesToDelete", filesToDelete.join(","));
    }

    console.log("Files to delete:", filesToDelete);

    await patchAsync({
      url: `/resources/${resourceId}/files`,
      data: formData,
    }).then(() => {
      toast.success("Contact information updated successfully");
      // reset();
      // onClose();
    });
  };

  const languageOptions = mapToSelectOptions(languages?.data, "name", "id");

  return (
    <div className="bg-white p-7 border rounded-lg">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          {/* Existing Files Section */}
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

          {/* Submit Button */}
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
