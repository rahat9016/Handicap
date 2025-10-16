import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "../../../../organizer/types";
import { organizerTypeSetup, OrganizerTypeSetupForm } from "../../Schema/Setup";
import { IOrganizationType } from "../../types/setup";
import OrganizationTypeForm from "./OrganizationTypeForm";

export default function CreateUpdateOrganizationTypeSetup({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IOrganizationType | null;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<IUser[]>(
    "/organization-types",
    (data) => {
      console.log("POST success", data);
    },
    [["organization-types"]]
  );
  const {
    mutateAsync: mutateAsyncPatch,
    isPending: isPatchPending,
    reset: patchReset,
    error: patchError,
  } = usePatch(
    (data) => console.log("Success", data),
    [["organization-types"]]
  );
  const methods = useForm<OrganizerTypeSetupForm>({
    resolver: yupResolver(organizerTypeSetup),
    mode: "onChange",
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues?.description || "",
        isActive: Boolean(initialValues?.isActive),
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        description: "",
        isActive: false,
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, postReset, patchReset]);

  const onSubmit = (data: OrganizerTypeSetupForm) => {
    const organizedData: {
      name: string;
      description?: string;
      isActive?: boolean;
    } = {
      name: data.name,
      description: data.description,
    };
    if (initialValues) organizedData.isActive = data.isActive;
    if (initialValues) {
      mutateAsyncPatch({
        url: `/organization-types/${initialValues.id}`,
        data: organizedData,
      }).then(() => {
        toast.success("Organizer type updated successfully");
        onClose();
        methods.reset();
      });
    } else {
      mutateAsync(organizedData).then(() => {
        console.log("Organizer type created successfully");
        toast.success("Organizer type created successfully");
        onClose();
        methods.reset();
      });
    }
  };
  const isPending = isPostPending || isPatchPending;
  // console.log(patchError);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Type Setup" : "Create Type Setup"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <OrganizationTypeForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={error || patchError}
            isPending={isPending}
          />
          {/* <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Type name" required />
              <ControlledInputField name="name" placeholder="Enter type name" />
            </div>
            <div className="mb-4">
              <InputLabel label="Description" />
              <ControlledTextareaField
                name="description"
                placeholder="Enter description"
              />
            </div>
            {initialValues && (
              <div className="mb-4">
                <InputLabel label="Is Active" />
                <ControlledCheckField
                  name="isActive"
                  label="Active (Visible on website)"
                />
              </div>
            )}
            {error?.errors && <ErrorMessage error={error.errors[0]} />}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="submit"
                className="bg-dashboard-primary hover:bg-dashboard-primary text-white"
              >
                {initialValues ? "Update" : "Create"}
              </Button>
            </div>
          </form> */}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
