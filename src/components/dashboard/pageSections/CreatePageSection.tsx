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

interface CreateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateSectionModal({
  isOpen,
  onClose,
}: CreateSectionModalProps) {
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
    },
  });

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
    if (data.configuration) {
      formData.append("configuration", JSON.stringify(data.configuration));
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
      <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Page Section</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <InputLabel label="Section Type" required />
                <ControlledSelectField
                  name="sectionType"
                  options={[
                    { label: "Hero Banner", value: "HERO" },
                    { label: "Features", value: "FEATURES" },
                    { label: "Testimonials", value: "TESTIMONIALS" },
                    { label: "CTA", value: "CTA" },
                  ]}
                />
              </div>

              <div>
                <InputLabel label="Order" required />
                <ControlledInputField
                  name="order"
                  type="number"
                
                />
              </div>

              <div>
                <InputLabel label="Title" />
                <ControlledInputField name="title" />
              </div>

              <div>
                <InputLabel label="Subtitle" />
                <ControlledInputField name="subtitle" />
              </div>

              <div>
                <InputLabel label="Content" />
                <ControlledTextareaField name="content" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <InputLabel label="Button Label" />
                  <ControlledInputField name="buttonLabel" />
                </div>
                <div>
                  <InputLabel label="Button URL" />
                  <ControlledInputField name="buttonUrl" />
                </div>
              </div>

              <div>
                <InputLabel label="Section Image" />
                <ImageFileInput name="images" />
              </div>

              <div className="flex items-center gap-2">
                <ControlledInputField
                  name="isActive"
                  type="checkbox"
                  className="w-4 h-4"
                />
                <InputLabel label="Active Section" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Section
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}