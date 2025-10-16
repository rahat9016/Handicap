"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { ErrorType } from "@/types";

import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import { useFormContext } from "react-hook-form";
import { CategoryForm } from "../Schema/Category";

export default function EventCategoryForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: CategoryForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}) {
  const methods = useFormContext<CategoryForm>();

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
          placeholder="Write down here the description..."
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
