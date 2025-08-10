import { FileText, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

const ImageFileInput = ({ name, supportedImageTypes, supportedPdfType }: { name: string;  supportedImageTypes?: string[]; supportedPdfType?: string | null;}) => {
  const { control, getValues, setValue, watch } = useFormContext();
  const initialValue = getValues(name);
  const fileValue = watch(name);
  const [isPdf, setIsPdf] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initialValue instanceof File ? URL.createObjectURL(initialValue) : initialValue || null,
  );

  useEffect(() => {
  if (fileValue instanceof File) {
    // File object from upload
    if (supportedPdfType && fileValue.type === supportedPdfType) {
      setIsPdf(true);
      setPreview(null);
    } else if (supportedImageTypes?.includes(fileValue.type)) {
      setIsPdf(false);
      setPreview(URL.createObjectURL(fileValue));
    } else {
      setIsPdf(false);
      setPreview(null);
    }
  } 
  else if (typeof fileValue === "string" && fileValue) {
    // String from backend (URL)
    if (supportedPdfType && fileValue.toLowerCase().endsWith(".pdf")) {
      setIsPdf(true);
      setPreview(null);
    } else {
      setIsPdf(false);
      setPreview(fileValue);
    }
  } 
  else {
    setIsPdf(false);
    setPreview(null);
  }
}, [fileValue, supportedImageTypes, supportedPdfType]);


  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<Record<string, unknown>, string>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image')) {
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
      }
      field.onChange(file);
    }
  };

  const handleDelete = (field: ControllerRenderProps<Record<string, unknown>, string>) => {
    setPreview(null);
    setIsPdf(false);
    setValue(field.name, null);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => {
        return (
          <div>
          <div className="w-[244px] h-[132px] border-[1px] border-dashed hover:border-dashboard-primary bg-[#F5F5F5] border-[#B0B0B0] rounded-lg cursor-pointer block relative">
            {preview && !isPdf ? (
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
            ) : isPdf ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                <button
                  onClick={() => handleDelete(field)}
                  onKeyDown={(e) => e.key === "Enter" && handleDelete(field)}
                  className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                  aria-label="Delete PDF"
                  type="button"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <FileText className="w-10 h-10 mb-2" />
                <p className="text-sm font-semibold">PDF file selected</p>
              </div>
            ) : (
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center h-full lg:gap-2 cursor-pointer select-none"
              >
                <Image
                  width={36}
                  height={36}
                  src="/images/dashboard/gallery-add.svg"
                  alt="gallery"
                />
                <span className="text-grayDark lg:text-[#A6A6A6] text-xs font-poppins font-normal">
                  Upload your photo{supportedPdfType ? " or PDF" : ""}
                </span>
                <input
                  id="file"
                  type="file"
                  accept={[...(supportedImageTypes ?? []), ...(supportedPdfType ? [supportedPdfType] : [])].join(",")}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, field)}
                />
              </label>
            )}
          </div>
          {fieldState.error && (
            <p className="text-rose-500 text-xs mt-1 pl-2">{fieldState.error.message}</p>
          )}
        </div>
        );
      }}
    />
  );
};

export default ImageFileInput;