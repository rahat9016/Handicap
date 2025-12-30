import { ErrorType } from "@/types";

export interface IRole {
  id: number;
  name: string;
}



export type UserRoleFormProps = {
  roleOptions: { label: string; value: string }[];
  onSubmit: (data: { roleId: string }) => void;
  error?: ErrorType | null;
  isPending?: boolean;
};