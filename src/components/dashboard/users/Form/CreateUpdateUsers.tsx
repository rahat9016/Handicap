import { IUser } from "@/components/organizer/types";
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
import { roleChange, RoleChangeForm } from "../Schema/Setup";
import { IRole } from "../types/Role";
import UserRoleForm from "./UserRoleForm";

export default function CreateUpdateUser({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IUser | undefined;
}) {
  const { data } = useGet<IRole[]>("/roles/SUPER_ADMIN", ["roles"]);
  const { mutateAsync, isPending, error } = usePatch<IUser[]>(
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
    mutateAsync({
      url: `/user/${initialValues?.id}/role`,
      data: {
        roleId: Number(data.roleId),
      },
    }).then(() => {
      toast.success("User role updated successfully");
      onClose();
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
          <UserRoleForm
            roleOptions={roleOptions}
            onSubmit={onSubmit}
            error={error}
            isPending={isPending}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
