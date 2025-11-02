"use client";

import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import {
  Building2,
  CalendarDays,
  Download,
  Eye,
  File,
  FileCode,
  Files,
  FileSpreadsheet,
  FileText,
  Image,
  Video,
} from "lucide-react";

interface ResourceCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string | Date;
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
  filesCount: number;
  viewMode?: "grid" | "list";
}

// File type configuration
const fileTypeConfig = {
  pdf: {
    icon: FileText,
    color: "text-red-500",
    badgeColor: "bg-red-500",
    previewable: true,
  },
  doc: {
    icon: FileText,
    color: "text-blue-500",
    badgeColor: "bg-blue-500",
    previewable: false,
  },
  docx: {
    icon: FileText,
    color: "text-blue-500",
    badgeColor: "bg-blue-500",
    previewable: false,
  },
  txt: {
    icon: FileText,
    color: "text-gray-500",
    badgeColor: "bg-gray-500",
    previewable: false,
  },
  jpg: {
    icon: Image,
    color: "text-green-500",
    badgeColor: "bg-green-500",
    previewable: true,
  },
  jpeg: {
    icon: Image,
    color: "text-green-500",
    badgeColor: "bg-green-500",
    previewable: true,
  },
  png: {
    icon: Image,
    color: "text-green-500",
    badgeColor: "bg-green-500",
    previewable: true,
  },
  gif: {
    icon: Image,
    color: "text-purple-500",
    badgeColor: "bg-purple-500",
    previewable: true,
  },
  mp4: {
    icon: Video,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: true,
  },
  mov: {
    icon: Video,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: true,
  },
  avi: {
    icon: Video,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: true,
  },
  xls: {
    icon: FileSpreadsheet,
    color: "text-green-600",
    badgeColor: "bg-green-600",
    previewable: false,
  },
  xlsx: {
    icon: FileSpreadsheet,
    color: "text-green-600",
    badgeColor: "bg-green-600",
    previewable: false,
  },
  ppt: {
    icon: FileText,
    color: "text-orange-600",
    badgeColor: "bg-orange-600",
    previewable: false,
  },
  pptx: {
    icon: FileText,
    color: "text-orange-600",
    badgeColor: "bg-orange-600",
    previewable: false,
  },
  zip: {
    icon: File,
    color: "text-yellow-600",
    badgeColor: "bg-yellow-600",
    previewable: false,
  },
  rar: {
    icon: File,
    color: "text-yellow-600",
    badgeColor: "bg-yellow-600",
    previewable: false,
  },
  js: {
    icon: FileCode,
    color: "text-yellow-500",
    badgeColor: "bg-yellow-500",
    previewable: false,
  },
  ts: {
    icon: FileCode,
    color: "text-blue-600",
    badgeColor: "bg-blue-600",
    previewable: false,
  },
  html: {
    icon: FileCode,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: false,
  },
  css: {
    icon: FileCode,
    color: "text-blue-400",
    badgeColor: "bg-blue-400",
    previewable: false,
  },
} as const;

type FileType = keyof typeof fileTypeConfig;

export default function ResourceCard({
  id,
  title,
  description,
  date,
  fileType,
  filePath,
  downloadCount,
  viewCount,
  organizerName,
  filesCount,
  viewMode = "grid",
}: ResourceCardProps) {
  const createdDate = new Date(date);

  // Get file extension and config
  const getFileTypeInfo = () => {
    if (!fileType) return null;

    const extension = fileType.toLowerCase() as FileType;
    const config = fileTypeConfig[extension];

    if (!config) {
      return {
        icon: File,
        color: "text-gray-500",
        badgeColor: "bg-gray-500",
        previewable: false,
        extension: fileType,
      };
    }

    return {
      ...config,
      extension: fileType.toUpperCase(),
    };
  };

  const fileTypeInfo = getFileTypeInfo();
  const FileIcon = fileTypeInfo?.icon || File;
  const isPdf = fileType?.toLowerCase() === "pdf";
  const pdfFirstPageUrl =
    isPdf && filePath ? `${filePath}#page=1&view=FitH` : "";

  const renderPreview = () => {
    if (!filePath) {
      return <FileIcon className="w-24 h-24 text-gray-400" />;
    }

    if (isPdf) {
      return (
        <iframe
          src={pdfFirstPageUrl}
          className="w-full h-full border rounded-md overflow-hidden"
          title="PDF Preview"
          loading="lazy"
          scrolling="no"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        />
      );
    }

    if (fileTypeInfo?.previewable && fileTypeInfo.icon === Image) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={filePath}
          alt={title}
          className="w-full h-32 object-cover"
          loading="lazy"
        />
      );
    }

    // Default file icon for non-previewable files
    return <FileIcon className="w-24 h-24 text-gray-400" />;
  };

  return (
    <Card
      className={`rounded-lg overflow-hidden border border-gray bg-white shadow-none flex ${
        viewMode === "grid" ? "flex-col" : "flex-col lg:flex-row"
      } justify-between p-3`}
    >
      <div
        className={`relative  flex items-center justify-center ${
          viewMode === "grid" ? "mb-2 w-full" : "mb-0 w-full lg:w-[40%]"
        }`}
      >
        <div
          className={`w-full ${
            viewMode === "grid" ? "max-h-32" : "h-full"
          }  overflow-hidden scroll-m-0 flex items-center justify-center bg-gray-50`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {renderPreview()}
        </div>

        {fileTypeInfo && (
          <Badge
            className={`${fileTypeInfo.badgeColor} text-white absolute right-3 top-3`}
          >
            {fileTypeInfo.extension}
          </Badge>
        )}
      </div>

      <div
        className={`flex flex-col justify-between gap-2 ${
          viewMode === "grid" ? "w-full" : "w-full lg:w-[60%]"
        }`}
      >
        <div>
          <Title
            className={`lg:text-lg mb-3 ${
              viewMode === "grid" ? "line-clamp-1" : ""
            } text-black`}
          >
            {title}
          </Title>
          <Paragraph className="line-clamp-2 text-sm text-gray-600 mb-2">
            {description}
          </Paragraph>
          {organizerName && (
            <Paragraph className="flex items-center gap-2 text-sm">
              <Building2 size={16} /> {organizerName}
            </Paragraph>
          )}
          <div
            className={`grid ${
              viewMode === "grid" ? "grid-cols-2" : "grid-cols-5"
            } gap-2 mt-3 text-xs`}
          >
            <Paragraph className="flex items-center gap-1 lg:text-xs">
              <Download size={14} /> {downloadCount} Downloads
            </Paragraph>
            <Paragraph className="flex items-center gap-1 lg:text-xs">
              <Eye size={14} />
              {viewCount} Views
            </Paragraph>
            <Paragraph className="flex items-center gap-1 lg:text-xs">
              <CalendarDays size={14} />
              Date: {format(createdDate, "dd MMM yyyy")}
            </Paragraph>
            <Paragraph className="flex items-center gap-1 lg:text-xs">
              <Files size={14} />
              Files: {filesCount}
            </Paragraph>
            <Paragraph className="flex items-center gap-1 lg:text-xs">
              <FileIcon size={14} /> {fileTypeInfo?.extension || "Unknown"}
            </Paragraph>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <Link
            href={`/resources/${id}`}
            className="w-full h-10 bg-dashboard-primary hover:bg-transparent border border-dashboard-primary text-white hover:text-dashboard-primary flex items-center justify-center text-center text-sm font-medium rounded-md duration-300 font-inter"
          >
            <Eye className="w-4 h-4 mr-1" /> View Details
          </Link>
        </div>
      </div>
    </Card>
  );
}
