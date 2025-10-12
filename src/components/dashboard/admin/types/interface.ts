import { ICourse } from "@/components/UserDashboard/MyCourse/types/traning";

export interface ITotalCard {
  icon: string;
  shape: string;
  title: string;
  count: number | string;
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
