import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface PDFFileUploadControllerProps {
  name: string;
  className?: string;
  initialUrl?: string;
  label?: string;
}

export function PDFFileUploadController({
  name,
  className,
  initialUrl,
  label,
}: PDFFileUploadControllerProps) {
  const { control } = useFormContext();
  const [pdfUrl, setPdfUrl] = useState<string | null>(initialUrl || null);
  const [open, setOpen] = useState(false);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (pdfUrl && pdfUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialUrl || null}
      render={({ field, fieldState }) => {
        const fileValue = field.value;

        const isPdf =
          fileValue instanceof File
            ? fileValue.type === "application/pdf"
            : typeof fileValue === "string"
            ? fileValue.endsWith(".pdf")
            : false;

        const preview =
          fileValue instanceof File
            ? URL.createObjectURL(fileValue)
            : typeof fileValue === "string"
            ? fileValue
            : pdfUrl; // fallback to initialUrl

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (file.type !== "application/pdf") return;

          field.onChange(file);
          setPdfUrl(URL.createObjectURL(file));
        };

        const handleDelete = () => {
          field.onChange(null); // clear RHF value
          setPdfUrl(null);
        };

        return (
          <div>
            <div
              className={`w-full h-[132px] border-[1px] border-dashed hover:border-dashboard-primary bg-[#F5F5F5] border-[#B0B0B0] rounded-lg cursor-pointer relative ${className}`}
            >
              {fileValue && isPdf && preview ? (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="absolute w-6 h-6 flex items-center justify-center bg-dashboard-primary rounded-full p-1 -right-2 -top-2"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>

                  <FileText className="w-10 h-10 text-rose-600" />
                  <p className="text-sm font-normal mt-2 text-center truncate max-w-[200px]">
                    {fileValue instanceof File ? fileValue.name : "PDF File"}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-sm underline"
                    onClick={() => setOpen(true)}
                  >
                    View PDF
                  </button>
                </div>
              ) : (
                <label
                  htmlFor={`${name}-file`}
                  className="flex flex-col items-center justify-center h-full cursor-pointer"
                >
                  <Image
                    width={36}
                    height={36}
                    src="/images/dashboard/gallery-add.svg"
                    alt="Upload PDF"
                  />
                  <span className="text-grayDark text-xs text-center mt-2">
                    {label || "Upload PDF file"}
                  </span>
                  <input
                    id={`${name}-file`}
                    type="file"
                    accept="application/pdf"
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

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
                {preview && (
                  <iframe
                    src={preview}
                    className="w-full h-full"
                    title="PDF Preview"
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        );
      }}
    />
  );
}
