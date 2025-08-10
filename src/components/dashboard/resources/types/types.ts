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
export interface IResource {
  id: number;
  name?: string;
  isPrivate?: boolean;
  title: string;
  description: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  version: string;
  isCurrent: boolean;
  downloadCount: number;
  viewCount: number;
  createdAt: string; 
  updatedAt: string; 
  language: Language;
  category: Category;
  uploader: Uploader;
  keywords: Keyword[];
  organization: IOrganization;
  _count: ResourceCount;
}
