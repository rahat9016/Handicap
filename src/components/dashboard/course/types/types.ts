/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICourse {
  id: number;
  title: string;
  description: string;
  objectives: string;
  durationMinutes: number;
  isActive: boolean;
  creator: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  quizzes: any[]; 
  progress: any[];
  certificates: any[];
  organization: {
    id: number;
    name: string;
    code: string;
  };
  CourseItem: any[]; 
  thumbnailUrl: string;
}
