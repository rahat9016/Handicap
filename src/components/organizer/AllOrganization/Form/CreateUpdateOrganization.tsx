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
import { IOrganizationResponse, IOrganizationTypes } from "../../types";
import {
  OrganizationFormType,
  organizationSchema
} from "../Schema/AddOrganizer";
import OrganizationForm from "./OrganizationForm";

export default function CreateUpdateOrganization({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IOrganizationResponse | undefined;
}) {
  const { data } = useGet<IOrganizationTypes[]>(
    "/organization-types/all",
    ["organizations"]
  );
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending
  } = usePost(
    "/organizations",
    (data) => {
      console.log("POST success", data);
    },
    [["organizations"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending
  } = usePatch<OrganizationFormType>(
    (data) => console.log("Success", data),
    [["organizations"]]
  );

  const methods = useForm<OrganizationFormType>({
    resolver: yupResolver(organizationSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        contactEmail: initialValues.contactEmail,
        contactPhone: initialValues.contactPhone,
        typeId: initialValues.type.id.toString(),
        address: initialValues.address,
        description: initialValues.description,
        logo: initialValues.logoUrl || "",
        isActive: Boolean(initialValues?.isActive),
      });
    }
  }, [initialValues, methods]);


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
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: OrganizationFormType) => {
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
    if(initialValues) formData.append("isActive", String(data.isActive));
    if (!initialValues) {
      mutateAsync(formData).then(() => {
        onClose();
        methods.reset();
      });
      return;
    }
    // If initialValues is provided, it means we are updating an existing organization
    patchAsync({
      url: `/organizations/${initialValues.id}`,
      data: formData,
    }).then(() => {
      console.log("Organization updated successfully");
      onClose();
      // Reset the form after successful submission
      methods.reset();
    });
  };

  const organizationOptions = mapToSelectOptions(data?.data, "name", "id");
  const isPending = isPostPending || isPatchPending;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-h-[95vh] w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Organization" : "Create Organization"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <OrganizationForm
            organizationOptions={organizationOptions}
            onSubmit={onSubmit}
            error={error}
            patchError={patchError}
            isPending={isPending}
            isEditMode={!!initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
