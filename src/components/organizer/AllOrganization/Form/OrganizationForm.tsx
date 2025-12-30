"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import ImageFileInput from "@/components/share/ImageFileInput";
import InputLabel from "@/components/share/InputLabel";
import { useFormContext } from "react-hook-form";
import { SUPPORTED_FORMATS } from "../Schema/AddOrganizer";
import { OrganizationFormProps } from "../types";

export default function OrganizationForm({
  organizationOptions,
  onSubmit,
  error,
  patchError,
  isPending = false,
  isEditMode = false,
}: OrganizationFormProps) {
  const methods = useFormContext();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
      <div className="border-b pb-8">
        <InputLabel label="Logo" />
        <ImageFileInput name="logo" supportedImageTypes={SUPPORTED_FORMATS} />
      </div>

      <div className="flex flex-col gap-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
          <div>
            <InputLabel label="Organizer name" required />
            <ControlledInputField
              name="name"
              placeholder="Enter organizer name"
              className="bg-white"
            />
          </div>
          <div>
            <InputLabel label="Contact email" />
            <ControlledInputField
              type="email"
              name="contactEmail"
              placeholder="Enter contact email"
              className="bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
          <div>
            <InputLabel label="Organizer type" required />
            <ControlledSelectField
              name="typeId"
              placeholder="Select organizer type"
              options={organizationOptions}
            />
          </div>
          <div>
            <InputLabel label="Phone" required />
            <ControlledInputField
              type="tel"
              name="contactPhone"
              placeholder="Enter phone number"
              className="bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-5">
          <div>
            <InputLabel label="Address" />
            <ControlledInputField
              type="text"
              name="address"
              placeholder="Enter address"
              className="bg-white"
            />
          </div>
          <div>
            <InputLabel label="Description" />
            <ControlledTextareaField
              name="description"
              placeholder="Enter description"
              className="bg-white"
            />
          </div>
        </div>

        {isEditMode && (
          <div className="col-span-2 flex items-center gap-2">
            <ControlledCheckField
              name="isActive"
              label="Active (Visible on website)"
            />
          </div>
        )}
      </div>

      <ErrorMessage error={error || patchError} />

      <div className="flex justify-end gap-3 mt-4">
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update" : "Create"}
        />
      </div>
    </form>
  );
}
