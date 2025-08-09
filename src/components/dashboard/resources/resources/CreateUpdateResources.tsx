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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IResource } from "../types/types";


export default function CreateUpdateResources({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IResource | undefined;
}) {
  // const { data } = useGet<IOrganizationTypes[]>(
  //   "/organization-types/all?isActive=true",
  //   ["organizations"]
  // );
  // const {
  //   mutateAsync,
  //   error,
  //   reset: postReset,
  // } = usePost(
  //   "/organizations",
  //   (data) => {
  //     console.log("POST success", data);
  //   },
  //   [["organizations"]]
  // );
  // const {
  //   mutateAsync: patchAsync,
  //   error: patchError,
  //   reset: patchReset,
  // } = usePatch<OrganizationForm>(
  //   (data) => console.log("Success", data),
  //   [["languages"]]
  // );

  const methods = useForm({
    // resolver: yupResolver(organizationSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        // name: initialValues.name,
        // contactEmail: initialValues.contactEmail,
        // contactPhone: initialValues.contactPhone,
        // typeId: initialValues.type.id.toString(),
        // address: initialValues.address,
        // description: initialValues.description,
        // logo: initialValues.logoUrl || "",
      });
    }
  }, [initialValues, methods]);

  console.log(initialValues)
  // Open the dialog when isOpen changes
  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        contactEmail: "",
        contactPhone: "",
        typeId: "",
        address: "",
        description: "",
        logo: "",
      });
      // postReset();
      // patchReset();
    }
  }, [isOpen, methods]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const formData = new FormData();
    // Append required fields
    formData.append("name", data.name);
    formData.append("contactPhone", data.contactPhone || "");
    formData.append("typeId", data.typeId);

    formData.append(
        "code",
        data.name.toLowerCase().replace(/\s+/g, "-") + data.typeId
      );

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
    // if (!initialValues) {
    //   mutateAsync(formData).then(() => {
    //     onClose();
    //     methods.reset();
    //   });
    //   return;
    // }
    // // If initialValues is provided, it means we are updating an existing organization
    // patchAsync({
    //   url: `/organizations/${initialValues.id}`,
    //   data: formData,
    // }).then(() => {
    //   console.log("Organization updated successfully");
    //   onClose();
    //   // Reset the form after successful submission
    //   methods.reset();
    // });
  };

  // const organizationOptions = mapToSelectOptions(data?.data, "name", "id");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-h-[95vh]  w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Organization" : "Create Organization"}
          </DialogTitle>
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
                    options={[]}
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
            {/* {error?.errors && (
              <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter capitalize text-sm mt-3">
                {error?.errors[0]}
              </div>
            )}
            {patchError?.errors && (
              <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter capitalize text-sm mt-3">
                {patchError?.errors[0]}
              </div>
            )} */}

            <div className="flex justify-end gap-3 mt-4">
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
