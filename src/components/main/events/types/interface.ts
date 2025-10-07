export interface EventCategory {
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

export interface EventTag {
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

export interface EventImage {
  id: number;
  imageUrl: string;
  altText: string;
  caption: string;
  sequence: number;
  createdAt: string;
  eventId: number;
}

export interface Organization {
  id: number;
  name: string;
  logoUrl: string | null;
}

export interface EventItem {
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
  categories: EventCategory[];
  tags: EventTag[];
  images: EventImage[];
  organization: Organization;
}

export interface CalendarDay {
  date: string; // e.g. "2025-10-01"
  day: number;
  dayOfWeek: string;
  events: EventItem[];
  eventCount: number;
}

export interface EventCalendarResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: EventCalendarData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any | null;
}

export interface EventCalendarData {
  year: number;
  month: number;
  monthName: string;
  totalEvents: number;
  calendar: CalendarDay[];
}
