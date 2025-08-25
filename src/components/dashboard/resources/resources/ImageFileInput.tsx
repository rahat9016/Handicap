/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { File, FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Controller,
    ControllerRenderProps,
    useFormContext,
} from "react-hook-form";
import { SUPPORTED_FORMATS } from "./Schema/Resources";

const IMAGE_FORMATS = SUPPORTED_FORMATS.filter((t) => t.startsWith("image"));
type FileValue = File | string | null;

const ImageFileInput = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const { control, getValues, setValue, watch } = useFormContext();
  const [isImage, setIsImage] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);

  const fileValue = watch(name) as FileValue;
  const initialValue = getValues(name) as FileValue;

  const [preview, setPreview] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    if (initialValue instanceof File) {
      return URL.createObjectURL(initialValue);
    }

    if (typeof initialValue === "string") {
      return initialValue;
    }

    return null;
  });

  useEffect(() => {
    if (fileValue instanceof File) {
      setFileType(fileValue.type);
      if (IMAGE_FORMATS.includes(fileValue.type)) {
        setIsImage(true);
        setPreview(URL.createObjectURL(fileValue));
      } else {
        setIsImage(false);
        setPreview(null);
      }
    } else if (typeof fileValue === "string" && fileValue) {
      const lower = fileValue.toLowerCase();
      if (lower.match(/\.(jpg|jpeg|png|webp|svg|heic|heif)$/)) {
        setIsImage(true);
        setPreview(fileValue);
        setFileType("image");
      } else if (lower.endsWith(".pdf")) {
        setIsImage(false);
        setFileType("application/pdf");
        setPreview(null);
      } else if (lower.match(/\.(doc|docx)$/)) {
        setIsImage(false);
        setFileType("application/msword");
        setPreview(null);
      } else {
        setIsImage(false);
        setFileType(null);
        setPreview(null);
      }
    } else {
      setIsImage(false);
      setFileType(null);
      setPreview(null);
    }
  }, [fileValue]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<Record<string, unknown>, any>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileType(file.type);
      if (IMAGE_FORMATS.includes(file.type)) {
        setPreview(URL.createObjectURL(file));
        setIsImage(true);
      } else {
        setPreview(null);
        setIsImage(false);
      }
      field.onChange(file);
    }
  };

  const handleDelete = (
    field: ControllerRenderProps<Record<string, unknown>, any>
  ) => {
    setPreview(null);
    setIsImage(false);
    setFileType(null);
    setValue(field.name, null);
  };

  const renderFileIcon = () => {
    if (fileType?.includes("pdf")) {
      return <FileText className="w-10 h-10 mb-2 text-red-600" />;
    }
    if (
      fileType?.includes("msword") ||
      fileType?.includes("officedocument.wordprocessingml.document")
    ) {
      return <FileText className="w-10 h-10 mb-2 text-blue-600" />;
    }
    return <File className="w-10 h-10 mb-2 text-gray-600" />;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => (
        <div>
          <div
            className={cn(
              "w-[244px] h-[132px] border-[1px] border-dashed hover:border-dashboard-primary bg-[#F5F5F5] border-[#B0B0B0] rounded-lg cursor-pointer block relative",
              className
            )}
          >
            {preview && isImage ? (
              <div className="w-full h-full relative group">
                <button
                  onClick={() => handleDelete(field)}
                  onKeyDown={(e) => e.key === "Enter" && handleDelete(field)}
                  className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                  aria-label="Delete image"
                  type="button"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <Image
                  width={244}
                  height={132}
                  src={preview}
                  alt="File Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ) : fileValue ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 relative">
                <button
                  onClick={() => handleDelete(field)}
                  onKeyDown={(e) => e.key === "Enter" && handleDelete(field)}
                  className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                  aria-label="Delete file"
                  type="button"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {renderFileIcon()}
                <p className="text-sm font-semibold">File selected</p>
              </div>
            ) : (
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
                <span className="text-grayDark lg:text-[#A6A6A6] text-xs font-poppins font-normal">
                  Upload file (image, pdf, doc)
                </span>
                <input
                  id={`${name}-file`}
                  type="file"
                  accept={SUPPORTED_FORMATS.join(",")}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, field)}
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
      )}
    />
  );
};

export default ImageFileInput;
