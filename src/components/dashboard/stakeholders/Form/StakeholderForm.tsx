import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { ErrorType } from "@/types";
import { useFormContext } from "react-hook-form";
import { StakeholderFormType } from "../Schema/Stakeholder";
import { PDFFileUploadController } from "./PDFFileUploadController";

export default function StakeholderForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: StakeholderFormType) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}) {
  const methods = useFormContext<StakeholderFormType>();
  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4">
          <InputLabel label="Name" required />
          <ControlledInputField
            name="name"
            placeholder="Enter name of stakeholder"
          />
        </div>
        <div className="mb-4">
          <InputLabel label="Upload file" required />
          <PDFFileUploadController name="file" />
        </div>
        <div className="mb-4">
          <InputLabel label="Description" />
          <ControlledTextareaField
            name="description"
            placeholder="Enter description of stakeholder"
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
    </div>
  );
}
