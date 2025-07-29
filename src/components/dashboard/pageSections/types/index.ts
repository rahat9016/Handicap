export interface IPageSection {
  id: number;
  pageId: string;
  sectionType: string;
  order: number;
  title: string;
  subtitle: string;
  content: string;
  imageUrls: string[];
  buttonLabel: string;
  buttonUrl: string;
  configuration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}