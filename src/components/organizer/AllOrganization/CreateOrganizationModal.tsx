import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import ImageFileInput from "@/components/share/ImageFileInput";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGet } from "@/hooks/useGet";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { FormProvider } from "react-hook-form";
import { OrganizationForm } from "../schema/AddOrganizer";
import { IOrganizationTypes } from "../types";

export default function CreateOrganizationModal({
  isOpen,
  onClose,
  errors,
  methods,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  errors: string[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: any;
  onSubmit: (data: OrganizationForm) => void;

}) {
  const { data } = useGet<IOrganizationTypes[]>(
    "/organization-types/all?isActive=true",
    ["organizations"]
  );

  
  const organizationOptions = mapToSelectOptions(data?.data, "name", "id");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white h-[90vh] w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="border-b pb-8">
              <InputLabel label="Logo" />
              <ImageFileInput name="logo" />
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Organizer name" required />
                  <ControlledInputField
                    name="name"
                    placeholder="please enter your organizer name"
                    className="bg-white"
                  />
                </div>
                <div>
                  <InputLabel label="Contact email" />
                  <ControlledInputField
                    type="email"
                    name="contactEmail"
                    placeholder="Enter your contact email"
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Organizer type" required />
                  <ControlledSelectField
                    name="typeId"
                    placeholder="please enter your organizer type"
                    options={organizationOptions}
                  />
                </div>
                <div>
                  <InputLabel label="Phone" required />
                  <ControlledInputField
                    type="tel"
                    name="contactPhone"
                    placeholder="Enter your phone number"
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Address" />
                  <ControlledInputField
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    className="bg-white"
                  />
                </div>
                <div>
                  <InputLabel label="Description" />
                  <ControlledTextareaField
                    name="description"
                    placeholder="Enter your description"
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
            {errors?.length && (
              <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm mt-3">
                {errors && errors[0]}
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => {
                  methods.reset();
                  onClose();
                }}
                className="bg-transparent hover:bg-transparent text-darkLiver border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-dashboard-primary hover:bg-dashboard-primary text-white"
              >
                Create Organizations
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
