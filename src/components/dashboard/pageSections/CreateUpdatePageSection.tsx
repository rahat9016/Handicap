// src/components/page-sections/CreateSectionModal.tsx
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
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
import { IPageSection } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { FieldError, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FileUploadController } from "../resources/resources/FileUploadController";
import { PageSectionForm, pageSectionSchema } from "./schema";

const EditorWrapper = dynamic(
  () => import("@/components/share/EditorWrapper"),
  { ssr: false }
);

enum PageIdentifier {
  HOME = "HOME",
  ABOUT = "ABOUT",
  SERVICES = "SERVICES",
  RESOURCES = "RESOURCES",
  NEWS = "NEWS",
  EVENTS = "EVENTS",
  CONTACT = "CONTACT",
  DISABILITY_INCLUSION_HUB = "DISABILITY_INCLUSION_HUB",
  CUSTOM = "CUSTOM",
}

enum SectionType {
  HERO = "HERO",
  CONTENT_BLOCK = "CONTENT_BLOCK",
  IMAGE_GALLERY = "IMAGE_GALLERY",
  FEATURE_GRID = "FEATURE_GRID",
  TESTIMONIALS = "TESTIMONIALS",
  STATISTICS = "STATISTICS",
  TEAM = "TEAM",
  PARTNERS = "PARTNERS",
  CALL_TO_ACTION = "CALL_TO_ACTION",
  RESOURCE_LIST = "RESOURCE_LIST",
  VIDEO_EMBED = "VIDEO_EMBED",
  ACCORDION = "ACCORDION",
  TIMELINE = "TIMELINE",
  NEWS_GALLERY = "NEWS_GALLERY",
  ABOUT_US = "ABOUT_US",
  OUR_MISSION = "OUR_MISSION",
  OUR_VISION = "OUR_VISION",
  WHO_WE_SERVE = "WHO_WE_SERVE",
  ORGANIZATION = "ORGANIZATION",
}

const pageOptions = Object.values(PageIdentifier).map((value) => ({
  label: value
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" "),
  value,
}));

const sectionTypeOptions = Object.values(SectionType).map((value) => ({
  label: value
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" "),
  value,
}));

interface CreateUpdateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IPageSection | undefined;
}

export default function CreateSectionModal({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateSectionModalProps) {
  const { mutateAsync, error } = usePost(
    "/page-sections",
    (data) => {
      console.log("POST success", data);
    },
    [["page-sections"]]
  );
  const { mutateAsync: patchAsync, error: patchError } = usePatch<FormData>(
    (data) => console.log("Success", data),
    [["page-sections"]]
  );
  const isEditMode = !!initialValues;
  const methods = useForm<PageSectionForm>({
    resolver: yupResolver(pageSectionSchema),

    mode: "onChange",
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
        images: initialValues?.imageUrls,
        // isActive: Boolean(initialValues?.isActive),
        title: initialValues?.title?.en ?? undefined, // Convert null to undefined
        titleBn: initialValues?.title?.bn ?? undefined, // Convert null to undefined
        content: initialValues?.content?.en ?? undefined, // Convert null to undefined
        contentBn: initialValues?.content?.bn ?? "",
        subtitle: initialValues?.subtitle?.en ?? undefined, // Convert null to undefined
        subtitleBn: initialValues?.subtitle?.bn ?? "",
        buttonLabel: initialValues.buttonLabel?.en ?? "",
        buttonLabelBn: initialValues.buttonLabel?.bn ?? "",
        buttonUrl: initialValues?.buttonUrl ?? undefined, // Convert null to undefined
        buttonLabel2: initialValues.buttonLabel2?.en ?? "",
        buttonLabelBn2: initialValues.buttonLabel2?.bn ?? "",
        buttonUrl2: initialValues?.buttonUrl2 ?? undefined, // Convert null to undefined
      });
    }
  }, [initialValues, methods]);

  const onSubmit = (data: PageSectionForm) => {
    const formData = new FormData();
    formData.append("pageId", data.pageId);
    formData.append("sectionType", data.sectionType);
    formData.append("order", data.order.toString());
    // formData.append("isActive", String(data.isActive));

    // Optional fields
    if (data.title) formData.append("title", data.title);
    if (data.titleBn) formData.append("titleBn", data.titleBn);
    if (data.subtitle) formData.append("subtitle", data.subtitle);
    if (data.subtitleBn) formData.append("subtitleBn", data.subtitleBn);
    if (data.content) formData.append("content", data.content);
    if (data.contentBn) formData.append("contentBn", data.contentBn);
    if (data.buttonLabel) formData.append("buttonLabel", data.buttonLabel);
    if (data.buttonLabelBn)
      formData.append("buttonLabelBn", data.buttonLabelBn);
    if (data.buttonUrl) formData.append("buttonUrl", data.buttonUrl);

    if (data.buttonLabel2) formData.append("buttonLabel2", data.buttonLabel2);
    if (data.buttonLabelBn2)
      formData.append("buttonLabelBn2", data.buttonLabelBn2);
    if (data.buttonUrl2) formData.append("buttonUrl2", data.buttonUrl2);

    // Handle image
    const currentImages = data.images || [];
    const newFiles = currentImages.filter((img) => img instanceof File);
    const existingUrls = currentImages.filter(
      (img) => typeof img === "string"
    ) as string[];

    // Append new files
    newFiles.forEach((file) => formData.append("images", file));
    if (data.backgroundImage) {
      if (data.backgroundImage instanceof File) {
        formData.append("backgroundImage", data.backgroundImage);
      }
    }

    // Track deleted images
    let imagesToDelete: string[] = [];
    if (isEditMode && initialValues?.imageUrls) {
      const oldUrls = initialValues.imageUrls as string[];
      imagesToDelete = oldUrls.filter((url) => !existingUrls.includes(url));
    }

    if (imagesToDelete.length > 0) {
      formData.append("imagesToDelete", imagesToDelete.join(","));
    }
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
                <ControlledSelectField
                  name="pageId"
                  options={pageOptions}
                  placeholder="Select a page..."
                />
              </div>
              <div>
                <InputLabel label="Section Type" required />
                <ControlledSelectField
                  name="sectionType"
                  options={sectionTypeOptions}
                  placeholder="Select section type..."
                />
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
              <div>
                <InputLabel label="Button Label (English)" />
                <ControlledInputField
                  name="buttonLabel2"
                  placeholder="Text for call-to-action button (EN)"
                />
              </div>
              <div>
                <InputLabel label="Button Label (Bangla)" />
                <ControlledInputField
                  name="buttonLabelBn2"
                  placeholder="Text for call-to-action button (BN)"
                />
              </div>
              <div>
                <InputLabel label="Button URL" />
                <ControlledInputField
                  name="buttonUrl2"
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
              <div className="col-span-2">
                <InputLabel label="Background Image" />
                <FileUploadController
                  name={`backgroundImage`}
                  className="h-[224px] w-full"
                  label="Upload File only (JPEG, JPG)"
                />
              </div>

              {/* Status Field */}
              {/* <div className="col-span-2 flex items-center gap-2">
                <ControlledCheckField
                  name="isActive"
                  label="Active Section (Visible on website)"
                />
              </div> */}
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
