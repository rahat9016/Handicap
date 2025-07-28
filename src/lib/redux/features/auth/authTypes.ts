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
  roleName: string
}

export interface IDataItem {
  id: number;
  name: string;
}

export interface IInitialState {
  userInformation: IUserInformation;
  data: unknown[];
  // data: IDataItem[]; // Array of IDataItem objects
}
