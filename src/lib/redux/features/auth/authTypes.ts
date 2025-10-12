import { UserRole } from "@/utils/UserRoleEnum";

export interface IUserInformation {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture: string;
  isVerified: boolean;
  accountStatus: string;
  roleId: string;
  roleName: UserRole | null;
}

export interface IDataItem {
  id: number;
  name: string;
}

export interface IInitialState {
  loading: boolean;
  userInformation: IUserInformation;
  data: unknown[];
  // data: IDataItem[]; // Array of IDataItem objects
}
