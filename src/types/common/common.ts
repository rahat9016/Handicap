export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Session {
  user: User;
}

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type ResponseSuccessType = {
  data: unknown;
  meta?: IMeta;
};
export interface ILangType {
    bn: string | null;
    en: string;
  }
export interface IPageSection {
  id: number;
  pageId: string;
  sectionType: string;
  order: number;
  title: ILangType;
  subtitle: ILangType;
  content: ILangType;
  buttonLabel: ILangType;
  buttonUrl: string;
  configuration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
}
