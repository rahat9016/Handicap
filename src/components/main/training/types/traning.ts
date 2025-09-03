interface ICreator {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface IOrganization {
  id: number;
  name: string;
  code: string;
}

export interface ICourse {
  actions?: string;
  id: number;
  title: string;
  description: string;
  objectives: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creator: ICreator;
  organization: IOrganization;
  thumbnailUrl: string;
  CourseCategory: ICategory
}


export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}
