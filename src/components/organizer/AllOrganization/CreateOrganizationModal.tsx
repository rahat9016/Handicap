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
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { OrganizationForm, organizationSchema } from "../schema/AddOrganizer";

export default function CreateOrganizationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutateAsync } = usePost(
    "/organizations",
    (data) => {
      console.log("POST success", data);
    },
    [["organizations"]]
  );
  const methods = useForm<OrganizationForm>({
    resolver: yupResolver(organizationSchema),
  });

  const onSubmit = (data: OrganizationForm) => {
    const formData = new FormData();

    // Append required fields
    formData.append("name", data.name);
    formData.append("contactPhone", data.contactPhone || "");
    formData.append("type", data.type);
    formData.append("code", data.name.toLowerCase().replace(/\s+/g, "-"));

    // Append optional fields only if they are provided
    if (data.contactEmail) formData.append("contactEmail", data.contactEmail);
    if (data.address) formData.append("address", data.address || "");
    if (data.description)
      formData.append("description", data.description || "");
    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    } else if (typeof data.logo === "string" && data.logo.trim() !== "") {
      formData.append("logo", data.logo);
    }

    // Submit the form data
    mutateAsync(formData).then(() => {
      console.log("Organization created successfully");
      toast.success("Organization created successfully");
      onClose();
      // Reset the form after successful submission
      methods.reset();
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white h-[90vh] w-[80vw] overflow-y-auto">
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
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-5">
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
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Organizer type" required />
                  <ControlledSelectField
                    name="type"
                    placeholder="please enter your organizer type"
                    options={[
                      { label: "NGO", value: "NGO" },
                      { label: "UN Agency", value: "UN_AGENCY" },
                      { label: "Government", value: "GOVERNMENT" },
                      { label: "Other", value: "OTHER" },
                    ]}
                  />
                </div>
                <div>
                  <InputLabel label="Phone" />
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
            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={methods.reset}
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
