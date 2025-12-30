import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  IOrganization,
  IRole,
  IUser,
  UserOrganizationAssignment,
} from "../../types";
import {
  OrganizerUserRoleForm,
  OrganizerUserRoleSchema,
} from "../Schema/AddOrganizerMapped";
import UserRoleMappedForm from "./UserRoleMappedForm";

export default function CreateUpdateOrganizerMappedModal({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues: UserOrganizationAssignment | undefined;
}) {
  const { data: userData } = useGet<IUser[]>(`/user/users-for-organizations`, [
    "users-for-organizations",
  ]);
  const { data: organizationData } = useGet<IOrganization[]>(
    `/organizations?isActive=true`,
    ["organizations"]
  );
  const { data: roleData } = useGet<IRole[]>(`/roles/ADMIN`, ["roles"]);

  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending,
  } = usePost<IUser[]>(
    "/user-organization-role",
    (data) => {
      console.log("POST success", data);
    },
    [["user-organization-role"]]
  );
  const methods = useForm<OrganizerUserRoleForm>({
    resolver: yupResolver(OrganizerUserRoleSchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
        organizationId: initialValues.organizationId.toString(),
        userId: initialValues.userId.toString(),
        roleId: initialValues.roleId.toString(),
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        organizationId: "",
        userId: "",
        roleId: "",
      });
    }
    postReset();
  }, [isOpen, methods, postReset]);

  const onSubmit = (data: OrganizerUserRoleForm) => {
    const formattedData = {
      organizationId: Number(data.organizationId),
      userId: Number(data.userId),
      roleId: Number(data.roleId),
    };

    mutateAsync(formattedData).then(() => {
      console.log("User role created successfully");
      toast.success("User role created successfully");
      onClose();
      methods.reset();
    });
  };

  const organizationOptions = mapToSelectOptions(
    organizationData?.data,
    "name",
    "id"
  );
  const userOptions = mapToSelectOptions(userData?.data, "email", "id");
  const roleOptions = mapToSelectOptions(roleData?.data, "name", "id");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[50vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update User Role" : "Create User Role"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <UserRoleMappedForm
            organizationOptions={organizationOptions}
            userOptions={userOptions}
            roleOptions={roleOptions}
            onSubmit={onSubmit}
            error={error}
            isPending={isPending}
            isEditMode={!!initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
