import ControlledInputField from "@/components/share/ControlledInputField";
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
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "../../organizer/types";
import { organizerTypeSetup, OrganizerTypeSetupForm } from "../Schema/Setup";

export default function CreateUpdateOrganizationTypeSetup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {


  const { mutateAsync, error } = usePost<IUser[]>(
    "/organization-types",
    (data) => {
      console.log("POST success", data);
    },
    [["organization-types"]]
  );
  const methods = useForm<OrganizerTypeSetupForm>({
    resolver: yupResolver(organizerTypeSetup),
  });

  const onSubmit = (data: OrganizerTypeSetupForm) => {

    // Submit the form data
    mutateAsync(data).then(() => {
      console.log("Organizer type created successfully");
      toast.success("Organizer type created successfully");
      onClose();
      // Reset the form after successful submission
      methods.reset();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Type Setup</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Type name" required />
              <ControlledInputField name="name" placeholder="Enter type name" />
            </div>
            
            {error?.errors?.length && (
              <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
                {error?.errors && error?.errors[0]}
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="submit"
                className="bg-dashboard-primary hover:bg-dashboard-primary text-white"
              >
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
