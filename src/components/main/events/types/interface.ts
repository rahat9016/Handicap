export interface IEventCategory {
  eventId: number;
  categoryId: number;
  createdAt: string;
  category: {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IEventTag {
  eventId: number;
  tagId: number;
  createdAt: string;
  tag: {
    id: number;
    name: string;
    createdAt: string;
    isActive: boolean;
  };
}

export interface IEventImage {
  id: number;
  imageUrl: string;
  altText: string;
  caption: string;
  sequence: number;
  createdAt: string;
  eventId: number;
}

export interface IOrganization {
  id: number;
  name: string;
  logoUrl: string | null;
}

export interface IEventItem {
  id: number;
  title: string;
  description: string;
  summary: string;
  featuredImage: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  isOnline: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  organizationId: number;
  categories: IEventCategory[];
  tags: IEventTag[];
  images: IEventImage[];
  organization: IOrganization;
}

export interface ICalendarDay {
  date: string;
  day: number;
  dayOfWeek: string;
  events: IEventItem[];
  eventCount: number;
}

export interface EventCalendarData {
  year: number;
  month: number;
  monthName: string;
  totalEvents: number;
  calendar: ICalendarDay[];
}
