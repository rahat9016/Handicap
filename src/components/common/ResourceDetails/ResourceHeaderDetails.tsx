"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Download, Eye, Globe, Hash, User } from "lucide-react";
import { BsFileText } from "react-icons/bs";

type ResourceHeaderDetailsProps = {
  title?: string;
  description?: string;
  uploader?: {
    firstName: string;
    lastName: string;
  };
  createdAt?: string;
  updatedAt?: string;
  organization?: { name: string };
  totalDownloadCount?: number;
  totalViewCount?: number;
  filesCount?: number;
  keywords?: {
    keyword: {
      id: number | string;
      name: string;
    };
  }[];
};

export default function ResourceHeaderDetails({
  title,
  description,
  uploader,
  createdAt,
  updatedAt,
  organization,
  totalDownloadCount,
  totalViewCount,
  filesCount,
  keywords,
}: ResourceHeaderDetailsProps) {
  return (
    <div className="space-y-6 mb-8 bg-slate-50 border p-6 rounded-lg">
      <h1 className="text-4xl font-bold tracking-tight font-inter">{title}</h1>
      <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>

      {/* Metadata */}
      <div className="flex flex-wrap gap-8 text-sm text-black">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{uploader?.firstName + " " + uploader?.lastName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Published {createdAt &&new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Updated {updatedAt &&new Date(updatedAt).toLocaleDateString()}</span>
        </div>
        {organization?.name && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>{organization.name}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-8 text-sm">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{totalDownloadCount?.toLocaleString()}</span>
          <span className="text-muted-foreground">Total Files Download</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{totalViewCount?.toLocaleString()}</span>
          <span className="text-muted-foreground">Total views</span>
        </div>
        <div className="flex items-center gap-2">
          <BsFileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{filesCount?.toLocaleString()}</span>
          <span className="text-muted-foreground">Total Resource Files</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 pt-4 border-t">
        <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
          <Hash className="w-4 h-4 text-green" />
          Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {keywords?.map((keywordObj) => (
            <Badge
              key={keywordObj.keyword.id}
              className="text-xs bg-[#bfffbb5d] text-green border-green"
            >
              {keywordObj.keyword.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
