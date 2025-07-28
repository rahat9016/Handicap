// src/components/page-sections/CreateSectionModal.tsx
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PageSectionForm, pageSectionSchema } from "./schema";
import { IPageSection } from "./types";
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
  const { mutateAsync } = usePost(
    "/page-sections",
    (data) => {
      console.log("POST success", data);
    },
    [["page-sections"]]
  );
  const isEditMode = !!initialValues;
  const methods = useForm<PageSectionForm>({
    resolver: yupResolver(pageSectionSchema),
    defaultValues: {
      isActive: true,
      configuration: {},
    },
  });

  const sectionType = methods.watch("sectionType");

  useEffect(() => {
    if (sectionType) {
      // Set default configuration based on section type
      const defaults = getDefaultConfiguration(sectionType);
      // setConfiguration(defaults);
      methods.setValue("configuration", defaults);
    }
  }, [sectionType, methods]);

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
      });
    }
  }, [initialValues, methods]);
  const getDefaultConfiguration = (type: string) => {
    switch (type) {
      case SectionType.HERO:
        return { theme: "light", layout: "centered" };
      case SectionType.FEATURE_GRID:
        return { columns: 3, showIcons: true };
      case SectionType.TESTIMONIALS:
        return { layout: "carousel", autoplay: true };
      default:
        return {};
    }
  };
console.log(methods.formState.errors)
  const onSubmit = (data: PageSectionForm) => {
    const formData = new FormData();

    // Required fields
    formData.append("pageId", data.pageId);
    formData.append("sectionType", data.sectionType);
    formData.append("order", data.order.toString());
    formData.append("isActive", data.isActive.toString());

    // Optional fields
    if (data.title) formData.append("title", data.title);
    if (data.subtitle) formData.append("subtitle", data.subtitle);
    if (data.content) formData.append("content", data.content);
    if (data.buttonLabel) formData.append("buttonLabel", data.buttonLabel);
    if (data.buttonUrl) formData.append("buttonUrl", data.buttonUrl);

    // Handle image
    if (data.images instanceof File) {
      formData.append("images", data.images);
    } else if (typeof data.images === "string") {
      formData.append("images", data.images);
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
                <InputLabel label="Title" />
                <ControlledInputField
                  name="title"
                  placeholder="Main heading for the section"
                />
              </div>

              <div>
                <InputLabel label="Subtitle" />
                <ControlledInputField
                  name="subtitle"
                  placeholder="Secondary heading for the section"
                />
              </div>
              <div className="col-span-2">
                <InputLabel label="Content" />
                <EditorWrapper
                  value={methods.watch("content") || ""}
                  onChange={(value) => methods.setValue("content", value)}
                />
              </div>

              {/* Action Fields */}
              <div>
                <InputLabel label="Button Label" />
                <ControlledInputField
                  name="buttonLabel"
                  placeholder="Text for call-to-action button"
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
                {/* <MultipleImageFileInput name="images" errors={{ images: methods.formState.errors.images as FieldError }} /> */}
              </div>

              {/* Status Field */}
              <div className="col-span-2 flex items-center gap-2">
                <ControlledInputField
                  name="isActive"
                  type="checkbox"
                  className="w-4 h-4"
                />
                <InputLabel label="Active Section (Visible on website)" />
              </div>
            </div>

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
