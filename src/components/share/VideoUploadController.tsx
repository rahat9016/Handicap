import { cn } from "@/lib/utils";
import { FileText, X } from "lucide-react";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";

export function VideoUploadController({
  name,
  className,
}: {
  name: string;
  className?: string;
  initialUrl?: string;
}) {
  const { control, getValues } = useFormContext();
  const initialUrl = getValues(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => {
        const fileValue = field.value || null;

        // check if it's a video
        const isVideo =
          fileValue instanceof File
            ? fileValue.type.startsWith("video/")
            : typeof fileValue === "string"
            ? /\.(mp4|mov|avi|mkv|webm)$/i.test(fileValue)
            : initialUrl
            ? /\.(mp4|mov|avi|mkv|webm)$/i.test(initialUrl)
            : false;

        // get preview URL
        const preview =
          fileValue instanceof File
            ? isVideo
              ? URL.createObjectURL(fileValue)
              : null
            : typeof fileValue === "string"
            ? fileValue
            : initialUrl || null;

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            field.onChange(file);
          }
        };

        const handleDelete = () => {
          field.onChange(null);
        };

        return (
          <div>
            <div
              className={cn(
                "w-[300px] h-[180px] border-[1px] border-dashed hover:border-dashboard-primary bg-[#F5F5F5] border-[#B0B0B0] rounded-lg cursor-pointer block relative",
                className
              )}
            >
              {preview && isVideo ? (
                <div className="w-full h-full relative group">
                  <button
                    onClick={handleDelete}
                    className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                    aria-label="Delete video"
                    type="button"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <video
                    src={preview}
                    controls
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ) : fileValue ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 relative">
                  <button
                    onClick={handleDelete}
                    className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                    aria-label="Delete video"
                    type="button"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <FileText className="w-10 h-10 text-gray-500" />
                  <p className="text-sm font-normal font-inter mt-2">
                    Video selected
                  </p>
                </div>
              ) : (
                <label
                  htmlFor={`${name}-video`}
                  className="flex flex-col items-center justify-center h-full lg:gap-2 cursor-pointer select-none"
                >
                  <Image
                    width={36}
                    height={36}
                    src="/images/dashboard/video-add.png"
                    alt="video"
                  />
                  <span className="text-grayDark lg:text-[#A6A6A6] text-xs font-poppins font-normal text-center">
                    Upload video (mp4, mov, avi, mkv, webm)
                  </span>
                  <input
                    id={`${name}-video`}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            {fieldState.error && (
              <p className="text-rose-500 text-xs mt-1 pl-2">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
