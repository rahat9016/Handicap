export interface IResourceData {
  title: string
  description: string
  imageUrl?: string
  date: string
  size: string
  downloads: number
  ratings: number
  isFeatured?: boolean
  isPdf?: boolean
}


// src/types/resource.ts

export interface ILanguage {
  id: number;
  code: string; // e.g., "EN", "BN"
  name: string; // e.g., "English"
  nativeName: string; // e.g., "English"
}

export interface IResourceFile {
  id: number;
  title: string;
  description: string;
  language: ILanguage;
  filePath: string; // e.g., "/uploads/resources/file.mp4"
  fileType: string; // e.g., "mp4", "pdf"
  fileSize: number; // in bytes
  isActive: boolean;
  downloadCount: number;
  viewCount: number;
}

export interface IFeaturedResource {
  id: number;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  resourceFiles: IResourceFile[];
}
