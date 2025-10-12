"use client";
import ErrorMessage from "@/components/common/Errors/ErrorMessage";
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
import { getChangedFields } from "@/utils/getChangedFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ContactInformationSchema, contactInfoSchema } from "./schema";
import { IContactInformation } from "./types/interface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IContactInformation & { id?: number };
}

const EditContactInformation = ({ isOpen, onClose, initialValues }: Props) => {
  const {
    mutateAsync: patchAsync,
    error: patchError,
    // reset: patchReset,
  } = usePatch(
    (data) => console.log("Success", data),
    [["contact-information"]]
  );
  const methods = useForm<ContactInformationSchema>({
    resolver: yupResolver(contactInfoSchema),
    mode: "onChange",
    defaultValues: {
      contacts: [{ name: "", designation: "" }],
      emails: [{ type: "", email: "" }],
      phones: [{ type: "", phone: "" }],
      addresses: [{ type: "", address: "" }],
      officeHours: "",
      facebookUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
      websiteUrl: "",
      mapEmbedUrl: "",
    },
  });
  const { control, reset, handleSubmit } = methods;

  useEffect(() => {
    if (isOpen && initialValues) {
      reset({
        contacts: initialValues.contacts?.length
          ? initialValues.contacts
          : [{ name: "", designation: "" }],
        emails: initialValues.emails?.length
          ? initialValues.emails
          : [{ type: "", email: "" }],
        phones: initialValues.phones?.length
          ? initialValues.phones
          : [{ type: "", phone: "" }],
        addresses: initialValues.addresses?.length
          ? initialValues.addresses
          : [{ type: "", address: "" }],
        officeHours: initialValues.officeHours || "",
        facebookUrl: initialValues.facebookUrl || "",
        twitterUrl: initialValues.twitterUrl || "",
        linkedinUrl: initialValues.linkedinUrl || "",
        websiteUrl: initialValues.websiteUrl || "",
        mapEmbedUrl: initialValues.mapEmbedUrl || "",
      });
    }
  }, [isOpen, initialValues, methods, reset]);

  const contactsArray = useFieldArray({ control, name: "contacts" });
  const emailsArray = useFieldArray({ control, name: "emails" });
  const phonesArray = useFieldArray({ control, name: "phones" });
  const addressesArray = useFieldArray({ control, name: "addresses" });

  const onSubmit = async (data: ContactInformationSchema) => {
    const changedData = getChangedFields<ContactInformationSchema>(
      data,
      initialValues
    );
    console.log(changedData);
    await patchAsync({
      url: `/contact-information`,
      data: changedData,
    });

    toast.success("Contact information updated successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Contact Information</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
            <div>
              <h3 className="font-semibold mb-2">Contacts</h3>
              {contactsArray.fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-3 mb-2 border p-3 rounded-lg relative"
                >
                  <button
                    type="button"
                    onClick={() => contactsArray.remove(idx)}
                    className="absolute top-0 right-0 bg-rose-300 text-rose-600 hover:text-red-600 z-20 "
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div>
                    <InputLabel label="Contact name" required />
                    <ControlledInputField
                      name={`contacts.${idx}.name`}
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <InputLabel label="Contact designation" required />
                    <ControlledInputField
                      name={`contacts.${idx}.designation`}
                      placeholder="Designation"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  contactsArray.append({ name: "", designation: "" })
                }
              >
                + Add Another Contact
              </Button>
            </div>

            {/* 🧩 Emails */}
            <div>
              <h3 className="font-semibold mb-2">Emails</h3>
              {emailsArray.fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-3 mb-2 border p-3 rounded-lg relative"
                >
                  <button
                    type="button"
                    onClick={() => emailsArray.remove(idx)}
                    className="absolute top-0 right-0 bg-rose-300 text-rose-600 hover:text-red-600 z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <ControlledInputField
                    name={`emails.${idx}.type`}
                    placeholder="Type (e.g., support)"
                  />
                  <ControlledInputField
                    name={`emails.${idx}.email`}
                    placeholder="Email"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => emailsArray.append({ type: "", email: "" })}
              >
                + Add Another Email
              </Button>
            </div>

            {/* 🧩 Phones */}
            <div>
              <h3 className="font-semibold mb-2">Phones</h3>
              {phonesArray.fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-3 mb-2 border p-3 rounded-lg relative"
                >
                  <button
                    type="button"
                    onClick={() => phonesArray.remove(idx)}
                    className="absolute top-0 right-0 bg-rose-300 text-rose-600 hover:text-red-600 z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <ControlledInputField
                    name={`phones.${idx}.type`}
                    placeholder="Type (e.g., main)"
                  />
                  <ControlledInputField
                    name={`phones.${idx}.phone`}
                    placeholder="Phone Number"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => phonesArray.append({ type: "", phone: "" })}
              >
                + Add Another Phone
              </Button>
            </div>

            {/* 🧩 Addresses */}
            <div>
              <h3 className="font-semibold mb-2">Addresses</h3>
              {addressesArray.fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-3 mb-2 border p-3 rounded-lg relative"
                >
                  <button
                    type="button"
                    onClick={() => addressesArray.remove(idx)}
                    className="absolute top-0 right-0 bg-rose-300 text-rose-600 hover:text-red-600 z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <ControlledInputField
                    name={`addresses.${idx}.type`}
                    placeholder="Type (e.g., head office)"
                  />
                  <ControlledTextareaField
                    name={`addresses.${idx}.address`}
                    placeholder="Address"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addressesArray.append({ type: "", address: "" })}
              >
                + Add Another Address
              </Button>
            </div>

            {/* 🕒 Office Hours */}
            <ControlledInputField
              name="officeHours"
              placeholder="Office Hours"
            />

            {/* 🌐 Social Links */}
            <div className="grid grid-cols-2 gap-4">
              <ControlledInputField
                name="facebookUrl"
                placeholder="Facebook URL"
              />
              <ControlledInputField
                name="twitterUrl"
                placeholder="Twitter URL"
              />
              <ControlledInputField
                name="linkedinUrl"
                placeholder="LinkedIn URL"
              />
              <ControlledInputField
                name="websiteUrl"
                placeholder="Website URL"
              />
              <ControlledTextareaField
                name="mapEmbedUrl"
                placeholder="Map Embed URL"
              />
            </div>
            <ErrorMessage error={patchError} />
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-dashboard-primary text-white">
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactInformation;
