export interface ICourseDetails {
  id: number;
  title: string;
  description: string;
  objectives: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  organization?: {
    id: number;
    name: string;
    code: string;
  };
  CourseCategory?: {
    id: number;
    name: string;
    description: string | null;
  };
  thumbnailUrl?: string;
  className?: string;
}
