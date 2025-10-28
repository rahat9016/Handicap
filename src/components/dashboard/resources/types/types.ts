/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILangType } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface IUserRole {
  id: number;
  organizationId: number;
  organizationName: string;
  roleId: number;
  roleName: string;
}

interface Language {
  id: number;
  code: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Uploader {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface Keyword {
  keyword: {
    id: number;
    name: string;
  };
}

interface ResourceCount {
  versions: number;
}
interface IOrganization {
  id: number;
  name: string;
  code: string;
}
export interface ILanguage {
  id: number;
  code: string;
  name: string;
  nativeName: string;
}

export interface IResourceFile {
  id: number;
  title: string;
  description: string | null;
  filePath: string;
  fileType: string;
  fileSize: number;
  isActive: boolean;
  downloadCount: number;
  viewCount: number;
  language: ILanguage;
}
export interface IResource {
  id: number;
  name?: string;
  actions?: string;
  isPrivate?: boolean;
  isApproved: boolean;
  featured: boolean;
  title: ILangType;
  description: ILangType;
  filePath: string;
  fileType: string;
  fileSize: number;
  version: string;
  isCurrent: boolean;
  totalDownloadCount: number;
  totalViewCount: number;
  filesCount: number;
  createdAt: string;
  updatedAt: string;
  language: Language;
  category: Category;
  uploader: Uploader;
  keywords: Keyword[];
  resourceFiles: IResourceFile[];
  organization: IOrganization;
  _count: ResourceCount;
}
export interface IResourceProps {
  data: IResource[] | null;
  isLoading: boolean;
  handleEdit: (resource: IResource) => void;
  handleView: (resource: IResource) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  search: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentPage: number;
  setCurrentPage: any;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: any;
  selectedId?: string | undefined;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
}
