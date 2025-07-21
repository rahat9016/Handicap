"use client";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/usePost";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import { OrganizationForm, organizationSchema } from "../schema/AddOrganizer";

export default function AddOrganizer() {
  const { mutateAsync } = usePost("/organizations", (data) => {
          console.log("User Created:", data);
      });
  const methods = useForm<OrganizationForm>({
    resolver: yupResolver(organizationSchema)
  });
  const onSubmit = (data: OrganizationForm) => {
    mutateAsync({...data, code: data.name.toLowerCase().replace(/\s+/g, '-')});
  };
  return (
    <div className="bg-white min-h-[80vh] p-8">
      <div className="w-9/12">
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          {/* <ImageFileInput name="logo" /> */}
          <div className="flex flex-col gap-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
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
          <Button>Cancel</Button>
          <Button type="submit">Create Organizations</Button>
        </form>
      </FormProvider>
      </div>
    </div>
  );
}
