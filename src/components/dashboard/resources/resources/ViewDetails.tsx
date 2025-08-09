import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, CheckCircle, Download, Eye, FileText, FileType, Globe, HardDrive, Hash, Tag, User } from "lucide-react";
import Image from "next/image";
import { IResource } from "../types/types";

// export default function ViewResourceDetails({
//   isOpen,
//   onClose,
//   resource,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   resource?: IResource;
// }) {
//     console.log(resource)
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Resource Details</DialogTitle>
//         </DialogHeader>

//         {/* File Preview */}
//         <div className="flex items-center space-x-4">
//           <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
//             {resource?.filePath ? (
//               <Image
//                 src={resource.filePath}
//                 alt="Resource"
//                 width={64}
//                 height={64}
//                 className="object-cover"
//               />
//             ) : (
//               <FileText className="w-8 h-8 text-gray-400" />
//             )}
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">
//               {resource?.title}
//             </h2>
//             <p className="text-sm text-gray-500">{resource?.description}</p>
//           </div>
//         </div>

//         {/* Info List */}
//         <div className="mt-6 space-y-2">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Category:</span>
//             <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//               {resource?.category?.name}
//             </span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Language:</span>
//             <span className="text-sm flex items-center gap-1">
//               <Languages className="w-4 h-4" /> {resource?.language?.name}
//             </span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">File Type:</span>
//             <span className="text-sm">{resource?.fileType}</span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">File Size:</span>
//             <span className="text-sm">{(resource?.fileSize ?? 0) / 1024} KB</span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Version:</span>
//             <span className="text-sm">{resource?.version}</span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Uploader:</span>
//             <span className="text-sm">
//               {resource?.uploader?.firstName} {resource?.uploader?.lastName}
//             </span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Keywords:</span>
//             <div className="flex flex-wrap gap-1">
//               {resource?.keywords?.map((k) => (
//                 <span
//                   key={k.keyword.id}
//                   className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
//                 >
//                   <Tag className="w-3 h-3 inline-block mr-1" />
//                   {k.keyword.name}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Views:</span>
//             <span className="text-sm flex items-center gap-1">
//               <Eye className="w-4 h-4" /> {resource?.viewCount}
//             </span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Downloads:</span>
//             <span className="text-sm flex items-center gap-1">
//               <Download className="w-4 h-4" /> {resource?.downloadCount}
//             </span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-600 font-medium">Created At:</span>
//             <span className="text-sm flex items-center gap-1">
//               <Calendar className="w-4 h-4" />{" "}
//               {resource?.createdAt &&
//                 new Date(resource.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }


export default function ViewResourceDetails({
  isOpen,
  onClose,
  resource,
}: {
  isOpen: boolean
  onClose: () => void
  resource?: IResource
}) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return "📄"
    if (fileType.includes("image")) return "🖼️"
    if (fileType.includes("video")) return "🎥"
    if (fileType.includes("audio")) return "🎵"
    return "📁"
  }
console.log(resource)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue" />
            
            Resource Details
          </DialogTitle>
        </DialogHeader>

        {/* Header Section */}
        <div className="flex items-start space-x-4 pb-4 border-b font-inter">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue to-purple-100 flex items-center justify-center text-2xl overflow-hidden">
            <Image src={resource?.filePath || ""} alt="Resource" width={64} height={64} className="object-cover" />
            {/* {getFileTypeIcon(resource?.fileType || "")} */}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold  mb-1">{resource?.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{resource?.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3 text-green" />
                {resource?.downloadCount} downloads
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-blue" />
                {resource?.viewCount} views
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex flex-col gap-4 mt-4">
          {/* File Information */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <FileType className="w-4 h-4 text-blue" />
              File Information
            </h3>

            <div className="space-y-2 pl-6 font-inter">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Type:</span>
                <Badge className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-100">
                  {getFileTypeIcon(resource?.fileType || "")} {resource?.fileType}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Size:</span>
                <span className="text-sm font-medium flex items-center gap-1">
                  <HardDrive className="w-4 h-4 " />
                  {formatFileSize(resource?.fileSize || 0)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Version:</span>
                <div className="flex items-center gap-1">
                  <Badge className="text-xs text-purple-800 hover:bg-purple-100 bg-purple-50">
                    v{resource?.version}
                  </Badge>
                  {resource?.isCurrent && <CheckCircle className="w-4 h-4 text-green" />}
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-3 font-inter">
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-600" />
              Metadata
            </h3>

            <div className="space-y-2 pl-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Language:</span>
                <Badge className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-100">
                  <Globe className="w-4 h-4 mr-1" />
                  {resource?.language.name}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Category:</span>
                <Badge className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-100">
                  {resource?.category.name}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Uploader:</span>
                <span className="text-sm font-medium flex items-center gap-1 capitalize">
                  <User className="w-4 h-4 text-gray-500 " />
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
              <Calendar className="w-5 h-5 " />
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
  )
}