export interface ICategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}