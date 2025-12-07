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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PageSectionForm, pageSectionSchema } from "../Schema/schema";
import SectionForm from "./SectionForm";

export default function CreateUpdateSectionModal({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IPageSection | undefined;
}) {
  const isEditMode = !!initialValues;

  const { mutateAsync, error } = usePost(
    "/page-sections",
    () => toast.success("Section created successfully"),
    [["page-sections"]]
  );

  const { mutateAsync: patchAsync, error: patchError } = usePatch<FormData>(
    () => toast.success("Section updated successfully"),
    [["page-sections"]]
  );

  const methods = useForm<PageSectionForm>({
    resolver: yupResolver(pageSectionSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
        images: initialValues.imageUrls[0],
        title: initialValues.title?.en ?? "",
        titleBn: initialValues.title?.bn ?? "",
        subtitle: initialValues.subTitle?.en ?? "",
        subtitleBn: initialValues.subTitle?.bn ?? "",
        content: initialValues.content?.en ?? "",
        contentBn: initialValues.content?.bn ?? "",
        buttonLabel: initialValues.buttonLabel?.en ?? "",
        buttonLabelBn: initialValues.buttonLabel?.bn ?? "",
        buttonUrl: initialValues.buttonUrl ?? "",
        buttonLabel2: initialValues.buttonLabel2?.en ?? "",
        buttonLabelBn2: initialValues.buttonLabel2?.bn ?? "",
        buttonUrl2: initialValues.buttonUrl2 ?? "",
        backgroundImage: initialValues.backgroundImageUrl ?? "",
      });
    }
  }, [initialValues, methods]);

  const onSubmit = (data: PageSectionForm) => {
    const formData = new FormData();

    // REQUIRED FIELDS
    formData.append("pageId", initialValues?.pageId ?? data.pageId);
    formData.append(
      "sectionType",
      initialValues?.sectionType ?? data.sectionType
    );

    // TEXT FIELDS
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

    const currentImage = data.images ?? null;

    if (currentImage instanceof File) {
      formData.append("images", currentImage); 
    }

  
    const existingUrl = typeof currentImage === "string" ? currentImage : null;

    // 🔹 handle background image
    if (data.backgroundImage instanceof File) {
      formData.append("backgroundImage", data.backgroundImage);
    }

    // 🔹 track deleted images (edit mode only)
    if (isEditMode && initialValues?.imageUrls) {
      const oldUrls = initialValues.imageUrls as string[];

      const imagesToDelete = oldUrls.filter(
        (url) => !existingUrl?.includes(url)
      );

      if (imagesToDelete.length > 0) {
        formData.append("imagesToDelete", imagesToDelete.join(","));
      }
    }

    // -------------------------------------
    // SUBMIT API CALL
    // -------------------------------------
    if (isEditMode) {
      patchAsync({
        url: `/page-sections/${initialValues?.id}`,
        data: formData,
      }).then(() => {
        toast.success("Page section updated successfully");
        onClose();
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
      .catch(() => {
        toast.error("Failed to create section");
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
          <DialogTitle>
            {isEditMode ? "Update Page Section" : "Create Page Section"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <SectionForm
            isEditMode={isEditMode}
            onSubmit={methods.handleSubmit(onSubmit)}
            error={error || patchError}
            initialValues={initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
