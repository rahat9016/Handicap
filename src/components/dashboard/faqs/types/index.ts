interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IFaqItem {
  id: number;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  createdById: number;
  updatedById: number;
  createdBy: IUser;
  updatedBy: IUser;
}

export interface IFaq {
  id: string | number;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
}
