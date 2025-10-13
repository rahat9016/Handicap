"use client";

import { IResource } from "@/components/dashboard/resources/types/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatFileSize } from "@/utils/formatFileSize";
import { Separator } from "@radix-ui/react-select";
import { Download, Eye } from "lucide-react";
import React from "react";
import { FileInfo, getFileIcon } from "./ResourceDetails";

interface DownloadFilesCardProps {
  resourceData: IResource | undefined;
  selectedFiles: FileInfo[];
  selectAll: boolean;
  handleSelectAll: (checked: boolean) => void;
  handleFileSelect: (file: FileInfo, checked: boolean) => void;
  handleDownloadSelected: () => void;
  handlePreview: (id: number, filePath: string) => void;
  download: (
    id: number,
    title: string,
    filePath?: string,
    resourceId?: number | string
  ) => Promise<void>;
  resourceId: string | number;
}

const DownloadFilesCard: React.FC<DownloadFilesCardProps> = ({
  resourceData,
  selectedFiles,
  selectAll,
  handleSelectAll,
  handleFileSelect,
  handleDownloadSelected,
  handlePreview,
  download,
  resourceId,
}) => {
  return (
    <Card className="sticky top-4 bg-slate-50">
      <CardHeader>
        <CardTitle className="text-xl">Download Files</CardTitle>
        <CardDescription>Select and download resource files</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Select All and Download Button */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all" className="text-base font-medium">
              Select All Files
            </Label>
          </div>
          <Button
            onClick={handleDownloadSelected}
            disabled={selectedFiles.length === 0}
            className="w-full bg-inclusion-teal hover:bg-inclusion-teal/90"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Selected ({selectedFiles.length})
          </Button>
        </div>

        <Separator />

        {/* Individual Files */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Individual Files</h4>
          <TooltipProvider>
            <div className="space-y-3">
              {resourceData?.resourceFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg bg-white transition-colors"
                >
                  <Checkbox
                    id={`file-${file.id}`}
                    checked={selectedFiles.some((f) => f.id === file.id)}
                    onCheckedChange={(checked) =>
                      handleFileSelect(file, checked === true)
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getFileIcon(file.fileType)}
                      <div className="font-medium text-sm truncate">
                        {file.title}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {file.description}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatFileSize(file.fileSize)} • {file.language.name}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => handlePreview(file.id, file.filePath)}
                          className="h-8 w-8 p-0 bg-dashboard-primary hover:bg-dashboard-primary text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Open file</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() =>
                            download(
                              file.id,
                              file.title,
                              file.filePath,
                              resourceId
                            )
                          }
                          className="h-8 w-8 p-0 bg-dashboard-primary hover:bg-dashboard-primary text-white"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download file</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadFilesCard;
