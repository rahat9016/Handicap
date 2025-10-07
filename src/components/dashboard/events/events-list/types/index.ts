export interface IEvent {
  id: number;
  title: string;
  slug: string;

  description: string;
  summary: string;
  featuredImage: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  isOnline: boolean;
  registrationUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  organizationId: number;
  categories: IEventCategory[];
  tags: IEventTag[];
  images: IEventImage[];
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IEventCategory {
  eventId: number;
  categoryId: number;
  createdAt: string;
  category: ICategory;
}

export interface ITag {
  id: number;
  name: string;
  createdAt: string;
  isActive: boolean;
}
export interface IEventTag {
  eventId: number;
  tagId: number;
  createdAt: string;
  tag: ITag;
}

export interface IEventImage {
  imageUrl: string;
  id: number;
  altText: string;
  caption: string;
  sequence: number;
  createdAt: string;
  eventId: number;
}
