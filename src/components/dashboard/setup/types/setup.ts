export interface ILanguage {
  id: number;
  code: string;
  name: string;
  nativeName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string; 
}


export interface IOrganizationType {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}