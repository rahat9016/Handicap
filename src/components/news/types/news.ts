export interface INews {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage: string | null;
  isPublished: boolean;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  createdById: number;
  organizationId: number | null;
  categories: {
    newsId: number;
    categoryId: number;
    createdAt: string;
  }[];
  tags: {
    newsId: number;
    tagId: number;
    createdAt: string;
  }[];
  images: {
    id: number;
    imageUrl: string;
    altText: string | null;
    caption: string | null;
    sequence: number;
    createdAt: string;
    isActive: boolean;
    newsId: number;
  }[];
  viewMode?: string;
}
export interface INewsTags {
  id: number;
  name: string;
  createdAt: string;
  isActive: boolean;
}
