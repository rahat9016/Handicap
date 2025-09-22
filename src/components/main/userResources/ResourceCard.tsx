// "use client";

// import Paragraph from "@/components/share/Paragraph";
// import Title from "@/components/share/Title";
// import { Badge } from "@/components/ui/badge";
// import { Link } from "@/i18n/navigation";
// import { formatFileSize } from "@/utils/formatFileSize";
// import { format } from "date-fns";
// import { Building2, Eye, NotebookText } from "lucide-react";

// interface ResourceCardProps {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl: string;
//   date: string;
//   size: number;
//   ratings?: number;
//   isFeatured?: boolean;
//   isPdf?: boolean;
//   fileType?: string;
//   filePath?: string;
//   downloadCount: number;
//   isPrivate?: boolean;
//   viewCount: number;
//   organizerName?: string;
//   refetch: () => void;
//   filesCount: number;
// }

// export default function ResourceCard({
//   id,
//   title,
//   description,
//   date,
//   size,
//   isFeatured,
//   fileType,
//   filePath,
//   downloadCount,
//   // isPrivate,
//   viewCount,
//   organizerName,
//   filesCount,
// }: ResourceCardProps) {
//   const createdDate = new Date(date as string);
//   const pdfFirstPageUrl = `${filePath}#page=1&view=FitH`;


//   return (
//     <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col justify-between p-3">
//       <div className="relative w-full flex items-center justify-center mb-2">
//         {/* <NotebookText className="w-24 h-24 text-red-500 " /> */}

//         <div className="w-full max-h-32 overflow-hidden scroll-m-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//   {filePath ? (
//     <iframe
//       src={pdfFirstPageUrl}
//       className="w-full h-32  scrollbar   overflow-hidden"
//       title="PDF Preview"
//       loading="lazy"
//       scrolling="no" 
      
//       style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}// 👈 disables scrollbars
//     />
//   ) : (
//     <NotebookText className="w-24 h-24 text-red-500" />
//   )}
// </div>


//         {/* <div className="w-full h-32 overflow-hidden ">
//     {filePath ? (
//       <iframe
//         src={pdfFirstPageUrl}
//         className="w-full h-32 border-none"
//         title="PDF Preview"
//         loading="lazy"
//       />
//     ) : (
//       <NotebookText className="w-24 h-24 text-red-500" />
//     )}
//   </div> */}
        
//         {isFeatured && (
//           <Badge className="bg-[#F26419] text-white absolute left-3 top-5">
//             Featured
//           </Badge>
//         )}
//         {fileType && (
//           <Badge className="bg-[#00A896] text-white absolute right-3 top-5">
//             {fileType}
//           </Badge>
//         )}
//       </div>

//       <div className="flex flex-col justify-between gap-2">
//         <div>
//           <Title className="lg:text-lg mb-3 line-clamp-1 text-black">
//             {title}
//           </Title>
//           <Paragraph className="line-clamp-1">{description}</Paragraph>
//           <Paragraph className="flex items-center gap-2 mt-2">
//             <Building2 /> {organizerName}
//           </Paragraph>
//           <div className="grid grid-cols-2 mt-3">
//             <Paragraph>{downloadCount} Downloads</Paragraph>
//             <Paragraph>{viewCount} Views</Paragraph>
//             <Paragraph>Date: {format(createdDate, "dd MMM yyyy")}</Paragraph>
//             <Paragraph>File Size: {formatFileSize(size || 0)}</Paragraph>
//             <Paragraph>Total Resource Files: {filesCount}</Paragraph>
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           <Link
//             href={`/resources/${id}`}
//             className="w-full h-10 bg-transparent hover:bg-transparent border border-[#00A896] text-[#00A896] flex items-center justify-center text-center"
//           >
//             <Eye className="w-4 h-4 mr-1" /> View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { formatFileSize } from "@/utils/formatFileSize";
import { format } from "date-fns";
import { Building2, Eye, File, FileCode, FileSpreadsheet, FileText, Image, Video } from "lucide-react";

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
}

// File type configuration
const fileTypeConfig = {
  pdf: {
    icon: FileText,
    color: "text-red-500",
    badgeColor: "bg-red-500",
    previewable: true
  },
  doc: {
    icon: FileText,
    color: "text-blue-500",
    badgeColor: "bg-blue-500",
    previewable: false
  },
  docx: {
    icon: FileText,
    color: "text-blue-500",
    badgeColor: "bg-blue-500",
    previewable: false
  },
  txt: {
    icon: FileText,
    color: "text-gray-500",
    badgeColor: "bg-gray-500",
    previewable: false
  },
  jpg: {
    icon: Image,
    color: "text-green-500",
    badgeColor: "bg-green-500",
    previewable: true
  },
  jpeg: {
    icon: Image,
    color: "text-green-500",
    badgeColor: "bg-green-500",
    previewable: true
  },
  png: {
    icon: Image,
    color: "text-green-500",
    badgeColor: "bg-green-500",
    previewable: true
  },
  gif: {
    icon: Image,
    color: "text-purple-500",
    badgeColor: "bg-purple-500",
    previewable: true
  },
  mp4: {
    icon: Video,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: true
  },
  mov: {
    icon: Video,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: true
  },
  avi: {
    icon: Video,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: true
  },
  xls: {
    icon: FileSpreadsheet,
    color: "text-green-600",
    badgeColor: "bg-green-600",
    previewable: false
  },
  xlsx: {
    icon: FileSpreadsheet,
    color: "text-green-600",
    badgeColor: "bg-green-600",
    previewable: false
  },
  ppt: {
    icon: FileText,
    color: "text-orange-600",
    badgeColor: "bg-orange-600",
    previewable: false
  },
  pptx: {
    icon: FileText,
    color: "text-orange-600",
    badgeColor: "bg-orange-600",
    previewable: false
  },
  zip: {
    icon: File,
    color: "text-yellow-600",
    badgeColor: "bg-yellow-600",
    previewable: false
  },
  rar: {
    icon: File,
    color: "text-yellow-600",
    badgeColor: "bg-yellow-600",
    previewable: false
  },
  js: {
    icon: FileCode,
    color: "text-yellow-500",
    badgeColor: "bg-yellow-500",
    previewable: false
  },
  ts: {
    icon: FileCode,
    color: "text-blue-600",
    badgeColor: "bg-blue-600",
    previewable: false
  },
  html: {
    icon: FileCode,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
    previewable: false
  },
  css: {
    icon: FileCode,
    color: "text-blue-400",
    badgeColor: "bg-blue-400",
    previewable: false
  }
} as const;

type FileType = keyof typeof fileTypeConfig;

export default function ResourceCard({
  id,
  title,
  description,
  date,
  size,
  isFeatured,
  fileType,
  filePath,
  downloadCount,
  viewCount,
  organizerName,
  filesCount,
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
        extension: fileType
      };
    }
    
    return {
      ...config,
      extension: fileType.toUpperCase()
    };
  };

  const fileTypeInfo = getFileTypeInfo();
  const FileIcon = fileTypeInfo?.icon || File;
  const isPdf = fileType?.toLowerCase() === 'pdf';
  const pdfFirstPageUrl = isPdf && filePath ? `${filePath}#page=1&view=FitH` : "";

  const renderPreview = () => {
    if (!filePath) {
      return <FileIcon className="w-24 h-24 text-gray-400" />;
    }

    if (isPdf) {
      return (
        <iframe
          src={pdfFirstPageUrl}
          className="w-full h-32 border-none"
          title="PDF Preview"
          loading="lazy"
          scrolling="no"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        />
      );
    }

    if (fileTypeInfo?.previewable && fileTypeInfo.icon === Image) {
      return (
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
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col justify-between p-3">
      <div className="relative w-full flex items-center justify-center mb-2">
        <div 
          className="w-full max-h-32 overflow-hidden scroll-m-0 flex items-center justify-center bg-gray-50"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {renderPreview()}
        </div>
        
        {isFeatured && (
          <Badge className="bg-[#F26419] text-white absolute left-3 top-3">
            Featured
          </Badge>
        )}
        
        {fileTypeInfo && (
          <Badge className={`${fileTypeInfo.badgeColor} text-white absolute right-3 top-3`}>
            {fileTypeInfo.extension}
          </Badge>
        )}
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div>
          <Title className="lg:text-lg mb-3 line-clamp-1 text-black">
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
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <Paragraph>{downloadCount} Downloads</Paragraph>
            <Paragraph>{viewCount} Views</Paragraph>
            <Paragraph>Date: {format(createdDate, "dd MMM yyyy")}</Paragraph>
            <Paragraph>Size: {formatFileSize(size || 0)}</Paragraph>
            <Paragraph>Files: {filesCount}</Paragraph>
            <Paragraph className="flex items-center gap-1">
              <FileIcon size={12} /> {fileTypeInfo?.extension || "Unknown"}
            </Paragraph>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <Link
            href={`/resources/${id}`}
            className="w-full h-10 bg-transparent hover:bg-transparent border border-[#00A896] text-[#00A896] flex items-center justify-center text-center text-sm font-medium"
          >
            <Eye className="w-4 h-4 mr-1" /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
