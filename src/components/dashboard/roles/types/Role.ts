export interface IRole {
  id: number;
  name: string;
  description: string;
  parentRoleId: number | null;
  createdAt: Date;
  updatedAt: Date;
  isSystemRole: boolean;
}
