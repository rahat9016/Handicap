"use client";

import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/config/envConfig";
import { formatFileSize } from "@/utils/formatFileSize";
import { isValidUrl } from "@/utils/isValidUrl";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { Download, Eye, FileText } from "lucide-react";
import Image from "next/image";
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
}

export default function ResourceCard({
  id,
  title,
  description,
  imageUrl,
  date,
  size,
  // ratings,
  isFeatured,
  fileType,
  filePath,
  downloadCount,
  isPrivate,
}: ResourceCardProps) {
  const [open, setOpen] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfBlobUrl]);

  const handlePreview = async (filePath: string) => {
    try {
      const res = await axios.get(filePath, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
      setOpen(true);
    } catch (err) {
      console.error("PDF preview failed:", err);
    }
  };

  const handleDownload = () => {
    fetch(`${getBaseUrl()}/resources/${id}/download`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        Accept: "application/octet-stream",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch file");
        console.log(res);
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title || "download"}.bin`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("Download error:", err);
        alert("Download failed");
      });
  };

  const handleClose = () => {
    setOpen(false);
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
  };
  const createdDate = new Date(date as string);
  const isImage = fileType?.startsWith("image/");
  const isPdf = fileType === "application/pdf";
  return (
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col">
      <PDFModal
        open={open}
        onClose={handleClose}
        filePath={pdfBlobUrl}
        fileType={fileType}
      />
      <div className="relative w-full h-56 flex items-center justify-center">
        {isImage ? (
          <Image
            src={
              isValidUrl(imageUrl)
                ? (imageUrl as string)
                : "/images/dashboard/gallery-add.svg"
            }
            alt={title}
            fill
            className="object-cover"
          />
        ) : isPdf ? (
          <FileText className="w-32 h-32 text-red-500 " /> // PDF icon
        ) : (
          <span className="text-gray-500">No preview available</span>
        )}
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

      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <Title className="lg:text-lg mb-3 line-clamp-1 text-black">
            {title}
          </Title>
          <Paragraph className="line-clamp-3">{description}</Paragraph>
          <div className="grid grid-cols-2 mt-3">
            <Paragraph>{downloadCount} Downloads</Paragraph>
            {/* <Paragraph>Ratings: {ratings ?? 0}</Paragraph> */}

            <Paragraph>Date: {format(createdDate, "dd MMM yyyy")}</Paragraph>
            <Paragraph>File Size: {formatFileSize(size || 0)}</Paragraph>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <Button
            className="w-full h-10 bg-primary text-white"
            onClick={handleDownload}
            disabled={isPrivate}
          >
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <Button
            disabled={isPrivate}
            onClick={() => filePath && handlePreview(filePath)}
            className="w-full h-10 bg-transparent hover:bg-transparent border border-[#00A896] text-[#00A896]"
          >
            <Eye className="w-4 h-4 mr-1" /> Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
