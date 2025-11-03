export interface IResourceData {
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  size: string;
  downloads: number;
  ratings: number;
  isFeatured?: boolean;
  isPdf?: boolean;
}

// src/types/resource.ts

export interface ILanguage {
  id: number;
  code: string; // e.g., "EN", "BN"
  name: string; // e.g., "English"
  nativeName: string; // e.g., "English"
}

export interface IFeaturedResource {
  id: number;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  resourceFiles: ResourceFile[];
  version: string;
  isCurrent: boolean;
  totalDownloadCount: number;
  totalViewCount: number;
  isPrivate: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  organization: Organization;
  language: Language;
  category: Category;
  uploader: Uploader;
  keywords: KeywordWrapper[];
  _count: Count;
}

export interface ResourceFile {
  id: number;
  title: string;
  description: string;
  language: Language;
  filePath: string;
  fileType: string;
  fileSize: number;
  isActive: boolean;
  downloadCount: number;
  viewCount: number;
}

export interface Language {
  id: number;
  code: string;
  name: string;
  nativeName?: string;
}

export interface Organization {
  id: number;
  name: string;
  code: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Uploader {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface KeywordWrapper {
  keyword: Keyword;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Count {
  versions: number;
}
export interface IFilterFormValues {
  sortBy: string[];
  resourceTypes: string[];
  languages: string[];
  keywords: string[];
  recommended: ("featured" | "isSuggested")[];
}
