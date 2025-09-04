/* eslint-disable @typescript-eslint/no-explicit-any */
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { VideoUploadController } from "@/components/share/VideoUploadController";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { videoUploadSchema } from "../course/Schema/Resources";

export default function CreateUpdateCourseVideoFiles({
  initialValues,
}: {
  initialValues?: any[] | undefined;
}) {
  const { id } = useParams();
  const { mutateAsync } = usePost(
    `/course/course-content-upload/${id}`,
    (data) => {
      console.log("POST success", data);
    },
    [["resources"]]
  );

  const methods = useForm({
    resolver: yupResolver(videoUploadSchema),
    defaultValues: {
      files: [{ title: "", description: "", file: "" as string }],
    },
    mode: "onChange",
  });
  const { control, trigger, getValues, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });
  console.log(methods.formState.errors);
  useEffect(() => {
    if (initialValues) {
      methods.reset({
        files: initialValues.map((file: any) => ({
          title: file.title ?? "",
          description: file.description ?? "",
          file: file.filePath ?? null,
        })),
      });
    }
  }, [initialValues, methods]);

  const addAnotherFile = async () => {
    const valid = await trigger();
    const values = getValues("files");

    values?.forEach((_file, idx) => {
      const currentFile = watch(`files.${idx}` as const);
      ["title", "description", "file"].every(
        (field) => !!currentFile?.[field as keyof typeof currentFile]
      );
    });

    if (valid) {
      append({
        title: "",
        description: "",
        file: "" as string,
      });
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    if (data.files.length > 0) {
      const f = data.files[0];
      let fileToAppend: File | null = null;

      if (f.file instanceof File) {
        fileToAppend = f.file;
      }

      if (fileToAppend) {
        formData.append(`video`, fileToAppend);
      }

      // Always append meta fields
      formData.append(`title`, f.title);
      formData.append(`description`, f.description);
    }

    mutateAsync(formData);
  };

  useEffect(() => {
    if (fields.length === 0)
      append({ title: "", description: "", file: "" as string });
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
                          label="Video File"
                          required
                          className="text-black lg:mt-2"
                        />
                      </div>
                      <VideoUploadController
                        name={`files.${index}.file`}
                        className="h-[224px]"
                      />
                    </div>
                    <div className="w-[80%] relative ">
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm ml-auto absolute right-0 bg-rose-100 hover:bg-rose-200"
                      >
                        <Trash />
                      </Button>
                      <div className="grid grid-cols-1 gap-4 items-center mt-3">
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
                  className="bg-dashboard-primary text-white hidden"
                >
                  + Add Another video
                </Button>
                <Button
                  type="submit"
                  className="bg-dashboard-primary text-white"
                >
                  Save
                </Button>
              </div>
            </div>
          }
        </form>
      </FormProvider>
    </div>
  );
}
