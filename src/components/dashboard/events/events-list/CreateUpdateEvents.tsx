import { IOrganization } from "@/components/organizer/types";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledDatePicker from "@/components/share/ControlledDatePicker";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledMultiSelectField from "@/components/share/ControlledMultiSelectField";
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
import { useGet } from "@/hooks/useGet";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { FieldError, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EventForm, eventSchema } from "./schema";
import { ICategory, IEvent, ITag } from "./types";

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
  const { data } = useGet<ICategory[]>("/event-categories", [
    "event-categories",
  ]);
  const { data: tagData } = useGet<ITag[]>("/event-tags", ["event-tags"]);
  const { data: organizationData } = useGet<IOrganization[]>(`/organizations`, [
    "organizations",
  ]);
  const {
    mutateAsync,
    error,
    reset: eventReset,
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
  } = usePatch<FormData>((data) => console.log("Success", data), [["events"]]);
  const isEditMode = !!initialValues;
  const methods = useForm<EventForm>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      isPublished: false,
      isOnline: false,
    },
    mode: "onChange",
  });
  const {
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        // Simple fields
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
        organizationId: initialValues.organizationId || 0,

        categoryIds: initialValues.categories[0]?.categoryId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tagIds: initialValues.tags?.map((t: any) => t.tagId) || [],
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
        organizationId: 0,
        categoryIds: undefined,
        tagIds: [],
        images: [],
      });

      eventReset?.();
      patchReset?.();
    }
  }, [isOpen, methods, eventReset, patchReset]);

  const onSubmit = (data: EventForm) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("summary", data.summary);
    formData.append("featuredImage", data.featuredImage || "");
    formData.append("location", data.location || "");
    formData.append("address", data.address || "");
    const startDateIso =
      data.startDate instanceof Date
        ? data.startDate.toISOString()
        : data.startDate;
    const endDateIso =
      data.endDate instanceof Date ? data.endDate.toISOString() : data.endDate;
    formData.append("startDate", String(startDateIso));
    formData.append("endDate", String(endDateIso));
    formData.append("isOnline", String(data.isOnline));
    formData.append("isPublished", String(data.isPublished));
    formData.append("organizationId", String(data.organizationId));
    formData.append("categoryIds", String(data.categoryIds));
    (data.tagIds || []).forEach((id) => {
      if (id) formData.append("tagIds", String(id));
    });
    (data.images || []).forEach((img: File | string) => {
      if (typeof img === "string") formData.append("images", img);
      else formData.append("images", img);
    });

    if (isEditMode) {
      patchAsync({
        url: `/events/${initialValues?.id}`,
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
  const categoryOptions = mapToSelectOptions(data?.data, "name", "id");
  const tagOptions = mapToSelectOptions(tagData?.data, "name", "id");
  const organizationOptions = mapToSelectOptions(
    organizationData?.data,
    "name",
    "id"
  );
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
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputLabel label="Title" required />
                <ControlledInputField
                  name="title"
                  placeholder="Write here your event name..."
                />
              </div>
              <div>
                <InputLabel label="Event Location" />
                <ControlledInputField
                  name="location"
                  placeholder="Write here your event location..."
                />
              </div>

              <div>
                <InputLabel label="Address" />
                <ControlledInputField
                  name="address"
                  placeholder="Write here your event address"
                />
              </div>
              <div>
                <InputLabel label="Featured image URL" />
                <ControlledInputField
                  name="featuredImage"
                  placeholder="Write here your featured image URL..."
                />
              </div>

              <div>
                <InputLabel label="Start Date" />
                <ControlledDatePicker name="startDate" />
              </div>
              <div>
                <InputLabel label="End Date" />
                <ControlledDatePicker name="endDate" />
              </div>

              <div className="col-span-1">
                <InputLabel label="Description" required />
                <EditorWrapper
                  value={methods.watch("description") || ""}
                  onChange={(value) => methods.setValue("description", value)}
                />
                {errors?.description?.message && (
                  <div className="text-rose-500 text-xs mt-1 pl-2">
                    {errors.description.message}
                  </div>
                )}
              </div>

              <div className="col-span-1">
                <InputLabel label="Summary" required />
                <EditorWrapper
                  value={methods.watch("summary") || ""}
                  onChange={(value) => methods.setValue("summary", value)}
                />
                {errors?.summary?.message && (
                  <div className="text-rose-500 text-xs mt-1 pl-2">
                    {errors.summary.message}
                  </div>
                )}
              </div>
              <div>
                <InputLabel label="Category" required />
                <ControlledSelectField
                  name="categoryIds"
                  placeholder="Please enter your category"
                  options={categoryOptions}
                />
              </div>
              <div>
                <InputLabel label="Tag" required />
                <ControlledMultiSelectField
                  name="tagIds"
                  placeholder="Please enter your tag"
                  options={tagOptions}
                />
              </div>
              <div>
                <InputLabel label="Organization" required />
                <ControlledSelectField
                  name="organizationId"
                  placeholder="Please enter your tag"
                  options={organizationOptions}
                />
              </div>
              <div className="col-span-2">
                <InputLabel label="Event Images" />
                <MultipleImageFileInput
                  name="images"
                  errors={{
                    images: methods.formState.errors.images as FieldError,
                  }}
                />
              </div>

              {/* Status Field */}
              <div className="col-span-1 flex items-center gap-2">
                <ControlledCheckField
                  name="isPublished"
                  label="Is published events (Visible on website)"
                />
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <ControlledCheckField
                  name="isOnline"
                  label="Is online events (Visible on website)"
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
                {isEditMode ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
