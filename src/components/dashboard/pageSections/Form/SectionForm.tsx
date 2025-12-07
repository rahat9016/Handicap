import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import TextEditor from "@/components/common/text-editor/TextEditor";
import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { ErrorType, IPageSection } from "@/types";
import { useFormContext } from "react-hook-form";
import { FileUploadController } from "../../resources/resources/FileUploadController";
import { PageSectionForm } from "../Schema/schema";

function SectionForm({
  isEditMode,
  onSubmit,
  error,
  initialValues,
}: {
  isEditMode: boolean;
  onSubmit: () => void;
  error?: ErrorType | null;
  initialValues?: IPageSection;
}) {
  const methods = useFormContext<PageSectionForm>();

  const formattedTitle = (value: string | undefined) => {
    if (!value) return "";
    return value
      ?.split("_")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <form onSubmit={onSubmit} className="w-full space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputLabel label="Page" required />
          <div className="border p-2 rounded bg-gray-100">
            {formattedTitle(initialValues?.pageId)}
          </div>
        </div>

        <div>
          <InputLabel label="Section Type" />
          <div className="border p-2 rounded bg-gray-100">
            {formattedTitle(initialValues?.sectionType)}
          </div>
        </div>

        {/* TITLE */}
        <div>
          <InputLabel label="Title (English)" />
          <ControlledInputField placeholder="Write here..." name="title" />
        </div>

        <div>
          <InputLabel label="Title (Bangla)" />
          <ControlledInputField placeholder="Write here..." name="titleBn" />
        </div>

        {/* SUBTITLE */}
        <div>
          <InputLabel label="Subtitle (English)" />
          <ControlledInputField placeholder="Write here..." name="subtitle" />
        </div>

        <div>
          <InputLabel label="Subtitle (Bangla)" />
          <ControlledInputField placeholder="Write here..." name="subtitleBn" />
        </div>

        {/* CONTENT */}
        <div className="col-span-2">
          <InputLabel label="Content (English)" />
          <TextEditor
            value={methods.watch("content") ?? ""}
            onChange={(v) =>
              methods.setValue("content", v, { shouldValidate: true })
            }
          />
        </div>

        <div className="col-span-2">
          <InputLabel label="Content (Bangla)" />
          <TextEditor
            value={methods.watch("contentBn") ?? ""}
            onChange={(v) =>
              methods.setValue("contentBn", v, { shouldValidate: true })
            }
          />
        </div>
        <div>
          <InputLabel label="Button Label (EN)" />
          <ControlledInputField name="buttonLabel" />
        </div>
        <div>
          <InputLabel label="Button Label (BN)" />
          <ControlledInputField name="buttonLabelBn" />
        </div>
        <div className="col-span-2">
          <InputLabel label="Button URL" />
          <ControlledInputField placeholder="Write here..." name="buttonUrl" />
        </div>

        <div
          className="col-span-
        1"
        >
          <InputLabel label="Section Images" />
          <FileUploadController
            name="images"
            className="w-full"
            imgClassName="object-cover"
          />
        </div>

        <div className="col-span-1">
          <InputLabel label="Background Image" />
          <FileUploadController
            name="backgroundImage"
            className="w-full"
            imgClassName="object-cover"
          />
        </div>
      </div>

      <ErrorMessage error={error} />
      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" className="min-w-[130px]">
          {isEditMode ? "Update Section" : "Create Section"}
        </Button>
      </div>
    </form>
  );
}

export default SectionForm;
