/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorType } from "@/types";

export type OrganizationFormProps = {
  organizationOptions: { label: string; value: string }[];
  onSubmit: (data: any) => void;
  error?: ErrorType | null;
  patchError?: ErrorType | null;
  isPending?: boolean;
  isEditMode?: boolean;
};