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
  createdAt: string;
  updatedAt: string;
  creator: ICreator;
  organization: IOrganization;
  thumbnailUrl: string;
  CourseCategory: ICategory;
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
  courseId: number;
  contentId: number | null;
  quizId: number | null;
  createdAt: string;
  updatedAt: string;

  // nested
  content: IVideoContent | null;
  quiz: IQuiz | null;
}
