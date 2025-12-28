"use client";

import { useFormContext } from "react-hook-form";
import InputLabel from "@/components/share/InputLabel";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import SubmitButton from "@/components/common/SubmitButton";
import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import { UserRoleFormProps } from "../types/Role";


export default function UserRoleForm({
  roleOptions,
  onSubmit,
  error,
  isPending = false,
}: UserRoleFormProps) {
  const methods = useFormContext<{ roleId: string }>();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4">
        <InputLabel label="User Role" required />
        <ControlledSelectField
          name="roleId"
          options={roleOptions}
          placeholder="Select role"
        />
      </div>

      <ErrorMessage error={error} />

      <div className="flex justify-end gap-3 mt-6">
        <SubmitButton
          isLoading={isPending}
          label="Update"
        />
      </div>
    </form>
  );
}
