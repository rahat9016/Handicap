/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorMessage from "@/components/common/Errors/ErrorMessage";
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
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { videoUploadSchema } from "../course/Schema/Course";

export default function CreateUpdateCourseVideoFiles({
  initialValues,
}: {
  initialValues?: any[] | undefined;
}) {
  const { id } = useParams();
  const {
    mutateAsync,
    reset: patchReset,
    error: patchError,
  } = usePost(
    `/course/course-content-upload/${id}`,
    (data) => {
      console.log("POST success", data);
    },
    [["allCourseList"]]
  );

  const methods = useForm({
    resolver: yupResolver(videoUploadSchema),
    defaultValues: {
      files: [
        { uploadType: "file", title: "", description: "", file: "", url: "" },
      ],
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
          file: file.filePath ?? null,
          url: file.url ?? "",
          uploadType: file.uploadType ?? "file",
        })),
      });
    }
  }, [initialValues, methods]);

  const addAnotherFile = async () => {
    const valid = await trigger();
    const values = getValues("files");

    values?.forEach((_file, idx) => {
      const currentFile = watch(`files.${idx}` as const);
      ["title", "description", "file", "url"].every(
        (field) => !!currentFile?.[field as keyof typeof currentFile]
      );
    });

    if (valid) {
      append({
        uploadType: "file",
        title: "",
        description: "",
        file: "",
        url: "",
      });
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    console.log(data);

    if (data.files.length > 0) {
      const f = data.files[0];

      // append meta fields
      formData.append("title", f.title);
      formData.append("description", f.description);

      if (f.uploadType === "file" && f.file instanceof File) {
        formData.append("video", f.file);
        formData.append("contentType", "VIDEO");
      } else if (f.uploadType === "url" && typeof f.file === "string") {
        formData.append("link", f.url);
        formData.append("contentType", "LINK");
      }
    }

    mutateAsync(formData).then(() => {
      toast.success("Video uploaded successfully");
      patchReset();
      // Reset the form after successful submission
      methods.reset();
    });
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({
        title: "",
        description: "",
        file: "",
        url: "",
        uploadType: "file" as const,
      });
    }
  }, [fields, append]);

  return (
    <div className="bg-white p-7 border rounded-lg">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-3">
            {fields.map((resources, index) => {
              const uploadType = watch(`files.${index}.uploadType`);
              return (
                <div
                  id={`files-${resources.id}`}
                  key={resources.id}
                  className="bg-slate-50 p-4 border rounded-lg flex flex-row gap-4 relative"
                >
                  <div className="w-4/12">
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <Controller
                          name={`files.${index}.uploadType`}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="radio"
                              value="file"
                              checked={field.value === "file"}
                              onChange={(e) => {
                                field.onChange(e);
                                methods.setValue(`files.${index}.url`, "");
                              }}
                            />
                          )}
                        />
                        File
                      </label>
                      <label className="flex items-center gap-2">
                        <Controller
                          name={`files.${index}.uploadType`}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="radio"
                              value="url"
                              checked={field.value === "url"}
                              onChange={(e) => {
                                field.onChange(e);
                                methods.setValue(`files.${index}.file`, "");
                              }}
                            />
                          )}
                        />
                        YouTube URL
                      </label>
                    </div>

                    <div className="mt-2">
                      {uploadType === "file" ? (
                        <VideoUploadController
                          name={`files.${index}.file`}
                          className="h-[224px] w-full"
                        />
                      ) : (
                        <ControlledInputField
                          name={`files.${index}.url`}
                          placeholder="Enter YouTube URL"
                          className="rounded-md lg:border-gray "
                        />
                      )}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="w-[80%] relative">
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
                          className="text-black lg:mb-1"
                          label="Title"
                          required
                        />
                        <ControlledInputField
                          name={`files.${index}.title`}
                          placeholder="Enter video title"
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
                        placeholder="Enter description"
                        className="rounded-md lg:border-gray h-[136px] bg-white"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <ErrorMessage error={patchError} />
            <div className="mt-4 flex justify-between">
              <Button
                type="button"
                onClick={addAnotherFile}
                className="bg-dashboard-primary text-white"
              >
                + Add Another video
              </Button>
              <Button type="submit" className="bg-dashboard-primary text-white">
                Save
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
