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

// 🎥 Video ContentData
export interface IVideoContentData {
  duration: number; // in seconds
  variants: IVideoVariant[];
  thumbnailUrl: string;
  processingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  masterPlaylistUrl: string;
}

// 📦 Content Types
export type ContentType = "VIDEO" | "LINK"; // extend later if needed

// 📦 Base Content
export interface IBaseContent {
  id: number;
  title: string;
  description: string;
  contentType: ContentType;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  courseId: number;
}

// 🎥 Video Content
export interface IVideoContent extends IBaseContent {
  contentType: "VIDEO";
  contentData: IVideoContentData;
  filePath: string; // uploaded file path
  link: null; // not used for video
}

// 🔗 URL Content (e.g., YouTube)
export interface IUrlContent extends IBaseContent {
  contentType: "LINK";
  contentData: null;
  link: string; // YouTube link or external link
  filePath: null;
}

// Union type for all content
export type IContent = IVideoContent | IUrlContent;

// 📝 Quiz (placeholder, extend later)
export interface IQuiz {
  id: number;
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions?: any[];
}

// 📚 Course Content Item (wrapper)
export interface ICourseContentItem {
  id: number;
  type: "CONTENT" | "QUIZ";
  order: number;
  courseId: number;
  contentId: number | null;
  quizId: number | null;
  createdAt: string;
  updatedAt: string;

  // relations
  content: IContent | null;
  quiz: IQuiz | null;
}