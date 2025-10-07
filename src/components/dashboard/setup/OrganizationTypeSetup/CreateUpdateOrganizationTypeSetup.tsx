import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "../../../organizer/types";
import { organizerTypeSetup, OrganizerTypeSetupForm } from "../Schema/Setup";
import { IOrganizationType } from "../types/setup";

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
  } = usePost<IUser[]>(
    "/organization-types",
    (data) => {
      console.log("POST success", data);
    },
    [["organization-types"]]
  );
  const { mutateAsync: mutateAsyncPatch } = usePatch(
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
    }
  }, [isOpen, methods, postReset]);
  
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
        // Reset the form after successful submission
        methods.reset();
        console.log("Organizer type updated successfully");
      });
    } else {
      mutateAsync(organizedData).then(() => {
        console.log("Organizer type created successfully");
        toast.success("Organizer type created successfully");
        onClose();
        // Reset the form after successful submission
        methods.reset();
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Type Setup" : "Create Type Setup"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
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
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
