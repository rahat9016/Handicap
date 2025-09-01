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
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FileUploadController } from "../course/FileUploadController";

import { ILanguage } from "../../resources/types/types";
import { resourcesFileUpdateSchema } from "./Schema/Resources";
import { IFileResource } from "./types";

export default function UpdateResourceFiles({
  initialValues,
}: {
  initialValues: IFileResource[] | undefined;
}) {
  const { data: languages } = useGet<ILanguage[]>("/languages", [
    "resource-languages",
  ]);
  const methods = useForm({
    resolver: yupResolver(resourcesFileUpdateSchema),
    defaultValues: {
      files: [{ title: "", description: "", languageId: "", file: undefined }],
    },
    mode: "onChange",
  });
  const { control, trigger, getValues, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        files: initialValues.map((file: any) => ({
          title: file.title ?? "",
          description: file.description ?? "",
          languageId: file.language?.id.toString() ?? "",
          file: file.filePath ?? "",
        })),
      });
    }
  }, [initialValues, methods]);
//   console.log({initialValues},getValues("files"))
  const addAnotherFile = async () => {
    const valid = await trigger();
    const values = getValues("files");

    values?.forEach((_file, idx) => {
      const currentFile = watch(`files.${idx}` as const);
      ["title", "description", "languageId", "file"].every(
        (field) => !!currentFile?.[field as keyof typeof currentFile]
      );
    });

    if (valid) {
      append({
        title: "",
        description: "",
        languageId: "",
        file: "",
      });
    }
  };

  const onSubmit = (data: any) => {
    console.log(data)
    const formData = new FormData();

    data.files.forEach((f: any, idx: number) => {
      if (f.file) {
        formData.append(`files[${idx}][file]`, f.file);
      }
      formData.append(`files[${idx}][title]`, f.title);
      formData.append(`files[${idx}][description]`, f.description);
      formData.append(`files[${idx}][languageId]`, f.languageId);
    });
    //   if (!initialValues) {
    //     mutateAsync(formData).then(() => {
    //       toast.success("Resource created successfully");
    //       onClose();
    //       methods.reset();
    //     });
    //     return;
    //   }
  };

  const languageOptions = mapToSelectOptions(languages?.data, "name", "id");

  useEffect(() => {
    if (fields.length === 0)
      append({ title: "", description: "", languageId: "", file: "" });
  }, [fields, append]);
  return (
    <div className="bg-white p-7 border rounded-lg">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          {
            <div className="flex flex-col gap-3">
              {fields.map((resources, index) => {
                return (
                  <div
                    id={`files-${resources.id}`}
                    key={resources.id}
                    className="bg-slate-50 p-4 border rounded-lg flex flex-row gap-4 relative "
                  >
                    <div>
                      <div className="w-4/12 flex items-center justify-between">
                        <InputLabel
                          label="File"
                          required
                          className="text-black lg:mt-2"
                        />
                      </div>
                      <FileUploadController name={`files.${index}.file`} className="h-[224px]" />
                    </div>
                    <div className="w-[80%] relative ">
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm ml-auto absolute right-0 bg-rose-100 hover:bg-rose-200"
                      >
                        <Trash />
                      </Button>
                      <div className="grid grid-cols-2 gap-4 items-center mt-3">
                        <div className="border-b lg:border-none border-[#E4E4E4]">
                        <InputLabel
                          className="text-black lg:mb-1 "
                          label="Title"
                          required
                        />
                        <ControlledInputField
                          name={`files.${index}.title`}
                          placeholder="Enter book title"
                          className="rounded-md lg:border-gray"
                        />
                      </div>
                      <div className=" lg:border-none border-[#E4E4E4]">
                        <InputLabel
                          label="Language"
                          required
                          className="text-black lg:mb-1"
                        />
                        <ControlledSelectField
                          name={`files.${index}.languageId`}
                          placeholder="Select language"
                          options={languageOptions}
                        />
                      </div>
                      </div>
                      <div className="mt-4 lg:mt-3 pb-4 lg:pb-0 border-b lg:border-none border-[#E4E4E4]">
                        <InputLabel
                          className="text-black lg:mb-2 lg:mt-2"
                          label="Description"
                          required
                        />
                        <ControlledTextareaField
                          name={`files.${index}.description`}
                          placeholder="Enter description name"
                          className="rounded-md lg:border-gray h-[136px] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="mt-4 flex justify-between">
                <Button
                  type="button"
                  onClick={addAnotherFile}
                  className="bg-dashboard-primary text-white"
                >
                  + Add Another File
                </Button>
                <Button
                  type="submit"
                  className="bg-dashboard-primary text-white"
                >
                   Update Resource
                </Button>
              </div>
            </div>
          }
        </form>
      </FormProvider>
    </div>
  );
}
