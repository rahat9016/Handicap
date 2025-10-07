/* eslint-disable @typescript-eslint/no-explicit-any */
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { VideoUploadController } from "@/components/share/VideoUploadController";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { singleVideoSchema } from "../course/Schema/Course";

interface EditVideoModalProps {
  video: any;
  open: boolean;
  onClose: () => void;
}

export default function EditVideoModal({
  video,
  open,
  onClose,
}: EditVideoModalProps) {
  const methods = useForm({
    resolver: yupResolver(singleVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      file: undefined,
      link: "",
      uploadType: "file" as "file" | "link",
    },
    mode: "onChange",
  });
  const [replaceMode, setReplaceMode] = useState(false);

  const { control, watch, setValue, handleSubmit } = methods;

  useEffect(() => {
    if (video) {
      methods.reset({
        title: video.title ?? "",
        description: video.description ?? "",
        file: undefined,
        link: "",
        uploadType: video.contentType === "VIDEO" ? "file" : "link",
      });
      
      if (video.contentType === "VIDEO") {
        methods.setValue("file", video.filePath ?? null);
      } else if (video.contentType === "LINK") {
        methods.setValue("link", video.link ?? "");
      }
    }
  }, [video, methods]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.uploadType === "file" && data.file instanceof File) {
      formData.append("video", data.file);
      formData.append("contentType", "VIDEO");
    } else if (data.uploadType === "url" && typeof data.url === "string") {
      formData.append("link", data.url);
      formData.append("contentType", "LINK");
    }

    // Example: Call your API
    // await mutateAsync(formData);
    onClose();
  };

  const uploadType = watch("uploadType");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Upload Type Selector */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Controller
                  name="uploadType"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      value="file"
                      checked={field.value === "file"}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue("link", "");
                      }}
                    />
                  )}
                />
                File
              </label>
              <label className="flex items-center gap-2">
                <Controller
                  name="uploadType"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      value="link"
                      checked={field.value === "link"}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue("file", undefined);
                      }}
                    />
                  )}
                />
                YouTube Link
              </label>
            </div>

            {uploadType === "file" ? (
              methods.watch("file") && methods.watch("file") instanceof File ? (
                // ✅ Show preview for newly uploaded file
                <div className="relative w-full">
                  {/* <video
        src={URL.createObjectURL(methods.watch("file"))}
        controls
        className="w-full h-[224px] rounded-md border"
      /> */}
                  <button
                    type="button"
                    onClick={() => {
                      methods.setValue("file", undefined);
                      setReplaceMode(false); // exit replace mode
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              ) : video?.filePath && !replaceMode ? (
                // ✅ Show backend video as icon or preview
                <div className="flex items-center gap-4 border rounded-md p-3 relative">
                  <Image
                    className="w-10 h-10"
                    src="/video.png"
                    alt="video"
                    width={100}
                    height={100}
                  />
                  <span className="flex-1 text-sm text-gray-700 truncate">
                    {video?.fileName || "Uploaded Video"}
                  </span>

                  {/* Replace icon */}
                  <button
                    type="button"
                    onClick={() => setReplaceMode(true)} // switch to upload mode
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                // ✅ Show upload system
                <VideoUploadController
                  name="file"
                  className="h-[224px] w-full"
                />
              )
            ) : (
              // ✅ If YouTube link type
              <ControlledInputField
                name="link"
                placeholder="Enter YouTube URL"
                className="rounded-md border-gray-300"
              />
            )}

            {/* Title */}
            <div>
              <InputLabel label="Title" required />
              <ControlledInputField
                name="title"
                placeholder="Enter video title"
                className="rounded-md border-gray-300"
              />
            </div>

            {/* Description */}
            <div>
              <InputLabel label="Description" required />
              <ControlledTextareaField
                name="description"
                placeholder="Enter video description"
                className="rounded-md border-gray-300 h-32"
              />
            </div>

            <DialogFooter className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-dashboard-primary text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
