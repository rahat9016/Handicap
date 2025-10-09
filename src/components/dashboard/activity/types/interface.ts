export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IActivityDetails {
  email: string;
  title: string;
  roleId: number;
}

export interface IUserActivity {
  id: number;
  activityType: string;
  entityType: string;
  entityId: string;
  details: IActivityDetails;
  ipAddress: string | null;
  userAgent: string | null;
  deviceInfo: string | null;
  locationData: string | null;
  createdAt: string;
  userId: number;
  organizationId: number | null;
  resourceId: number | null;
  courseCategoryId: number | null;
  courseId: number | null;
  courseContentId: number | null;
  quizId: number | null;
  questionId: number | null;
  quizAttemptId: number | null;
  courseItemId: number | null;
  courseProgressId: number | null;
  certificateId: number | null;
  eventCategoryId: number | null;
  user: IUser;
  organization: unknown | null;
  resource: unknown | null;
  course: unknown | null;
}
