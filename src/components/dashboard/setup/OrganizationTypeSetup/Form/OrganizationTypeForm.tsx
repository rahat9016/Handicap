"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { ErrorType } from "@/types";
import { useFormContext } from "react-hook-form";
import { OrganizerTypeSetupForm } from "../../Schema/Setup";

export default function OrganizationTypeForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: OrganizerTypeSetupForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}) {
  const methods = useFormContext<OrganizerTypeSetupForm>();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4">
        <InputLabel label="Type name" required />
        <ControlledInputField name="name" placeholder="Enter type name" />
      </div>

      <div className="mb-4">
        <InputLabel label="Description" />
        <ControlledTextareaField
          name="description"
          placeholder="Enter description"
        />
      </div>

      {isEditMode && (
        <div className="mb-4">
          <InputLabel label="Is Active" />
          <ControlledCheckField
            name="isActive"
            label="Active (Visible on website)"
          />
        </div>
      )}
      <ErrorMessage error={error} />
      <SubmitButton
        isLoading={isPending}
        label={isEditMode ? "Update" : "Create"}
      />
    </form>
  );
}
