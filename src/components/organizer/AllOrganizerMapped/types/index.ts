import { ErrorType } from "@/types";

export type UserRoleMappedFormProps = {
  organizationOptions: { label: string; value: string }[];
  userOptions: { label: string; value: string }[];
  roleOptions: { label: string; value: string }[];
  onSubmit: (data: {
    organizationId: string;
    userId: string;
    roleId: string;
  }) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  isEditMode?: boolean;
};

export interface IOrganization {
  action?: string;
  organizationName: string;
  role: string;
  userName: string;
}