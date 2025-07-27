import ControlledSelectField from "@/components/share/ControlledSelectField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
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
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserRoleForm, userRoleSchema } from "../schema/AddOrganizer";
import { IOrganization, IRole, IUser } from "../types";

export default function CreateOrganizerMappedModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: userData } = useGet<IUser[]>(`/user`, ["user"]);
  const { data: organizationData } = useGet<IOrganization[]>(`/organizations`, [
    "organizations",
  ]);
  const { data: roleData } = useGet<IRole[]>(`/roles`, ["roles"]);

  const { mutateAsync, error } = usePost<IUser[]>(
    "/user-organization-role",
    (data) => {
      console.log("POST success", data);
    },
    [["user-organization-role"]]
  );
  const methods = useForm<UserRoleForm>({
    resolver: yupResolver(userRoleSchema),
  });

  const onSubmit = (data: UserRoleForm) => {
    const formattedData = {
      organizationId: Number(data.organizationId),
      userId: Number(data.userId),
      roleId: Number(data.roleId),
    };
    // Submit the form data
    mutateAsync(formattedData).then(() => {
      console.log("User role created successfully");
      toast.success("User role created successfully");
      onClose();
      // Reset the form after successful submission
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
          <DialogTitle>Create User Role</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Organizations" required />
              <ControlledSelectField
                name="organizationId"
                placeholder="Select an organization"
                options={organizationOptions}
              />
            </div>
            <div className="mb-4">
              <InputLabel label="User" required />
              <ControlledSelectField
                name="userId"
                placeholder="Select a user"
                options={userOptions}
              />
            </div>
            <div className="mb-4">
              <InputLabel label="Role" required />
              <ControlledSelectField
                name="roleId"
                placeholder="Select a role"
                options={roleOptions}
              />
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
