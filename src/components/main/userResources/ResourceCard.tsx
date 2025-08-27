"use client";

import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { formatFileSize } from "@/utils/formatFileSize";
import { format } from "date-fns";
import { Building2, Eye, NotebookText } from "lucide-react";
import { useEffect, useState } from "react";
import PDFModal from "./PDFModal";

interface ResourceCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  size: number;
  ratings?: number;
  isFeatured?: boolean;
  isPdf?: boolean;
  fileType?: string;
  filePath?: string;
  downloadCount: number;
  isPrivate?: boolean;
  viewCount: number;
  organizerName?: string;
  refetch: () => void;
  filesCount: number
}

export default function ResourceCard({
  id,
  title,
  description,
  date,
  size,
  isFeatured,
  fileType,
  // filePath,
  downloadCount,
  // isPrivate,
  viewCount,
  organizerName,
  filesCount
}: ResourceCardProps) {
  const [open, setOpen] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);


  useEffect(() => {
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfBlobUrl]);


  const handleClose = () => {
    setOpen(false);
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
  };
  const createdDate = new Date(date as string);
  return (
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col justify-between p-3">
      <PDFModal
        open={open}
        onClose={handleClose}
        filePath={pdfBlobUrl}
        fileType={fileType}
      />
      <div className="relative w-full flex items-center justify-center mb-2">
        <NotebookText className="w-24 h-24 text-red-500 " />
        {isFeatured && (
          <Badge className="bg-[#F26419] text-white absolute left-3 top-5">
            Featured
          </Badge>
        )}
        {fileType && (
          <Badge className="bg-[#00A896] text-white absolute right-3 top-5">
            {fileType}
          </Badge>
        )}
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div>
          <Title className="lg:text-lg mb-3 line-clamp-1 text-black">
            {title}
          </Title>
          <Paragraph className="line-clamp-3">{description}</Paragraph>
          <Paragraph className="flex items-center gap-2 mt-2"><Building2 /> {organizerName}</Paragraph>
          <div className="grid grid-cols-2 mt-3">
            <Paragraph>{downloadCount} Downloads</Paragraph>
            <Paragraph>{viewCount} Views</Paragraph>
            <Paragraph>Date: {format(createdDate, "dd MMM yyyy")}</Paragraph>
            <Paragraph>File Size: {formatFileSize(size || 0)}</Paragraph>
            <Paragraph>Total Resource Files: {filesCount}</Paragraph>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
          href={`/resources/${id}`}
            className="w-full h-10 bg-transparent hover:bg-transparent border border-[#00A896] text-[#00A896] flex items-center justify-center text-center"
          >
            <Eye className="w-4 h-4 mr-1" /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
