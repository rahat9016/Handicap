import { cn } from "@/lib/utils";
import { FileText, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SUPPORTED_FORMATS } from "./Schema/Resources";


interface FileUploadControllerProps {
  name: string;
  className?: string;
  imgClassName?: string;
  initialUrl?: string;
  label?: string;
}

export function FileUploadController({
  name,
  className,
  imgClassName,
  label,
}: FileUploadControllerProps) {
  const { control, getValues } = useFormContext();
  const initialUrl = getValues(name);
  const [touched, setTouched] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => {
        const fileValue = field.value || null;

        // detect image type
        const isImage =
          fileValue instanceof File
            ? fileValue.type.startsWith("image/")
            : typeof fileValue === "string"
            ? /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileValue)
            : !touched && initialUrl
            ? /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(initialUrl)
            : false;
        // detect video type
        const isVideo =
          fileValue instanceof File
            ? fileValue.type.startsWith("video/")
            : typeof fileValue === "string"
            ? /\.(mp4|mov|avi|webm|mkv)$/i.test(fileValue)
            : !touched && initialUrl
            ? /\.(mp4|mov|avi|webm|mkv)$/i.test(initialUrl)
            : false;
        // preview URL
        const preview =
          fileValue instanceof File
            ? URL.createObjectURL(fileValue)
            : typeof fileValue === "string"
            ? fileValue
            : !touched
            ? initialUrl
            : null;

        // file change handler
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            setTouched(true);
            field.onChange(file);
          }
        };

        // delete file
        const handleDelete = () => {
          setTouched(true);
          field.onChange(null);
        };

        // render icon for non-image files
        const renderFileIcon = () => {
          if (fileValue instanceof File) {
            if (fileValue.type === "application/pdf") {
              return <FileText className="w-10 h-10 text-rose-600" />;
            }
            if (
              fileValue.type.includes("word") ||
              fileValue.name.endsWith(".doc") ||
              fileValue.name.endsWith(".docx")
            ) {
              return <FileText className="w-10 h-10 text-blue-600" />;
            }
          } else if (typeof fileValue === "string" && !isImage && !isVideo) {
            if (fileValue.endsWith(".pdf")) {
              return <FileText className="w-10 h-10 text-rose-600" />;
            }
            if (fileValue.endsWith(".doc") || fileValue.endsWith(".docx")) {
              return <FileText className="w-10 h-10 text-blue-600" />;
            }
          }
          return (
            <Image src="/icons/file.svg" alt="File" width={40} height={40} />
          );
        };

        return (
          <div>
            <div
              className={cn(
                "w-[244px] h-[132px] border-[1px] border-dashed hover:border-dashboard-primary bg-[#F5F5F5] border-[#B0B0B0] rounded-lg cursor-pointer block relative",
                className
              )}
            >
              {fileValue ? (
                isImage && preview ? (
                  // Image preview
                  <div className="w-full h-full relative group">
                    <button
                      onClick={handleDelete}
                      className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                      aria-label="Delete file"
                      type="button"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <Image
                      width={244}
                      height={132}
                      src={preview}
                      alt="Preview"
                      className={cn("w-full h-full object-contain rounded-lg", imgClassName)}
                    />
                  </div>
                ) : isVideo && preview ? (
                  <div className="w-full h-full relative group">
                    <button
                      onClick={handleDelete}
                      className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2 z-50"
                      aria-label="Delete video"
                      type="button"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <video
                      src={preview}
                      controls
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  // Document preview
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 relative">
                    <button
                      onClick={handleDelete}
                      className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                      aria-label="Delete file"
                      type="button"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    {renderFileIcon()}
                    <p className="text-sm font-normal font-inter mt-2 text-center px-2 truncate max-w-[200px]">
                      {fileValue instanceof File
                        ? fileValue.name
                        : "File selected"}
                    </p>
                  </div>
                )
              ) : (
                // Upload placeholder
                <label
                  htmlFor={`${name}-file`}
                  className="flex flex-col items-center justify-center h-full lg:gap-2 cursor-pointer select-none"
                >
                  <Image
                    width={36}
                    height={36}
                    src="/images/dashboard/gallery-add.svg"
                    alt="gallery"
                  />
                  <span className="text-grayDark lg:text-[#A6A6A6] text-xs font-poppins font-normal text-center px-2">
                    {label || "Upload file (image, pdf, doc, video)"}
                  </span>
                  <input
                    id={`${name}-file`}
                    type="file"
                    accept={SUPPORTED_FORMATS.join(",")}
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
