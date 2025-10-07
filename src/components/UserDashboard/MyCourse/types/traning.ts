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
  courseType: string;
  isPublished: boolean;
  level: string; // e.g., BEGINNER, INTERMEDIATE, ADVANCED
  isQuizExist: boolean;
  linkUrl: string | null;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  organizationId: number;
  courseCategoryId: number;
  creator?: ICreator;
  organization?: IOrganization;
  CourseCategory?: ICategory;
  CourseEnrollment: ICourseEnrollment[];
  thumbnailUrl: string;
  intro?: ICourseIntro | null;
}
export interface ICourseEnrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  progress?: number;
  completed?: boolean;
}
export interface ICourseIntro {
  id: number;
  type: string; // e.g., CONTENT, QUIZ
  order: number;
  courseId: number;
  contentId: number | null;
  quizId: number | null;
  createdAt: string;
  updatedAt: string;
  content?: ICourseContent | null;
  quiz?: IQuiz | null;
}
export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface IVideoContent {
  id: number;
  title: string;
  description: string;
  contentType: "VIDEO" | "LINK";
  contentData?: {
    duration?: number;
    variants?: IVariant[];
    thumbnailUrl?: string;
    processingStatus?: string;
    masterPlaylistUrl?: string;
  };
  link?: string | null;
  filePath?: string | null;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  quiz?:  IQuiz | null;
}

export interface IVariant {
  codec: string;
  width: number;
  height: number;
  bitrate: number;
  playlistUrl: string;
}

// 📝 Quiz
export interface IQuiz {
  id: number;
  title: string;
  description: string;
  passingScore: number;
  timeLimitMinutes: number;
  isActive: boolean;
  createdAt: string;
  courseId: number;
  contentId: number | null;
}

// 📦 Wrapper Item (can be either CONTENT or QUIZ)
export interface ICourseContent {
  id: number;
  type: "CONTENT" | "QUIZ";
  order: number;
  isAccessible: boolean;
  courseId: number;
  contentId: number | null;
  quizId: number | null;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean
  isLocked: boolean
  // nested
  content: IVideoContent | null;
  quiz: IQuiz | null;
}

export interface ICourseProgress {
  id: number;
  status: "STARTED" | "COMPLETED" | "NOT_STARTED";
  percentComplete: number;
  lastAccessed: string; 
  startedAt: string;  
  completedAt: string | null;
}
export interface ICourseEnrollmentResponse  {
  items: ICourseContent[];
  courseProgress: ICourseProgress;

}

// ====================== QUIZ =======================
export interface IQuiz {
  id: number;
  title: string;
  description: string;
  passingScore: number;
  timeLimitMinutes: number;
  isActive: boolean;
  createdAt: string;
  courseId: number;
  contentId: number | null;
  questions: IQuestion[];
}

interface IQuestion {
  id: number;
  questionText: string;
  questionType: "MCQ" | "TRUE_FALSE" | "FILL_IN_BLANK" | string;
  points: number;
  sequenceNumber: number;
  createdAt: string;
  quizId: number;
  options: IOption[];
}

interface IOption {
  id: number;
  optionText: string;
  isCorrect: boolean;
  sequenceNumber: number;
  createdAt: string;
  questionId: number;
}
