import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import { ErrorType } from "@/types";
import { useFormContext } from "react-hook-form";
import { LanguageFormType } from "../../Schema/Setup";

export default function LanguageForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: LanguageFormType) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}) {
  const methods = useFormContext<LanguageFormType>();
  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4">
          <InputLabel label="Code" required />
          <ControlledInputField
            name="code"
            placeholder="Write here code eg. en,bn "
          />
        </div>
        <div className="mb-4">
          <InputLabel label="Name" required />
          <ControlledInputField
            name="name"
            placeholder="Enter name of language"
          />
        </div>
        <div className="mb-4">
          <InputLabel label="Native Name" required />
          <ControlledInputField
            name="nativeName"
            placeholder="Enter native name of language"
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
