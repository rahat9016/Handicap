"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { ErrorType } from "@/types";
import { useFormContext } from "react-hook-form";
import { CategoryFormType } from "../Schema/Category";

export default function CategoryForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: CategoryFormType) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}) {
  const methods = useFormContext<CategoryFormType>();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4">
        <InputLabel label="Name" required />
        <ControlledInputField
          name="name"
          placeholder="Enter the category name..."
        />
      </div>
      <div className="mb-4">
        <InputLabel label="Description" />
        <ControlledTextareaField
          name="description"
          placeholder="Write the category description..."
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
