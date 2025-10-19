"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledDatePicker from "@/components/share/ControlledDatePicker";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledMultiSelectField from "@/components/share/ControlledMultiSelectField";
import ControlledSelectField from "@/components/share/ControlledSelectField";

import InputLabel from "@/components/share/InputLabel";
import MultipleImageFileInput from "@/components/share/MultipleImageFileInput";
import { ErrorType } from "@/types";
import dynamic from "next/dynamic";
import { FieldError, useFormContext } from "react-hook-form";
import { EventFormType } from "../Schema/schema";
const EditorWrapper = dynamic(
  () => import("@/components/share/EditorWrapper"),
  { ssr: false }
);
export default function EventForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  categoryOptions,
  tagOptions,
  organizationOptions,
}: {
  isEditMode?: boolean;
  onSubmit: (data: EventFormType) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  categoryOptions: { label: string; value: string }[];
  tagOptions: { label: string; value: string }[];
  organizationOptions: { label: string; value: string }[];
}) {
  const methods = useFormContext<EventFormType>();
  const {
    formState: { errors },
  } = methods;

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputLabel label="Title" required />
          <ControlledInputField
            name="title"
            placeholder="Enter event title..."
          />
        </div>
        <div>
          <InputLabel label="Location" />
          <ControlledInputField
            name="location"
            placeholder="Event location..."
          />
        </div>

        <div>
          <InputLabel label="Address" />
          <ControlledInputField name="address" placeholder="Event address..." />
        </div>
        <div>
          <InputLabel label="Featured Image URL" />
          <ControlledInputField
            name="featuredImage"
            placeholder="Featured image URL..."
          />
        </div>

        <div>
          <InputLabel label="Start Date" />
          <ControlledDatePicker name="startDate" />
        </div>
        <div>
          <InputLabel label="End Date" />
          <ControlledDatePicker name="endDate" />
        </div>

        <div className="col-span-1">
          <InputLabel label="Description" required />
          <EditorWrapper
            value={methods.watch("description") || ""}
            onChange={(value) => {
              methods.setValue("description", value, {
                shouldValidate: true,
              });
            }}
          />
          {errors?.description?.message && (
            <p className="text-rose-500 text-xs mt-1 pl-2">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <InputLabel label="Summary" required />
          <EditorWrapper
            value={methods.watch("summary") || ""}
            onChange={(value) => {
              methods.setValue("summary", value, {
                shouldValidate: true,
              });
            }}
          />
          {errors?.summary?.message && (
            <p className="text-rose-500 text-xs mt-1 pl-2">
              {errors.summary.message}
            </p>
          )}
        </div>

        <div>
          <InputLabel label="Category" />
          <ControlledMultiSelectField
            name="categoryIds"
            options={categoryOptions}
            placeholder="Select category"
          />
        </div>
        <div>
          <InputLabel label="Tags" />
          <ControlledMultiSelectField
            name="tagIds"
            options={tagOptions}
            placeholder="Select tags"
          />
        </div>
        <div>
          <InputLabel label="Organization" />
          <ControlledSelectField
            name="organizationId"
            options={organizationOptions}
            placeholder="Select organization"
          />
        </div>

        {/* Images */}
        <div className="col-span-2">
          <InputLabel label="Event Images" />
          <MultipleImageFileInput
            name="images"
            errors={{ images: methods.formState.errors.images as FieldError }}
          />
        </div>

        <div className="col-span-1 flex items-center gap-2">
          <ControlledCheckField
            name="isPublished"
            label="Published (Visible on website)"
          />
        </div>
        <div className="col-span-1 flex items-center gap-2">
          <ControlledCheckField name="isOnline" label="Online Event" />
        </div>
      </div>

      <ErrorMessage error={error} />
      <div className="flex justify-end gap-3 pt-4">
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Event" : "Create Event"}
        />
      </div>
    </form>
  );
}
