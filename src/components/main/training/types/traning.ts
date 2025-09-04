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
  CourseCategory: ICategory
}


export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

// 🎥 Video Variant
export interface IVideoVariant {
  codec: string;
  width: number;
  height: number;
  bitrate: number;
  playlistUrl: string;
}

// 📦 Video Content
export interface IVideoContent {
  id: number;
  title: string;
  description: string;
  contentType: "VIDEO"; // could be extended later
  contentData: {
    duration: number; // in seconds
    variants: IVideoVariant[];
    thumbnailUrl: string;
    processingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    masterPlaylistUrl: string;
  };
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  filePath: string;
  courseId: number;
}

// 📝 Quiz (placeholder, extend when quiz data available)
export interface IQuiz {
  id: number;
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions?: any[]; // replace with proper type when known
}

// 📚 Course Content Item (wrapper)
export interface ICourseContentItem {
  id: number;
  type: "CONTENT" | "QUIZ"; // extend if more types are added
  order: number;
  courseId: number;
  contentId: number | null;
  quizId: number | null;
  createdAt: string;
  updatedAt: string;

  // relations
  content: IVideoContent | null;
  quiz: IQuiz | null;
}
