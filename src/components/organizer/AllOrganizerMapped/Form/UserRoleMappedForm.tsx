"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import ControlledComboboxSelect from "@/components/share/ControlledComboboxSelect";
import InputLabel from "@/components/share/InputLabel";
import { useFormContext } from "react-hook-form";
import { UserRoleMappedFormProps } from "../types";

export default function UserRoleMappedForm({
  organizationOptions,
  userOptions,
  roleOptions,
  onSubmit,
  error,
  isPending = false,
  isEditMode = false,
}: UserRoleMappedFormProps) {
  const methods = useFormContext<{
    organizationId: string;
    userId: string;
    roleId: string;
  }>();
  
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4">
        <InputLabel label="Organization" required />
        <ControlledComboboxSelect
          name="organizationId"
          options={organizationOptions}
          placeholder="Select an organization"
        />
      </div>
      <div className="mb-4">
        <InputLabel label="User" required />
        <ControlledComboboxSelect
          name="userId"
          options={userOptions}
          placeholder="Select a user"
        />
      </div>
      <div className="mb-4">
        <InputLabel label="Role" required />
        <ControlledComboboxSelect
          name="roleId"
          options={roleOptions}
          placeholder="Select a role"
        />
      </div>

      <ErrorMessage error={error} />

      <div className="flex justify-end gap-3 mt-6">
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update" : "Create"}
        />
      </div>
    </form>
  );
}
