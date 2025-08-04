export interface IResource {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  parentId?: number | null;
  children?: IResource[];
}
