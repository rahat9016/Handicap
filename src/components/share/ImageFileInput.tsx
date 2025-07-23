import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
const ImageFileInput = ({ name }: { name: string }) => {
  const { control, getValues, setValue, watch } = useFormContext();
  const initialValue = getValues(name);
  const fileValue = watch(name);
  const [preview, setPreview] = useState<string | null>(
    initialValue instanceof File ? URL.createObjectURL(initialValue) : initialValue || null,
  );

  useEffect(() => {
    if (fileValue instanceof File) {
      const fileUrl = URL.createObjectURL(fileValue);
      setPreview(fileUrl);
    } else if (typeof fileValue === 'string') {
      setPreview(fileValue);
    } else {
      setPreview(null);
    }
  }, [fileValue]);

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
    setPreview('');
    setValue(field.name, null);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => {
        return (
          <div className=''>
            <div className="w-[244px] h-[132px] border-[1px] border-dashed hover:border-dashboard-primary bg-[#F5F5F5] border-[#B0B0B0] rounded-lg cursor-pointer block">
              {preview ? (
                <div className="w-full h-full relative group">
                  <Button
                    onClick={() => handleDelete(field)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDelete(field)}
                    className="absolute  w-6 h-6 flex items-center justify-center bg-dashboard-primary hover:bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                    aria-label="Delete image"
                    type="button"
                  >
                    <X className="w-4 h-4 text-white" />
                  </Button>
                  <Image
                    width={126}
                    height={150}
                    src={preview}
                    alt="File Preview"
                    className="w-full h-full bg-contain object-fill rounded-lg"
                  />
                </div>
              ) : (
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center h-full lg:gap-2 cursor-pointer"
                >
                  <Image width={36} height={36} src="/images/dashboard/gallery-add.svg" alt='gallery'  />
                  <span className="text-grayDark lg:text-[#A6A6A6] text-xs font-poppins font-normal">
                    Upload your photo
                  </span>

                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </label>
              )}
            </div>
            {/* Validation Error */}
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