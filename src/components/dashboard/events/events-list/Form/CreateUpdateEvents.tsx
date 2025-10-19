import { IOrganization } from "@/components/organizer/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGet } from "@/hooks/useGet";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EventFormType, eventSchema } from "../Schema/schema";
import { ICategory, IEvent, ITag } from "../types";
import EventForm from "./EventForm";

// const EditorWrapper = dynamic(
//   () => import("@/components/share/EditorWrapper"),
//   { ssr: false }
// );

interface CreateUpdateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IEvent | undefined;
}

export default function CreateUpdateEvents({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateEventModalProps) {
  const { data } = useGet<ICategory[]>("/event-categories", [
    "event-categories",
  ]);
  const { data: tagData } = useGet<ITag[]>("/event-tags", ["event-tags"]);
  const { data: organizationData } = useGet<IOrganization[]>(`/organizations`, [
    "organizations",
  ]);
  const {
    mutateAsync,
    error: createError,
    reset: eventReset,
    isPending: isPostPending,
  } = usePost(
    "/events",
    (data) => {
      console.log("POST success", data);
    },
    [["events"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch<FormData>((data) => console.log("Success", data), [["events"]]);
  const isEditMode = !!initialValues;
  const methods = useForm<EventFormType>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      isPublished: false,
      isOnline: false,
    },
    mode: "onChange",
  });

  console.log(initialValues?.organizationId);
  useEffect(() => {
    if (initialValues) {
      methods.reset({
        title: initialValues.title || "",
        description: initialValues.description || "",
        summary: initialValues.summary || "",
        featuredImage: initialValues.featuredImage || "",
        location: initialValues.location || "",
        address: initialValues.address || "",
        startDate: initialValues.startDate
          ? new Date(initialValues.startDate)
          : undefined,
        endDate: initialValues.endDate
          ? new Date(initialValues.endDate)
          : undefined,
        isOnline: Boolean(initialValues.isOnline),
        isPublished: Boolean(initialValues.isPublished),
        organizationId: initialValues.organizationId,

        categoryIds: initialValues.categories?.map((t) => t.categoryId) || [],
        tagIds: initialValues.tags?.map((t) => t.tagId) || [],
        images:
          initialValues.images?.map(
            (img: { imageUrl: string }) => img.imageUrl
          ) || [],
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        title: "",
        description: "",
        summary: "",
        featuredImage: "",
        location: "",
        address: "",
        startDate: undefined,
        endDate: undefined,
        isOnline: false,
        isPublished: false,
        organizationId: undefined,
        categoryIds: undefined,
        tagIds: [],
        images: [],
      });

      eventReset?.();
      patchReset?.();
    }
  }, [isOpen, methods, eventReset, patchReset]);

  const onSubmit = (data: EventFormType) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("summary", data.summary);
    formData.append("featuredImage", data.featuredImage || "");
    formData.append("location", data.location || "");
    formData.append("address", data.address || "");

    const startDateIso = new Date(data.startDate).toISOString();
    const endDateIso = new Date(data.endDate).toISOString();

    formData.append("startDate", startDateIso);
    formData.append("endDate", endDateIso);

    formData.append("isOnline", String(data.isOnline));
    formData.append("isPublished", String(data.isPublished));

    if (data?.organizationId) {
      formData.append("organizationId", String(data.organizationId));
    }

    // FIXED: Append individual category IDs
    (data.categoryIds || []).forEach((id) => {
      if (id) formData.append("categoryIds", String(id)); // Fixed: String(id) not String(data.categoryIds)
    });

    // FIXED: This one was already correct
    (data.tagIds || []).forEach((id) => {
      if (id) formData.append("tagIds", String(id));
    });

    (data.images || []).forEach((img: File | string) => {
      if (img instanceof File) formData.append("images", img);
    });

    if (isEditMode) {
      patchAsync({
        url: `/events/${initialValues?.id}`,
        data: formData,
      }).then(() => {
        toast.success("Event updated successfully"); // Fixed message
        onClose();
        methods.reset();
      });
      return;
    }

    mutateAsync(formData)
      .then(() => {
        toast.success("Event created successfully"); // Fixed message
        onClose();
        methods.reset();
      })
      .catch(() => {
        toast.error("Failed to create event"); // Fixed message
      });
  };
  const categoryOptions = mapToSelectOptions(data?.data, "name", "id");
  const tagOptions = mapToSelectOptions(tagData?.data, "name", "id");
  const organizationOptions = mapToSelectOptions(
    organizationData?.data,
    "name",
    "id"
  );
  const isPending = isPostPending || isPatchPending;
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
            {isEditMode ? "Update Event" : "Create Event"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <EventForm
            isEditMode={isEditMode}
            onSubmit={onSubmit}
            error={createError || patchError}
            isPending={isPending}
            categoryOptions={categoryOptions}
            tagOptions={tagOptions}
            organizationOptions={organizationOptions}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
