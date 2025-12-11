import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatFileSize } from "@/utils/formatFileSize";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  Globe,
  Hash,
  Tag,
  User,
} from "lucide-react";
import Image from "next/image";
import { IResource } from "../types/types";
import { formatDate } from "@/utils/formatDate";

function getFileTypeIcon(fileType: string) {
  if (fileType.includes("pdf"))
    return <FileText className="w-10 h-10 text-red-500" />;
  if (
    fileType.includes("png") ||
    fileType.includes("jpg") ||
    fileType.includes("jpeg")
  ) {
    return null;
  }
  return <FileText className="w-10 h-10 text-gray-500" />;
}


export default function ViewResourceDetails({
  isOpen,
  onClose,
  resource,
}: {
  isOpen: boolean;
  onClose: () => void;
  resource?: IResource;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-h-[95vh] w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue" />
            Resource Details
          </DialogTitle>
        </DialogHeader>

        {/* Header Section */}
        <div className="flex items-start space-x-4 pb-4 border-b font-inter">
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue to-purple-100 flex items-center justify-center overflow-hidden p-2">
            {resource?.fileType === "application/pdf" ? (
              <FileText className="w-10 h-10 text-white" />
            ) : (
              <Image
                src={resource?.filePath || "/images/dashboard/gallery-add.svg"}
                alt="Resource Thumbnail"
                width={80}
                height={80}
                className="object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">{resource?.title.en}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {resource?.description.en}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3 text-green" />
                {resource?.totalDownloadCount} downloads
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-blue" />
                {resource?.totalViewCount} views
              </span>
            </div>
          </div>
        </div>

        {/* Resource Files */}
        {resource?.resourceFiles && resource.resourceFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-purple-600" />
              Files ({resource.resourceFiles.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resource.resourceFiles.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-lg p-3 flex items-start gap-3 bg-gray-50 hover:bg-gray-100 transition"
                >
                  
                  <div className="w-32 h-32 flex items-center justify-center rounded bg-white border overflow-hidden">
                    {file.fileType.startsWith("mp4") ? (
                      <video
                        src={file.filePath}
                        controls
                        className="w-full h-full object-cover rounded"
                      ></video>
                    ) : file.fileType.includes("png") ||
                      file.fileType.includes("jpg") ||
                      file.fileType.includes("jpeg") ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={file.filePath}
                          alt={file.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      getFileTypeIcon(file.fileType)
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{file.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {file.description}
                    </p>

                    <div className="mt-1 text-xs text-gray-500 flex gap-3">
                      <span>{formatFileSize(file.fileSize)}</span>
                      <span>{file.downloadCount} downloads</span>
                      <span>{file.viewCount} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="space-y-3 font-inter">
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-600" />
              Metadata
            </h3>

            <div className="space-y-2 pl-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Language:</span>
                <Badge className="text-xs bg-blue-100 text-blue-800">
                  <Globe className="w-4 h-4 mr-1" />
                  {resource?.language.name}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Category:</span>
                <Badge className="text-xs bg-purple-100 text-purple-800">
                  {resource?.category.name}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Uploader:</span>
                <span className="text-sm font-medium flex items-center gap-1 capitalize">
                  <User className="w-4 h-4 text-gray-500" />
                  {resource?.uploader.firstName} {resource?.uploader.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Keywords */}
        {resource?.keywords && resource.keywords.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-green" />
              Keywords
            </h3>

            <div className="flex flex-wrap gap-2">
              {resource.keywords.map((keywordObj) => (
                <Badge
                  key={keywordObj.keyword.id}
                  className="text-xs bg-[#bfffbb5d] text-green border-green"
                >
                  {keywordObj.keyword.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="mt-4 pt-4 border-t font-inter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Created: {formatDate(resource?.createdAt || "")}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Updated: {formatDate(resource?.updatedAt || "")}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
