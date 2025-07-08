"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import PDF from "./PDF";
import { IResourceData } from "./types/interface";

interface PDFModalProps {
  open: boolean;
  onClose: () => void;
  data: IResourceData;
}

export default function PDFModal({ open, onClose, data }: PDFModalProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open && data) {
      const generatePDF = async () => {
        const blob = await pdf(<PDF data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      };
      generatePDF();
    } else {
      setPdfUrl(null);
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [open, data]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh]">
        <div className="mt-3">
          {pdfUrl ? (
            <iframe src={pdfUrl} className="w-full h-full border rounded-md" />
          ) : (
            <p className="text-center">Generating PDF...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
