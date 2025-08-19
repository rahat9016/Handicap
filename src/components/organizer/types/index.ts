export interface IOrganization {
  id: number;
  name: string;
  code: string;
  description: string;
  type: "NGO" | "UN_AGENCY" | "GOVERNMENT" | "OTHER";
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl: string;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  creatorId: number;
}


export interface IRole {
  id: number;
  name: string;
  description: string;
  parentRoleId: number | null;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  isSystemRole: boolean;
}


export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  profilePicture: string | null;
  isVerified: boolean;
  accountStatus: "ACTIVE" | "INACTIVE" | string;
  roleId: number;
  roleName: string;
}


export interface IOrganizationTypes {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IOrganizationResponse {
  id: number;
  name: string;
  code: string;
  description: string;
  type: IOrganizationTypes;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl: string;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  creatorId: number;
}