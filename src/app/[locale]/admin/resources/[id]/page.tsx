/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Calendar,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FileType,
  Globe,
  Hash,
  ImageIcon,
  RotateCw,
  User,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

import { IResource } from "@/components/dashboard/resources/types/types";
import PDFModal from "@/components/main/userResources/PDFModal";
import { useDownloadResource } from "@/components/main/userResources/useDownloadResource";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGet } from "@/hooks/useGet";
import { usePreview } from "@/hooks/usePreview";
import { formatFileSize } from "@/utils/formatFileSize";
import { toast } from "react-toastify";
import ResourceDetailSkeleton from "./ResourceDetailSkeleton";
type FileInfo = {
  id: number;
  title: string;
  filePath: string;
};
export default function ResourceDetailPage() {
  const params = useParams();
  const resourceId = params.id as string;
  const [activeFile, setActiveFile] = useState<FileInfo | null>(null);
  // const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageZoom, setImageZoom] = useState(100);
  const [imageRotation, setImageRotation] = useState(0);
  // const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { download } = useDownloadResource();
  const { mutateAsync: previewFile } = usePreview();
  const { data, isLoading } = useGet<IResource>(`/resources/${resourceId}`, [
    "resources",
    resourceId,
  ]);
  const resourceData = data?.data;

  // useEffect(() => {
  //   if (resourceData) {
  //     setActiveFile(resourceData?.resourceFiles[0] || null);
  //     setSelectedFiles(
  //       resourceData?.resourceFiles.map((f: any) => ({
  //         id: f.id,
  //         title: f.title,
  //         filePath: f.filePath,
  //       })) || []
  //     );
  //     setSelectAll(true);
  //   }
  // }, [resourceData, resourceId]);

  // const handleFileSelect = (file: FileInfo, checked: boolean) => {
  //   let newSelected: FileInfo[];
  //   if (checked) {
  //     newSelected = [...selectedFiles, file].filter(
  //       (f, i, arr) => arr.findIndex((x) => x.id === f.id) === i
  //     );
  //   } else {
  //     newSelected = selectedFiles.filter((f) => f.id !== file.id);
  //   }
  //   setSelectedFiles(newSelected);
  //   setSelectAll(
  //     newSelected.length === (resourceData?.resourceFiles?.length || 0)
  //   );
  // };

  // const handleSelectAll = (checked: boolean) => {
  //   if (checked) {
  //     setSelectedFiles(
  //       resourceData?.resourceFiles.map((f: any) => ({
  //         id: f.id as number,
  //         title: f.title,
  //         filePath: f.filePath,
  //       })) || []
  //     );
  //     setSelectAll(true);
  //   } else {
  //     setSelectedFiles([]);
  //     setSelectAll(false);
  //   }
  // };

  const handlePreview = async (filePath: string) => {
    try {
      const blob = await previewFile(filePath);
      const url = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
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
    download(id, title, filePath);
  };

  // const handleDownloadSelected = async () => {
  //   for (const file of selectedFiles) {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     handleDownload(file.id, file.title, file.filePath);
  //   }
  // };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "doc":
        return <FileType className="h-4 w-4 text-blue-500" />;
      case "text":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "image":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderFilePreview = (file: any) => {
    switch (file.type) {
      case "pdf":
        return (
          <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center min-h-[500px]">
            <FileText className="h-20 w-20 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">PDF Document</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              {file.description}
            </p>
            <div className="text-sm text-muted-foreground mb-6">
              {file.pages} pages • {file.size} • {file.language}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handlePreview(file.filePath)}>
                <Eye className="mr-2 h-4 w-4" />
                Open PDF
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

      case "doc":
        return (
          <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center min-h-[500px]">
            <FileType className="h-20 w-20 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Word Document</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              {file.description}
            </p>
            <div className="text-sm text-muted-foreground mb-6">
              {file.pages} pages • {file.size} • {file.language}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handlePreview(file.filePath)}>
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
                <Button
                  size="sm"
                  variant="outline"
                  // onClick={() => handleDownloadFile(file)}
                >
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
        return (
          <div className="bg-background rounded-lg border">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-purple-500" />
                <span className="font-medium">{file.name}</span>
              </div>
              <div className="flex gap-2">
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
                <Button
                  size="sm"
                  variant="outline"
                  // onClick={() => handleDownloadFile(file)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div className="p-6 flex items-center justify-center min-h-[500px] bg-muted/30">
              <div
                className="transition-transform duration-200"
                style={{
                  transform: `scale(${
                    imageZoom / 100
                  }) rotate(${imageRotation}deg)`,
                }}
              >
                <Image
                  src={file.url || "/placeholder.svg"}
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
                <strong>Size:</strong> {file.size}
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
              Preview not available for this file type
            </p>
            <Button
              onClick={() => handlePreview(file.filePath)}
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
      <main >

        <div >
          {/* Resource Header */}
          <div className="space-y-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              {resourceData?.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {resourceData?.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-8 text-sm text-black">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>
                  {resourceData?.uploader?.firstName +
                    " " +
                    resourceData?.uploader?.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Published{" "}
                  {new Date(
                    resourceData?.createdAt as string
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  Updated{" "}
                  {new Date(
                    resourceData?.updatedAt as string
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{resourceData?.organization?.name}</span>
              </div>
            </div>
            <div className="flex gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {resourceData?.totalDownloadCount?.toLocaleString()}
                </span>
                <span className="text-muted-foreground">downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {resourceData?.totalViewCount?.toLocaleString()}
                </span>
                <span className="text-muted-foreground">views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
                <Hash className="w-4 h-4 text-green" />
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {resourceData?.keywords?.map((keywordObj) => (
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* File Preview Section - Left Side (8/12) */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-3xl font-semibold">File Preview</h2>

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
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-12">
                  {resourceData?.resourceFiles.map((file) => (
                    <TabsTrigger
                      key={file.id}
                      value={file.id.toString()}
                      className="flex items-center gap-2 text-sm"
                    >
                      {getFileIcon(file.fileType)}
                      <span className="hidden sm:inline truncate">
                        {file.title}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {resourceData?.resourceFiles.map((file) => (
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
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
