export interface IStakeholder {
  id: number;
  name: string;
  description: string;
  link: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  updatedById: number | null;
}
export type TSubmissionData = {
  description?: string | null | undefined;
  name: string;
  file: NonNullable<string | File | undefined>;
  isActive: boolean | null;
};
