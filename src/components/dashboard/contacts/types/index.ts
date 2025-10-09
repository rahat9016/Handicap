export interface IContactMessage {
  id: number;
  firstName:string;
  lastName:string;
  organization: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  repliedAt: string | null; // ISO timestamp or null
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}