"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import { ErrorType } from "@/types";
import { useFormContext } from "react-hook-form";
import { TagsFormType } from "../Schema/Tags";

export default function TagForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: TagsFormType) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}) {
  const methods = useFormContext<TagsFormType>();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4">
        <InputLabel label="Name" required />
        <ControlledInputField name="name" placeholder="Enter tag name..." />
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

      <div className="flex justify-end gap-3 mt-6">
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update" : "Create"}
        />
      </div>
    </form>
  );
}
