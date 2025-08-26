/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
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
  Share2,
  User,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IResource } from "@/components/dashboard/resources/types/types";
import PDFModal from "@/components/main/userResources/PDFModal";
import { useDownloadResource } from "@/components/main/userResources/useDownloadResource";
import { Badge } from "@/components/ui/badge";
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
import { usePreview } from "@/hooks/usePreview";
import { Link } from "@/i18n/navigation";
import { formatFileSize } from "@/utils/formatFileSize";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-toastify";
import ResourceDetailSkeleton from "./ResourceDetailSkeleton";
// type FileResource = {
//   id: number;
//   name: string;
//   type: string;
//   size: string;
//   url: string;
//   description: string;
//   pages?: number;
//   language: string;
//   accessible: boolean;
//   content?: string;
//   dimensions?: string;
//   altText?: string;
// };
// type Resource = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   sector: string;
//   language: string[];
//   author: string;
//   organization: string;
//   datePublished: string;
//   dateUpdated: string;
//   version: string;
//   downloads: number;
//   views: number;
//   rating: number;
//   ratingCount: number;
//   tags: string[];
//   featured: boolean;
//   files: {
//     id: number;
//     name: string;
//     type: string;
//     size: string;
//     url: string;
//     description: string;
//     pages?: number;
//     language: string;
//     accessible: boolean;
//     content?: string;
//     dimensions?: string;
//     altText?: string;
//   }[];
// };
// Sample resource data with real downloadable files
// const resourcesData: Record<string, Resource> = {
//   1: {
//     id: 1,
//     title: "Comprehensive Disability Inclusion Guidelines for WASH Programs",
//     description:
//       "This comprehensive resource package provides detailed guidelines, templates, and training materials for implementing disability-inclusive WASH programs in humanitarian settings. The package includes policy documents, practical implementation guides, assessment tools, and multimedia training content.",
//     category: "guidelines",
//     sector: "wash",
//     language: ["english", "bangla"],
//     author: "WASH Disability Inclusion Working Group",
//     organization: "Global WASH Cluster",
//     datePublished: "2024-01-15",
//     dateUpdated: "2024-02-20",
//     version: "2.1",
//     downloads: 1247,
//     views: 3456,
//     rating: 4.8,
//     ratingCount: 156,
//     tags: ["accessibility", "WASH", "humanitarian", "inclusion", "guidelines"],
//     featured: true,
//     files: [
//       {
//         id: 1,
//         name: "Main Guidelines Document",
//         type: "pdf",
//         size: "3.2 MB",
//         url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
//         description:
//           "Complete guidelines for disability-inclusive WASH programming",
//         pages: 45,
//         language: "english",
//         accessible: true,
//       },
//       {
//         id: 2,
//         name: "Quick Reference Guide",
//         type: "doc",
//         size: "1.1 MB",
//         url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
//         description: "Condensed checklist and quick reference for field staff",
//         pages: 8,
//         language: "english",
//         accessible: true,
//       },
//       {
//         id: 3,
//         name: "Implementation Checklist",
//         type: "text",
//         size: "45 KB",
//         url:
//           "data:text/plain;charset=utf-8," +
//           encodeURIComponent(`# WASH Disability Inclusion Implementation Checklist

// ## Pre-Implementation Phase

// ### 1. Needs Assessment
// - [ ] Conduct disability-inclusive needs assessment
// - [ ] Use Washington Group Questions for data collection
// - [ ] Identify barriers to WASH access for persons with disabilities
// - [ ] Map existing accessible WASH facilities
// - [ ] Consult with disability organizations and advocates

// ### 2. Planning and Design
// - [ ] Include accessibility requirements in facility design
// - [ ] Plan for assistive devices and adaptive equipment
// - [ ] Ensure pathways to facilities are accessible
// - [ ] Design gender-segregated accessible facilities
// - [ ] Plan for different types of disabilities (physical, sensory, intellectual)

// ### 3. Community Engagement
// - [ ] Engage persons with disabilities in planning process
// - [ ] Conduct focus group discussions with disability community
// - [ ] Establish feedback mechanisms
// - [ ] Train community volunteers on disability inclusion
// - [ ] Create awareness campaigns on inclusive WASH

// ## Implementation Phase

// ### 4. Construction and Setup
// - [ ] Follow universal design principles
// - [ ] Install appropriate handrails and support structures
// - [ ] Ensure adequate lighting for persons with visual impairments
// - [ ] Create tactile indicators and signage
// - [ ] Test accessibility with persons with disabilities

// ### 5. Service Delivery
// - [ ] Train staff on disability awareness and etiquette
// - [ ] Provide assistance when requested
// - [ ] Ensure hygiene materials are accessible
// - [ ] Adapt information materials for different communication needs
// - [ ] Monitor usage by persons with disabilities

// ## Monitoring and Evaluation

// ### 6. Data Collection
// - [ ] Disaggregate data by disability status
// - [ ] Track accessibility improvements
// - [ ] Monitor satisfaction levels
// - [ ] Document lessons learned
// - [ ] Report on inclusion indicators

// ### 7. Continuous Improvement
// - [ ] Regular accessibility audits
// - [ ] Update facilities based on feedback
// - [ ] Strengthen partnerships with disability organizations
// - [ ] Share best practices with other programs
// - [ ] Advocate for policy changes when needed`),
//         description: "Step-by-step checklist for program implementation",
//         content: `# WASH Disability Inclusion Implementation Checklist

// ## Pre-Implementation Phase

// ### 1. Needs Assessment
// - [ ] Conduct disability-inclusive needs assessment
// - [ ] Use Washington Group Questions for data collection
// - [ ] Identify barriers to WASH access for persons with disabilities
// - [ ] Map existing accessible WASH facilities
// - [ ] Consult with disability organizations and advocates

// ### 2. Planning and Design
// - [ ] Include accessibility requirements in facility design
// - [ ] Plan for assistive devices and adaptive equipment
// - [ ] Ensure pathways to facilities are accessible
// - [ ] Design gender-segregated accessible facilities
// - [ ] Plan for different types of disabilities (physical, sensory, intellectual)

// ### 3. Community Engagement
// - [ ] Engage persons with disabilities in planning process
// - [ ] Conduct focus group discussions with disability community
// - [ ] Establish feedback mechanisms
// - [ ] Train community volunteers on disability inclusion
// - [ ] Create awareness campaigns on inclusive WASH

// ## Implementation Phase

// ### 4. Construction and Setup
// - [ ] Follow universal design principles
// - [ ] Install appropriate handrails and support structures
// - [ ] Ensure adequate lighting for persons with visual impairments
// - [ ] Create tactile indicators and signage
// - [ ] Test accessibility with persons with disabilities

// ### 5. Service Delivery
// - [ ] Train staff on disability awareness and etiquette
// - [ ] Provide assistance when requested
// - [ ] Ensure hygiene materials are accessible
// - [ ] Adapt information materials for different communication needs
// - [ ] Monitor usage by persons with disabilities

// ## Monitoring and Evaluation

// ### 6. Data Collection
// - [ ] Disaggregate data by disability status
// - [ ] Track accessibility improvements
// - [ ] Monitor satisfaction levels
// - [ ] Document lessons learned
// - [ ] Report on inclusion indicators

// ### 7. Continuous Improvement
// - [ ] Regular accessibility audits
// - [ ] Update facilities based on feedback
// - [ ] Strengthen partnerships with disability organizations
// - [ ] Share best practices with other programs
// - [ ] Advocate for policy changes when needed`,
//         language: "english",
//         accessible: true,
//       },
//       {
//         id: 4,
//         name: "Accessible Facility Design Examples",
//         type: "image",
//         size: "2.8 MB",
//         url: "/placeholder.svg?height=800&width=1200&text=Accessible+WASH+Facility+Design",
//         description:
//           "Visual examples of accessible WASH facility designs and layouts",
//         dimensions: "1200x800",
//         language: "visual",
//         accessible: true,
//         altText:
//           "Diagram showing accessible WASH facility design with ramps, handrails, and appropriate dimensions for wheelchair access",
//       },
//       {
//         id: 5,
//         name: "বাংলা নির্দেশিকা",
//         type: "pdf",
//         size: "3.5 MB",
//         url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
//         description:
//           "প্রতিবন্ধী-অন্তর্ভুক্তিমূলক ওয়াশ প্রোগ্রামের জন্য বাংলা নির্দেশিকা",
//         pages: 48,
//         language: "bangla",
//         accessible: true,
//       },
//     ],
//   },
// };
type FileInfo = {
  id: number;
  title: string;
  filePath: string;
};
export default function ResourceDetailPage() {
  const params = useParams();
  const resourceId = params.id as string;
  const [activeFile, setActiveFile] = useState<FileInfo | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageZoom, setImageZoom] = useState(100);
  const [imageRotation, setImageRotation] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { download } = useDownloadResource();
  const { mutateAsync: previewFile } = usePreview();
  const { data, isLoading } = useGet<IResource>(`/resources/${resourceId}`, [
    "resources",
    resourceId,
  ]);
  const resourceData = data?.data;
  // const { mutateAsync } = usePost(
  //   `/resources/view/${resourceId}`,
  //   (data) => {
  //     console.log("POST success", data);
  //   },
  //   [["resources"]]
  // );

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
            <Button onClick={() => handlePreview(file.id, file.filePath)} className="bg-dashboard-primary text-white">
              <Eye className="h-4 w-4" />
              Open PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDownload(file.id, file.name, file.filePath)}
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
             •  {formatFileSize(file.fileSize)} • {file.language?.name}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => handlePreview(file.id, file.filePath)}>
              <Eye className="mr-2 h-4 w-4" />
              Open Document
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDownload(file.id, file.name, file.filePath)}
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
                transform: `scale(${imageZoom / 100}) rotate(${imageRotation}deg)`,
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
              <strong>Size:</strong>  {formatFileSize(file.fileSize)}
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
      <main className="flex-1">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/resources">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resources
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {resourceData?.category?.name}
                </Badge>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                  ) : (
                    <Bookmark className="mr-2 h-4 w-4" />
                  )}
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-8 max-w-7xl mx-auto">
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
                <span className="text-muted-foreground">Total Files Download</span>
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

                {resourceData?.resourceFiles.map((file) => {
                  // console.log(file)
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
                )
                })}
              </Tabs>
            </div>

            {/* Download Section - Right Side (4/12) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-4">
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
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
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
                                    onClick={() => handlePreview(file?.id, file.filePath)}
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
