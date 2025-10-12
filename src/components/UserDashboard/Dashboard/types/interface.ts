export interface IUserDashboard {
  statistics: IStatistics;
  enrolledCourses: IEnrolledCourse[];
  recentActivities: IRecentActivity[];
  userCertificates: IUserCertificate[];
}

export interface IStatistics {
  totalEnrolledCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalCertificates: number;
  totalDownloads: number;
  totalQuizAttempts: number;
  completionRate: number;
}

export interface IEnrolledCourse {
  id: number;
  userId: number;
  courseId: number;
  status: "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";
  progress: number;
  grade: string | null;
  enrolledAt: string;
  completedAt: string | null;
  updatedAt: string;
  course: ICourse;
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
  courseType: "VIDEO" | "QUIZ" | "DOCUMENT" | string;
  linkUrl: string | null;
  isQuizExist: boolean;
  isApproved: boolean;
  CourseCategory: ICourseCategory;
  organization: IOrganization;
  _count: {
    CourseItem: number;
  };
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
  logoUrl: string;
}

export interface IRecentActivity {
  id: number;
  activityType:
    | "USER_LOGIN"
    | "COURSE_ENROLLMENT"
    | "CERTIFICATE_GENERATE"
    | "COURSE_COMPLETION_CERTIFICATE_ISSUED"
    | string;
  entityType: string;
  entityId: string | null;
  details: ActivityDetails;
  ipAddress: string | null;
  userAgent: string | null;
  deviceInfo: string | null;
  locationData: string | null;
  createdAt: string;
  userId: number;
  organizationId: number | null;
  resourceId: number | null;
  courseId: number | null;
  certificateId: number | null;
  courseContentId: number | null;
  courseItemId: number | null;
  courseProgressId: number | null;
  questionId: number | null;
  quizAttemptId: number | null;
  quizId: number | null;
  courseCategoryId: number | null;
  eventCategoryId: number | null;
  course: { id: number; title: string } | null;
  resource: unknown | null;
}

export interface ActivityDetails {
  email: string;
  title: string;
  roleId?: number;
}

export interface IUserCertificate {
  id: number;
  uniqueCode: string;
  issueDate: string;
  expiryDate: string;
  downloadCount: number;
  filePath: string;
  userId: number;
  courseId: number;
  organizationId: number;
  course: {
    id: number;
    title: string;
    description: string;
  };
  organization: IOrganization;
}
