"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface PDFModalProps {
  open: boolean;
  onClose: () => void;
  filePath: string | null;
  fileType: string | undefined;
}

export default function PDFModal({
  open,
  onClose,
  filePath,
  fileType,
}: PDFModalProps) {
  const isImage = fileType?.startsWith("image/");
  const isPdf = fileType === "application/pdf";
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-1/2 !max-w-none h-[90vh] p-0">
        {filePath ? (
          isImage ? (
            <Image
              width={500}
              height={500}
              src={filePath}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : isPdf ? (
            <iframe
              src={filePath}
              className="w-full h-full border-none"
              title="PDF Preview"
            />
          ) : (
            <p className="text-center mt-4">
              File type not supported for preview.
            </p>
          )
        ) : (
          <p className="text-center mt-4">Loading preview...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
