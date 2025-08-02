import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGet } from "@/hooks/useGet";
import { usePatch } from "@/hooks/usePatch";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "../../organizer/types";
import ControlledSelectField from "../../share/ControlledSelectField";
import { roleChange, RoleChangeForm } from "./Schema/Setup";
import { IRole } from "./types/Role";

export default function CreateUpdateRole({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IUser | undefined;
}) {
  const { data } = useGet<IRole[]>("/roles/SUPER_ADMIN", [
    "roles",
  ]);
  const { mutateAsync, error } = usePatch<IUser[]>(
    (data) => console.log("Success", data),
    [["user"]]
  );
  const methods = useForm<RoleChangeForm>({
    resolver: yupResolver(roleChange),
    defaultValues: {
      roleId: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        roleId: String(initialValues.roleId),
      });
    }
  }, [initialValues, methods]);

  const onSubmit = (data: { roleId: string }) => {
    const updateUserRole = {
      roleId: Number(data.roleId),
    };

    // Submit the form data
    mutateAsync({
      url: `/user/${initialValues?.id}/role`,
      data: updateUserRole,
    }).then(() => {
      console.log("User role updated successfully");
      toast.success("User role updated successfully");
      onClose();
      // Reset the form after successful submission
      methods.reset();
    });
  };

  const roleOptions = mapToSelectOptions(data?.data, "name", "id");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="User Role" required />
              <ControlledSelectField
                options={roleOptions}
                name="roleId"
                placeholder="Select role"
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
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
