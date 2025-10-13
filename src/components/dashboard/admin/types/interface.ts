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


export interface AnalyticsSummary {
  overview: Overview;
  popularPages: PopularPage[];
  trafficSources: TrafficSources;
  deviceStats: DeviceStats;
  period: Period;
}
export interface Period {
  start: string;
  end: string;
}
export interface DeviceStats {
  desktop: number;
  mobile: number;
  tablet: number;
  other: number;
}
export interface TrafficSources {
  directTraffic: number;
  organicSearch: number;
  socialMedia: number;
  referralTraffic: number;
  emailTraffic: number;
  otherTraffic: number;
}
export interface PopularPage {
  pageUrl: string;
  pageTitle: string;
  pageViews: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  bounceRate: number;
}
export interface Overview {
  totalVisitors: number;
  totalPageViews: number;
  uniqueVisitors: number;
  returningVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  newVisitors: number;
}

export interface PopularPagesProps {
  popularPages: PopularPage[] | undefined;
  maxItems?: number;
}
