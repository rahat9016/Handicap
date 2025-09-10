export interface ICourseDetails {
  courseId: string;
  id: number;
  title: string;
  description: string;
  objectives: string;
  durationMinutes: number;
  isActive: boolean;
  isPublished: boolean;
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




export interface Option {
  optionText: string;
  isCorrect: boolean;
  sequenceNumber: number;
}

export interface Question {
  questionText: string;
  questionType: "MULTIPLE_CHOICE" | "TRUE_FALSE";
  points: number;
  sequenceNumber: number;
  options?: Option[];               
  correctAnswer?: "true" | "false";  
}

export interface IQuiz {
  title: string;
  description: string;
  passingScore: number;
  timeLimitMinutes: number;
  courseId: string;
  contentId?: number;
  questions: Question[];
  [key: string]: unknown;
}
