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
  ImageIcon,
  RotateCw,
  Share2,
  Star,
  User,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IResource } from "@/components/dashboard/resources/types/types";
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
import { Link } from "@/i18n/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
type FileResource = {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
  description: string;
  pages?: number;
  language: string;
  accessible: boolean;
  content?: string;
  dimensions?: string;
  altText?: string;
};
type Resource = {
  id: number;
  title: string;
  description: string;
  category: string;
  sector: string;
  language: string[];
  author: string;
  organization: string;
  datePublished: string;
  dateUpdated: string;
  version: string;
  downloads: number;
  views: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  featured: boolean;
  files: {
    id: number;
    name: string;
    type: string;
    size: string;
    url: string;
    description: string;
    pages?: number;
    language: string;
    accessible: boolean;
    content?: string;
    dimensions?: string;
    altText?: string;
  }[];
};
// Sample resource data with real downloadable files
const resourcesData: Record<string, Resource> = {
  1: {
    id: 1,
    title: "Comprehensive Disability Inclusion Guidelines for WASH Programs",
    description:
      "This comprehensive resource package provides detailed guidelines, templates, and training materials for implementing disability-inclusive WASH programs in humanitarian settings. The package includes policy documents, practical implementation guides, assessment tools, and multimedia training content.",
    category: "guidelines",
    sector: "wash",
    language: ["english", "bangla"],
    author: "WASH Disability Inclusion Working Group",
    organization: "Global WASH Cluster",
    datePublished: "2024-01-15",
    dateUpdated: "2024-02-20",
    version: "2.1",
    downloads: 1247,
    views: 3456,
    rating: 4.8,
    ratingCount: 156,
    tags: ["accessibility", "WASH", "humanitarian", "inclusion", "guidelines"],
    featured: true,
    files: [
      {
        id: 1,
        name: "Main Guidelines Document",
        type: "pdf",
        size: "3.2 MB",
        url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
        description:
          "Complete guidelines for disability-inclusive WASH programming",
        pages: 45,
        language: "english",
        accessible: true,
      },
      {
        id: 2,
        name: "Quick Reference Guide",
        type: "doc",
        size: "1.1 MB",
        url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
        description: "Condensed checklist and quick reference for field staff",
        pages: 8,
        language: "english",
        accessible: true,
      },
      {
        id: 3,
        name: "Implementation Checklist",
        type: "text",
        size: "45 KB",
        url:
          "data:text/plain;charset=utf-8," +
          encodeURIComponent(`# WASH Disability Inclusion Implementation Checklist

## Pre-Implementation Phase

### 1. Needs Assessment
- [ ] Conduct disability-inclusive needs assessment
- [ ] Use Washington Group Questions for data collection
- [ ] Identify barriers to WASH access for persons with disabilities
- [ ] Map existing accessible WASH facilities
- [ ] Consult with disability organizations and advocates

### 2. Planning and Design
- [ ] Include accessibility requirements in facility design
- [ ] Plan for assistive devices and adaptive equipment
- [ ] Ensure pathways to facilities are accessible
- [ ] Design gender-segregated accessible facilities
- [ ] Plan for different types of disabilities (physical, sensory, intellectual)

### 3. Community Engagement
- [ ] Engage persons with disabilities in planning process
- [ ] Conduct focus group discussions with disability community
- [ ] Establish feedback mechanisms
- [ ] Train community volunteers on disability inclusion
- [ ] Create awareness campaigns on inclusive WASH

## Implementation Phase

### 4. Construction and Setup
- [ ] Follow universal design principles
- [ ] Install appropriate handrails and support structures
- [ ] Ensure adequate lighting for persons with visual impairments
- [ ] Create tactile indicators and signage
- [ ] Test accessibility with persons with disabilities

### 5. Service Delivery
- [ ] Train staff on disability awareness and etiquette
- [ ] Provide assistance when requested
- [ ] Ensure hygiene materials are accessible
- [ ] Adapt information materials for different communication needs
- [ ] Monitor usage by persons with disabilities

## Monitoring and Evaluation

### 6. Data Collection
- [ ] Disaggregate data by disability status
- [ ] Track accessibility improvements
- [ ] Monitor satisfaction levels
- [ ] Document lessons learned
- [ ] Report on inclusion indicators

### 7. Continuous Improvement
- [ ] Regular accessibility audits
- [ ] Update facilities based on feedback
- [ ] Strengthen partnerships with disability organizations
- [ ] Share best practices with other programs
- [ ] Advocate for policy changes when needed`),
        description: "Step-by-step checklist for program implementation",
        content: `# WASH Disability Inclusion Implementation Checklist

## Pre-Implementation Phase

### 1. Needs Assessment
- [ ] Conduct disability-inclusive needs assessment
- [ ] Use Washington Group Questions for data collection
- [ ] Identify barriers to WASH access for persons with disabilities
- [ ] Map existing accessible WASH facilities
- [ ] Consult with disability organizations and advocates

### 2. Planning and Design
- [ ] Include accessibility requirements in facility design
- [ ] Plan for assistive devices and adaptive equipment
- [ ] Ensure pathways to facilities are accessible
- [ ] Design gender-segregated accessible facilities
- [ ] Plan for different types of disabilities (physical, sensory, intellectual)

### 3. Community Engagement
- [ ] Engage persons with disabilities in planning process
- [ ] Conduct focus group discussions with disability community
- [ ] Establish feedback mechanisms
- [ ] Train community volunteers on disability inclusion
- [ ] Create awareness campaigns on inclusive WASH

## Implementation Phase

### 4. Construction and Setup
- [ ] Follow universal design principles
- [ ] Install appropriate handrails and support structures
- [ ] Ensure adequate lighting for persons with visual impairments
- [ ] Create tactile indicators and signage
- [ ] Test accessibility with persons with disabilities

### 5. Service Delivery
- [ ] Train staff on disability awareness and etiquette
- [ ] Provide assistance when requested
- [ ] Ensure hygiene materials are accessible
- [ ] Adapt information materials for different communication needs
- [ ] Monitor usage by persons with disabilities

## Monitoring and Evaluation

### 6. Data Collection
- [ ] Disaggregate data by disability status
- [ ] Track accessibility improvements
- [ ] Monitor satisfaction levels
- [ ] Document lessons learned
- [ ] Report on inclusion indicators

### 7. Continuous Improvement
- [ ] Regular accessibility audits
- [ ] Update facilities based on feedback
- [ ] Strengthen partnerships with disability organizations
- [ ] Share best practices with other programs
- [ ] Advocate for policy changes when needed`,
        language: "english",
        accessible: true,
      },
      {
        id: 4,
        name: "Accessible Facility Design Examples",
        type: "image",
        size: "2.8 MB",
        url: "/placeholder.svg?height=800&width=1200&text=Accessible+WASH+Facility+Design",
        description:
          "Visual examples of accessible WASH facility designs and layouts",
        dimensions: "1200x800",
        language: "visual",
        accessible: true,
        altText:
          "Diagram showing accessible WASH facility design with ramps, handrails, and appropriate dimensions for wheelchair access",
      },
      {
        id: 5,
        name: "বাংলা নির্দেশিকা",
        type: "pdf",
        size: "3.5 MB",
        url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
        description:
          "প্রতিবন্ধী-অন্তর্ভুক্তিমূলক ওয়াশ প্রোগ্রামের জন্য বাংলা নির্দেশিকা",
        pages: 48,
        language: "bangla",
        accessible: true,
      },
    ],
  },
};

export default function ResourceDetailPage() {
  const params = useParams();
  const resourceId = params.id as string;
  const [resource, setResource] = useState<Resource | null>(null);
  const [activeFile, setActiveFile] = useState<FileResource | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageZoom, setImageZoom] = useState(100);
  const [imageRotation, setImageRotation] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  // const { toast } = useToast()
  const { data } = useGet<IResource>(
    `/resources/${resourceId}`,
    ["resources", resourceId]
  );
  console.log(data);
  useEffect(() => {
    // In a real app, this would fetch from an API
    const resourceData = resourcesData[resourceId];
    if (resourceData) {
      setResource(resourceData);
      setActiveFile(resourceData?.files[0]);
      // Initialize with all files selected
      setSelectedFiles(new Set(resourceData.files.map((f) => f.id)));
      setSelectAll(true);
    }
  }, [resourceId]);

  const handleFileSelect = (fileId: unknown, checked: string | boolean) => {
    const newSelected = new Set(selectedFiles);
    if (checked) {
      newSelected.add(fileId);
    } else {
      newSelected.delete(fileId);
    }
    setSelectedFiles(newSelected);
    setSelectAll(newSelected.size === resource?.files.length);
  };

  const handleSelectAll = (checked: CheckedState) => {
    const isChecked = checked === true; // normalize

    if (isChecked) {
      setSelectedFiles(new Set(resource?.files.map((f) => f.id)));
    } else {
      setSelectedFiles(new Set());
    }

    setSelectAll(isChecked);
  };

  const handleDownloadFile = async (file: {
    id?: number;
    name: any;
    type?: string;
    size?: string;
    url: any;
    description?: string;
    pages?: number | undefined;
    language?: string;
    accessible?: boolean;
    content?: string | undefined;
    dimensions?: string | undefined;
    altText?: string | undefined;
  }) => {
    try {
      // toast({
      //   title: "Download Started",
      //   description: `Downloading ${file.name}...`,
      // })

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.target = "_blank";

      // For data URLs (like our text file), we can download directly
      if (file.url.startsWith("data:")) {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For external URLs, open in new tab
        window.open(file.url, "_blank");
      }

      // toast({
      //   title: "Download Complete",
      //   description: `${file.name} has been downloaded successfully.`,
      // })
    } catch (error) {
      console.log(error);
      // toast({
      //   title: "Download Failed",
      //   description: "There was an error downloading the file. Please try again.",
      //   variant: "destructive",
      // })
    }
  };

  const handleOpenFile = (file: FileResource) => {
    try {
      if (file.type === "text") {
        const newWindow = window.open("", "_blank");
        newWindow?.document.write(`
        <html>
          <head>
            <title>${file.name}</title>
            <style>
              body { font-family: monospace; padding: 20px; line-height: 1.6; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <h1>${file.name}</h1>
            <pre>${file.content ?? ""}</pre>
          </body>
        </html>
      `);
        newWindow?.document.close();
      } else {
        window.open(file.url, "_blank");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadSelected = async () => {
    const selectedFilesList =
      resource?.files.filter((f) => selectedFiles.has(f.id)) || [];

    if (selectedFilesList.length === 0) {
      // toast({
      //   title: "No Files Selected",
      //   description: "Please select at least one file to download.",
      //   variant: "destructive",
      // })
      return;
    }

    // toast({
    //   title: "Download Started",
    //   description: `Downloading ${selectedFilesList.length} file(s)...`,
    // })

    // Download each selected file
    for (const file of selectedFilesList) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay between downloads
      await handleDownloadFile(file);
    }

    // toast({
    //   title: "Bulk Download Complete",
    //   description: `Successfully downloaded ${selectedFilesList.length} file(s).`,
    // })
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
              <Button onClick={() => handleOpenFile(file)}>
                <Eye className="mr-2 h-4 w-4" />
                Open PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDownloadFile(file)}
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
              <Button onClick={() => handleOpenFile(file)}>
                <Eye className="mr-2 h-4 w-4" />
                Open Document
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDownloadFile(file)}
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
                <Button size="sm" onClick={() => handleOpenFile(file)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadFile(file)}
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
                <Button size="sm" onClick={() => handleOpenFile(file)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadFile(file)}
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
            <Button onClick={() => handleDownloadFile(file)}>
              <Download className="mr-2 h-4 w-4" />
              Download File
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* <AccessibilityControls /> */}

      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/resources">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resources
                </Button>
              </Link>
              <Separator className="h-6" />
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {resource?.category}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {resource?.sector}
                </Badge>
                {resource?.featured && (
                  <Badge className="bg-inclusion-orange">Featured</Badge>
                )}
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
              {resource?.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {resource?.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{resource?.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Published{" "}
                  {new Date(resource?.datePublished).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  Updated {new Date(resource?.dateUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{resource?.organization}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {resource?.downloads.toLocaleString()}
                </span>
                <span className="text-muted-foreground">downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {resource?.views.toLocaleString()}
                </span>
                <span className="text-muted-foreground">views</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{resource?.rating}</span>
                <span className="text-muted-foreground">
                  ({resource?.ratingCount} ratings)
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {resource?.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  {tag}
                </Badge>
              ))}
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
                    resource?.files.find((f) => f.id.toString() === value) ||
                    null;
                  setActiveFile(file);
                }}
              >
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-12">
                  {resource?.files.map((file) => (
                    <TabsTrigger
                      key={file.id}
                      value={file.id.toString()}
                      className="flex items-center gap-2 text-sm"
                    >
                      {getFileIcon(file.type)}
                      <span className="hidden sm:inline truncate">
                        {file.name}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {resource?.files.map((file) => (
                  <TabsContent
                    key={file.id}
                    value={file.id.toString()}
                    className="mt-8"
                  >
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold">
                            {file.name}
                          </h3>
                          <p className="text-muted-foreground text-lg mt-2">
                            {file.description}
                          </p>
                        </div>
                        <div className="text-left sm:text-right text-base text-muted-foreground">
                          <div className="font-medium">{file.size}</div>
                          <div className="capitalize mt-1">{file.language}</div>
                        </div>
                      </div>
                      {renderFilePreview(file)}
                    </div>
                  </TabsContent>
                ))}
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
                      disabled={selectedFiles.size === 0}
                      className="w-full bg-inclusion-teal hover:bg-inclusion-teal/90"
                      size="lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Selected ({selectedFiles.size})
                    </Button>
                  </div>

                  <Separator />

                  {/* Individual Files */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Individual Files</h4>
                    <TooltipProvider>
                      <div className="space-y-3">
                        {resource?.files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <Checkbox
                              id={`file-${file.id}`}
                              checked={selectedFiles.has(file.id)}
                              onCheckedChange={(checked) =>
                                handleFileSelect(file.id, checked)
                              }
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {getFileIcon(file.type)}
                                <div className="font-medium text-sm truncate">
                                  {file.name}
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {file.description}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {file.size} • {file.language}{" "}
                                {file.pages && `• ${file.pages} pages`}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleOpenFile(file)}
                                    className="h-8 w-8 p-0"
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
                                    variant="ghost"
                                    onClick={() => handleDownloadFile(file)}
                                    className="h-8 w-8 p-0"
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
