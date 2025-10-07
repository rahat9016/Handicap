export interface IDashboardStats {
  totalResources: {
    total: number;
    thisMonth: number;
    description: string;
  };
  totalDownloads: {
    total: number;
    thisMonth: number;
    description: string;
  };
  activeUsers: {
    total: number;
    thisWeek: number;
    description: string;
  };
  trainingCompletion: {
    total: number;
    thisMonth: number;
    description: string;
  };
  additionalStats: {
    totalUsers: number;
    totalCourses: number;
    totalOrganizations: number;
    totalCertificates: number;
  };
}
