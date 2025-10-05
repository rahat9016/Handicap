import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import MultipleImageFileInput from "@/components/share/MultipleImageFileInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { FieldError, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PageSectionForm, pageSectionSchema } from "./schema";
import { IEvent } from "./types";

const EditorWrapper = dynamic(
  () => import("@/components/share/EditorWrapper"),
  { ssr: false }
);


interface CreateUpdateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IEvent | undefined;
}

export default function CreateEventModal({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateEventModalProps) {
  const { mutateAsync, error } = usePost(
    "/events",
    (data) => {
      console.log("POST success", data);
    },
    [["events"]]
  );
  const { mutateAsync: patchAsync, error: patchError } = usePatch<FormData>(
    (data) => console.log("Success", data),
    [["events"]]
  );
  const isEditMode = !!initialValues;
  const methods = useForm<PageSectionForm>({
    resolver: yupResolver(pageSectionSchema),
    defaultValues: {
      isActive: true,
    },
    mode: "onChange",
  });

  // useEffect(() => {
  //   if (initialValues) {
  //     methods.reset({
  //       ...initialValues,
  //       images: initialValues?.imageUrls,
  //       isActive: Boolean(initialValues?.isActive),
  //       title: initialValues?.title?.en,
  //       titleBn: initialValues?.title?.bn,
  //       content: initialValues?.content?.en,
  //       contentBn: initialValues?.content.bn ?? "",
  //       subtitle: initialValues?.subtitle?.en,
  //       subtitleBn: initialValues?.subtitle?.bn ?? "",
  //       buttonLabel: initialValues.buttonLabel.en ?? "",
  //       buttonLabelBn: initialValues.buttonLabel.bn ?? "",
  //       buttonUrl: initialValues?.buttonUrl,
  //     });
  //   }
  // }, [initialValues, methods]);

  const onSubmit = (data: PageSectionForm) => {
    const formData = new FormData();
    formData.append("pageId", data.pageId);
    formData.append("sectionType", data.sectionType);
    formData.append("order", data.order.toString());
    formData.append("isActive", String(data.isActive));

    // Optional fields
    if (data.title) formData.append("title", data.title);
    if (data.titleBn) formData.append("titleBn", data.titleBn);
    if (data.subtitle) formData.append("subtitle", data.subtitle);
    if (data.subtitleBn) formData.append("subtitleBn", data.subtitleBn);
    if (data.content) formData.append("content", data.content);
    if (data.contentBn) formData.append("contentBn", data.contentBn);
    if (data.buttonLabel) formData.append("buttonLabel", data.buttonLabel);
    if (data.buttonLabelBn) formData.append("buttonLabelBn", data.buttonLabelBn);
    if (data.buttonUrl) formData.append("buttonUrl", data.buttonUrl);

    // Handle image
    const currentImages = data.images || [];
    const newFiles = currentImages.filter((img) => img instanceof File);
    // const existingUrls = currentImages.filter(
    //   (img) => typeof img === "string"
    // ) as string[];

    // Append new files
    newFiles.forEach((file) => formData.append("images", file));

    if (isEditMode) {
      patchAsync({
        url: `/page-sections/${initialValues?.id}`,
        data: formData,
      }).then(() => {
        console.log("Page section updated successfully");
        toast.success("Page section updated successfully");
        onClose();
        // Reset the form after successful submission
        methods.reset();
      });
      return;
    }
    mutateAsync(formData)
      .then(() => {
        toast.success("Section created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create section");
        console.error(error);
      });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        methods.reset();
        onClose();
      }}
    >
      <DialogContent className="bg-white !max-w-[60vw] w-[60vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Page Section</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Required Fields */}
              <div>
                <InputLabel label="Page" required />
                <ControlledInputField />
              </div>
              <div>
                <InputLabel label="Section Type" required />
                
              </div>

              <div>
                <InputLabel label="Order" required />
                <ControlledInputField
                  name="order"
                  type="number"
                  placeholder="Enter display order (e.g., 1, 2, 3...)"
                />
              </div>

              {/* Content Fields */}
              <div>
                <InputLabel label="Title (English)" />
                <ControlledInputField
                  name="title"
                  placeholder="Main heading for the section (EN)"
                />
              </div>

              <div>
                <InputLabel label="Title (Bangla)" />
                <ControlledInputField
                  name="titleBn"
                  placeholder="Main heading for the section (BN)"
                />
              </div>

              <div>
                <InputLabel label="Subtitle (English)" />
                <ControlledInputField
                  name="subtitle"
                  placeholder="Secondary heading for the section (EN)"
                />
              </div>

              <div>
                <InputLabel label="Subtitle (Bangla)" />
                <ControlledInputField
                  name="subtitleBn"
                  placeholder="Secondary heading for the section (BN)"
                />
              </div>
              <div className="col-span-2">
                <InputLabel label="Content (English)" />
                <EditorWrapper
                  value={methods.watch("content") || ""}
                  onChange={(value) => methods.setValue("content", value)}
                />
              </div>

              <div className="col-span-2">
                <InputLabel label="Content (Bangla)" />
                <EditorWrapper
                  value={methods.watch("contentBn") || ""}
                  onChange={(value) => methods.setValue("contentBn", value)}
                />
              </div>

              {/* Action Fields */}
              <div>
                <InputLabel label="Button Label (English)" />
                <ControlledInputField
                  name="buttonLabel"
                  placeholder="Text for call-to-action button (EN)"
                />
              </div>
              <div>
                <InputLabel label="Button Label (Bangla)" />
                <ControlledInputField
                  name="buttonLabelBn"
                  placeholder="Text for call-to-action button (BN)"
                />
              </div>
              <div>
                <InputLabel label="Button URL" />
                <ControlledInputField
                  name="buttonUrl"
                  placeholder="URL for the button (e.g., '/about')"
                />
              </div>
              <div className="col-span-2">
                <InputLabel label="Section Image" />
                <MultipleImageFileInput
                  name="images"
                  errors={{
                    images: methods.formState.errors.images as FieldError,
                  }}
                />
              </div>

              {/* Status Field */}
              <div className="col-span-2 flex items-center gap-2">
                <ControlledCheckField
                  name="isPublished"
                  label="Published Section (Visible on website)"
                />
              </div>
            </div>
            {error?.errors?.length ||
              (patchError?.errors?.length && (
                <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
                  {error?.errors && error?.errors[0]}
                  {patchError?.errors && patchError?.errors[0]}
                </div>
              ))}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="min-w-[100px] bg-dashboard-primary hover:bg-dashboard-primary  text-white hover:text-white"
              >
                {isEditMode ? "Update Section" : "Create Section"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
