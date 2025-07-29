import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

import { Input } from "../ui/input";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png",  "image/svg+xml"];
interface IImageFileInputProps {
  name: string;
  errors: Record<string, FieldError>;
}

const MultipleImageFileInput = ({ name, errors }: IImageFileInputProps) => {
  const { control, getValues, setValue, trigger } = useFormContext();
  const initialValue = getValues(name);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(initialValue)) {
      const urls = initialValue.map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file
      );
      setPreviews(urls);
    }
  }, [initialValue]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { value: File[]; onChange: (files: File[]) => void }
  ) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) =>
      SUPPORTED_FORMATS.includes(file.type)
    );
    const fileUrls = validImages.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...previews, ...fileUrls];
    setPreviews(updatedPreviews);
    const updatedFiles = [...field.value, ...validImages];
    field.onChange(updatedFiles);
  };

  const handleDelete = async (
    index: number,
    field: { value: File[]; onChange: (files: File[]) => void }
  ) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = (field.value || []).filter(
      (_: File, i: number) => i !== index
    );
    setPreviews(updatedPreviews);
    setValue(name, updatedFiles, { shouldValidate: true });
    await trigger(name);
  };

  const findErrorPosition = (
    errorsObject: Record<string, FieldError | undefined>
  ): number[] => {
    if (!errorsObject || typeof errorsObject !== "object") return [];
    return Object.keys(errorsObject)
      .map((key) => (errorsObject[key]?.message ? parseInt(key, 10) : null))
      .filter((index): index is number => index !== null);
  };

  const getAllErrorMessages = (
    errorObject: Record<number, FieldError> | undefined
  ): string[] => {
    if (!errorObject || typeof errorObject !== "object") return [];
    return Object.values(errorObject)
      .map((error) => error?.message)
      .filter((msg): msg is string => Boolean(msg));
  };

  const parseFieldErrors = (
    fieldError: Record<string, FieldError> | FieldError | undefined
  ): { messages: string[]; indexes: number[] } => {
    if (!fieldError) return { messages: [], indexes: [] };
    if (typeof fieldError === "object" && !("message" in fieldError)) {
      return {
        messages: getAllErrorMessages(fieldError),
        indexes:
          typeof fieldError === "object" && !("message" in fieldError)
            ? findErrorPosition(fieldError as Record<string, FieldError>)
            : [],
      };
    }
    return {
      messages:
        typeof fieldError?.message === "string" ? [fieldError.message] : [],
      indexes: [],
    };
  };

  const fieldError = errors?.[name];
  const { messages: errorMessages, indexes: errorIndex } =
    parseFieldErrors(fieldError);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        return (
          <div>
            <div className="flex items-center gap-4">
              <div
                className={
                  "w-[56px] lg:w-full xl:w-[163px] h-[56px] lg:h-[157px] border-[1px] border-dashed border-grayDark hover:border-dashboard-primary rounded-lg cursor-pointer block"
                }
              >
                <label
                  htmlFor={"id"}
                  className="flex flex-col items-center justify-center h-full lg:gap-2 cursor-pointer py-5"
                >
                  <Image
                    width={36}
                    height={36}
                    src="/images/dashboard/gallery-add.svg"
                    alt="gallery"
                  />
                  <span className="text-grayDark lg:text-[#A6A6A6] text-xs font-poppins font-normal">
                    Upload your photo
                  </span>

                  <Input
                    multiple
                    id={"id"}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {previews &&
                  previews?.map((src, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`w-[56px] lg:w-full xl:w-[160px] h-[56px] lg:h-[157px] border lg:border-none bg-[#DAE6F5] lg:p-2 ${
                          errorIndex.includes(index)
                            ? "border-2 border-rose-600"
                            : "border-[#B2B2B2]"
                        } rounded-lg relative group`}
                      >
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleDelete(index, field)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              handleDelete(index, field);
                          }}
                          className="absolute w-5 lg:w-6 h-5 lg:h-6 flex items-center justify-center bg-smokyBlack lg:bg-white lg:text-[#1A1A1A] text-white rounded-full -right-2 lg:right-3 lg:top-3 -top-2 cursor-pointer z-10 lg:shadow-md"
                        >
                          <IoCloseOutline />
                        </div>
                        <Image
                          width={126}
                          height={150}
                          src={src}
                          alt={`Preview ${index}`}
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            {errorMessages.length > 0 && (
              <p className="text-rose-500 text-xs mt-1 pl-2">
                {errorMessages[0]}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default MultipleImageFileInput;
