export interface ITotalCard {
  icon: string;
  shape: string;
  title: string;
  count: number | string;
}

export interface ICourseCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: number | null;
}
export interface IOrganization {
  id: number;
  name: string;
  code: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  typeId: number;
}

export interface ICourse {
  id: number;
  title: string;
  description: string;
  objectives: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  organizationId: number;
  courseCategoryId: number;
  thumbnailUrl: string;
  isPublished: boolean;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  courseType: "VIDEO" | "DOCUMENT" | "QUIZ" | string;
  linkUrl: string | null;
  isQuizExist: boolean;
  isApproved: boolean;
  CourseCategory: ICourseCategory;
  organization: IOrganization;
}

export interface IDashboardData {
  totalUsers: number;
  totalOrganization: number;
  totalResources: number;
  totalCourse: number;
  topResources: IResource[];
  topCourses: ICourse[];
}

export interface IResource {
  id: number;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  totalDownloadCount: number;
  totalViewCount: number;
}
