/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Download,
  ExternalLink,
  Eye,
  FileText,
  FileType,
  ImageIcon,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ResourceDetailSkeleton from "@/app/[locale]/admin/resources/[id]/ResourceDetailSkeleton";
import { IResource } from "@/components/dashboard/resources/types/types";
import PDFModal from "@/components/main/userResources/PDFModal";
import { useDownloadResource } from "@/components/main/userResources/useDownloadResource";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { usePreview } from "@/hooks/usePreview";
import { formatFileSize } from "@/utils/formatFileSize";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-toastify";
import { ResourceHeader } from "./ResourceHeader";
import ResourceHeaderDetails from "./ResourceHeaderDetails";
type FileInfo = {
  id: number;
  title: string;
  filePath: string;
};
export default function ResourceDetails() {
  const params = useParams();
  const resourceId = params.id as string;
  const [activeFile, setActiveFile] = useState<FileInfo | null>(null);
  const [imageZoom, setImageZoom] = useState(100);
  const [imageRotation, setImageRotation] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { mutateAsync: previewFile } = usePreview();
  const { data, isLoading, refetch } = useGet<IResource>(
    `/resources/${resourceId}`,
    ["resources", resourceId]
  );
  const { download } = useDownloadResource(refetch);
  const resourceData = data?.data;
  const { mutateAsync } = usePost(
    `/resources/view/${resourceId}`,
    (data) => {
      console.log("POST success", data);
    },
    [["resources"]]
  );

  useEffect(() => {
    if (resourceData) {
      setActiveFile(resourceData?.resourceFiles[0] || null);
      setSelectedFiles(
        resourceData?.resourceFiles.map((f: any) => ({
          id: f.id,
          title: f.title,
          filePath: f.filePath,
        })) || []
      );
      setSelectAll(true);
    }
  }, [resourceData, resourceId]);

  const handleFileSelect = (file: FileInfo, checked: boolean) => {
    let newSelected: FileInfo[];
    if (checked) {
      newSelected = [...selectedFiles, file].filter(
        (f, i, arr) => arr.findIndex((x) => x.id === f.id) === i
      );
    } else {
      newSelected = selectedFiles.filter((f) => f.id !== file.id);
    }
    setSelectedFiles(newSelected);
    setSelectAll(
      newSelected.length === (resourceData?.resourceFiles?.length || 0)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(
        resourceData?.resourceFiles.map((f: any) => ({
          id: f.id as number,
          title: f.title,
          filePath: f.filePath,
        })) || []
      );
      setSelectAll(true);
    } else {
      setSelectedFiles([]);
      setSelectAll(false);
    }
  };

  const handlePreview = async (id: number, filePath: string) => {
    try {
      const blob = await previewFile(filePath);
      const url = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      mutateAsync({
        resourceFileIds: [id],
      });
      setPdfBlobUrl(url);
      setOpen(true);
    } catch (err) {
      console.error("PDF preview failed:", err);
      toast.error("PDF preview failed");
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
  };

  const handleDownload = (id: number, title: string, filePath: string) => {
    download(id, title, filePath, resourceId);
  };

  const handleDownloadSelected = async () => {
    for (const file of selectedFiles) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      handleDownload(file.id, file.title, file.filePath);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "doc":
        return <FileType className="h-4 w-4 text-blue-500" />;
      case "text":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "image":
      case "jpeg":
      case "jpg":
      case "png":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  const renderFilePreview = (file: any) => {
    switch (file.fileType) {
      case "pdf":
        return (
          <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center min-h-[500px]">
            <FileText className="h-20 w-20 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">PDF Document</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              {file.description}
            </p>
            <div className="text-sm text-muted-foreground mb-6">
              {formatFileSize(file.fileSize)} • {file.language?.name}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handlePreview(file.id, file.filePath)}
                className="bg-dashboard-primary text-white"
              >
                <Eye className="h-4 w-4" />
                Open PDF
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleDownload(file.id, file.title, file.filePath)
                }
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        );

      case "doc":
      case "docs":
        return (
          <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center min-h-[500px]">
            <FileType className="h-20 w-20 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Word Document</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              {file.description}
            </p>
            <div className="text-sm text-muted-foreground mb-6">
              • {formatFileSize(file.fileSize)} • {file.language?.name}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handlePreview(file.id, file.filePath)}>
                <Eye className="mr-2 h-4 w-4" />
                Open Document
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleDownload(file.id, file.name, file.filePath)
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="bg-background rounded-lg border">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="font-medium">{file.name}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[500px] p-6">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {file.content}
              </pre>
            </ScrollArea>
          </div>
        );

      case "image":
      case "jpeg":
      case "jpg":
      case "png":
        return (
          <div className="bg-background rounded-lg border">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-purple-500" />
                <span className="font-medium">{file.name}</span>
              </div>
              <div className="flex gap-2 overflow-hidden">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setImageZoom(Math.max(50, imageZoom - 25))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setImageZoom(Math.min(200, imageZoom + 25))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setImageRotation((imageRotation + 90) % 360)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div className="p-6 flex items-center justify-center min-h-[500px] bg-muted/30 overflow-hidden">
              <div
                className="transition-transform duration-200"
                style={{
                  transform: `scale(${
                    imageZoom / 100
                  }) rotate(${imageRotation}deg)`,
                }}
              >
                <Image
                  src={file.filePath || "/file.svg"}
                  alt={file.altText || file.description}
                  width={600}
                  height={400}
                  className="rounded-lg border bg-background"
                />
              </div>
            </div>
            <div className="p-4 border-t bg-muted/30">
              <p className="text-sm text-muted-foreground">
                <strong>Alt Text:</strong> {file.altText || file.description}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Dimensions:</strong> {file.dimensions} •{" "}
                <strong>Size:</strong> {formatFileSize(file.fileSize)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Language:</strong> {file.language?.name}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center min-h-[500px]">
            <FileText className="h-20 w-20 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">File Preview</h3>
            <p className="text-muted-foreground text-center mb-4">
              Preview not available
            </p>
            <Button
              onClick={() => handlePreview(file.id, file.filePath)}
              className="bg-dashboard-primary text-white hover:bg-dashboard-primary"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
        );
    }
  };
  if (isLoading) return <ResourceDetailSkeleton />;
  return (
    <div className="flex min-h-screen flex-col">
      <PDFModal
        open={open}
        onClose={handleClose}
        filePath={pdfBlobUrl}
        fileType={"application/pdf"}
      />
      <main>
        <div>
          <ResourceHeader
            categoryName={resourceData?.category?.name}
            initialBookmarked={false}
            onBookmarkToggle={(state) => console.log("Bookmarked:", state)}
            onShare={() => console.log("Shared")}
          />
        </div>

        <div className="container">
          {/* Resource Header */}
          <ResourceHeaderDetails
            title={resourceData?.title}
            description={resourceData?.description}
            uploader={resourceData?.uploader}
            createdAt={resourceData?.createdAt}
            updatedAt={resourceData?.updatedAt}
            organization={resourceData?.organization}
            totalDownloadCount={resourceData?.totalDownloadCount}
            totalViewCount={resourceData?.totalViewCount}
            filesCount={resourceData?.filesCount}
            keywords={resourceData?.keywords}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-8 space-y-6 bg-slate-50 p-6 border rounded-lg">
              <h2 className="text-3xl font-semibold font-inter ">
                File Preview
              </h2>
              {/* File Tabs */}
              <Tabs
                value={activeFile?.id.toString()}
                onValueChange={(value) => {
                  const file =
                    resourceData?.resourceFiles.find(
                      (f) => f.id.toString() === value
                    ) || null;
                  setActiveFile(file);
                }}
              >
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-14 ">
                  {resourceData?.resourceFiles.map((file) => (
                    <TabsTrigger
                      key={file.id}
                      value={file.id.toString()}
                      className="flex items-center gap-2 text-sm h-10 font-inter font-normal"
                    >
                      {getFileIcon(file.fileType)}
                      <span className="hidden sm:inline truncate">
                        {file.title}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {resourceData?.resourceFiles.map((file) => {
                  return (
                    <TabsContent
                      key={file.id}
                      value={file.id.toString()}
                      className="mt-8"
                    >
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-semibold">
                              {file.title}
                            </h3>
                            <p className="text-muted-foreground text-lg mt-2">
                              {file.description}
                            </p>
                          </div>
                          <div className="text-left sm:text-right text-base text-muted-foreground">
                            <div className="font-medium">
                              {formatFileSize(file.fileSize)}
                            </div>
                            <div className="capitalize mt-1">
                              {file.language.name}
                            </div>
                          </div>
                        </div>
                        {renderFilePreview(file)}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>

            {/* Download Section - Right Side (4/12) */}
            <div className="lg:col-span-4 space-y-6 ">
              <Card className="sticky top-4 bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-xl">Download Files</CardTitle>
                  <CardDescription>
                    Select and download resource files
                  </CardDescription>
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
                      <Label
                        htmlFor="select-all"
                        className="text-base font-medium"
                      >
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
                              checked={selectedFiles.some(
                                (f) => f.id === file.id
                              )}
                              onCheckedChange={(checked) =>
                                handleFileSelect(
                                  {
                                    id: file.id,
                                    title: file.title,
                                    filePath: file.filePath,
                                  },
                                  checked === true
                                )
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
                                {formatFileSize(file.fileSize)} •{" "}
                                {file.language.name}{" "}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handlePreview(file?.id, file.filePath)
                                    }
                                    className="h-8 w-8 p-0 bg-dashboard-primary hover:bg-dashboard-primary text-white"
                                  >
                                    <Eye className="h-4 w-4 bg-dashboard-primary text-white" />
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
