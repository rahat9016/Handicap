// src/components/page-sections/CreateSectionModal.tsx
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import ImageFileInput from "@/components/share/ImageFileInput";
import InputLabel from "@/components/share/InputLabel";
import { PageSectionForm, pageSectionSchema } from "./schema";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

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

interface CreateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateSectionModal({
  isOpen,
  onClose,
}: CreateSectionModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync } = usePost(
    "/page-sections",
    (data) => {
      console.log("POST success", data);
    },
    [["page-sections"]]
  );

  const methods = useForm<PageSectionForm>({
    resolver: yupResolver(pageSectionSchema),
    defaultValues: {
      isActive: true,
      configuration: "{}", // Initialize as empty JSON string
    },
  });

  const [configuration, setConfiguration] = useState<Record<string, any>>({});

  // Watch section type to update configuration defaults
  const sectionType = methods.watch("sectionType");

  useEffect(() => {
    if (sectionType) {
      // Set default configuration based on section type
      const defaults = getDefaultConfiguration(sectionType);
      setConfiguration(defaults);
      methods.setValue("configuration", JSON.stringify(defaults));
    }
  }, [sectionType, methods]);

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

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...configuration, [key]: value };
    setConfiguration(newConfig);
    methods.setValue("configuration", JSON.stringify(newConfig));
  };

  const onSubmit = (data: PageSectionForm) => {
    const formData = new FormData();

    // Required fields
    formData.append("pageId", data.pageId);
    formData.append("sectionType", data.sectionType);
    formData.append("order", data.order.toString());

    // Optional fields
    if (data.title) formData.append("title", data.title);
    if (data.subtitle) formData.append("subtitle", data.subtitle);
    if (data.content) formData.append("content", data.content);
    if (data.buttonLabel) formData.append("buttonLabel", data.buttonLabel);
    if (data.buttonUrl) formData.append("buttonUrl", data.buttonUrl);

    // Configuration (always sent, at least as empty object)
    if (data.configuration) {
      formData.append("configuration", data.configuration);
    }

    formData.append("isActive", data.isActive.toString());

    // Handle image
    if (data.images instanceof File) {
      formData.append("images", data.images);
    } else if (typeof data.images === "string") {
      formData.append("images", data.images);
    }

    mutateAsync(formData)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["page-sections"] });
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
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                <ControlledTextareaField
                  name="content"
                  placeholder="Enter the main content (HTML supported)"
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

              {/* Configuration Fields */}
              <div className="col-span-2 space-y-4 p-4 border rounded-lg">
                <h3 className="font-medium">Section Configuration</h3>

                {sectionType === SectionType.HERO && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <InputLabel label="Theme" />
                      <ControlledSelectField
                        name="config.theme"
                        options={[
                          { label: "Light", value: "light" },
                          { label: "Dark", value: "dark" },
                        ]}
                      />
                    </div>
                    <div>
                      <InputLabel label="Layout" />
                      <ControlledSelectField
                        name="config.layout"
                        options={[
                          { label: "Centered", value: "centered" },
                          { label: "Left Aligned", value: "left" },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {sectionType === SectionType.FEATURE_GRID && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <InputLabel label="Number of Columns" />
                      <ControlledInputField type="number" name="" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={configuration.showIcons !== false} />
                      <InputLabel label="Show Icons" />
                    </div>
                  </div>
                )}

                {/* Add more configuration options for other section types */}
              </div>

              {/* Media Field */} 
              <div className="col-span-2">
                <InputLabel label="Section Image" />
                <ImageFileInput name="images" />
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
                className="min-w-[100px] bg-primary hover:bg-primary-dark"
              >
                Create Section
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
