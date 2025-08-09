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

export interface IResource {
  id: number;
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
  _count: ResourceCount;
}
