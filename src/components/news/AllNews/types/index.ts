export interface INewsSection {
  id: number;
  title: string;
  summary: string;
  content: string;
  isPublished: boolean;
  images: { id: number; newsId: number; imageUrl: string }[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  categories: { newsId: number; categoryId: number }[];
  tags: { newsId: number; tagId: number; name: string }[];
}
