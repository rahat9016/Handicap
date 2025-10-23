import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StakeholderFormType, stakeholderSchema } from "../Schema/Stakeholder";
import { IStakeholder } from "../types/stakeholders";
import StakeholderForm from "./StakeholderForm";

export default function CreateUpdateStakeholders({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IStakeholder | undefined;
}) {
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch((data) => console.log("Success", data), [["Stakeholders"]]);

  const methods = useForm({
    resolver: yupResolver(stakeholderSchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        file: initialValues.link,
        description: initialValues?.description,
        isActive: initialValues.isActive,
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        ...initialValues,
      });
      patchReset();
    }
  }, [initialValues, isOpen, methods, patchReset]);

  const onSubmit = (data: StakeholderFormType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (initialValues) formData.append("isActive", String(data.isActive));
    if (data.file instanceof File) formData.append("file", data.file);

    if (initialValues) {
      patchAsync({
        url: `/stakeholders/${initialValues.id}`,
        data: formData,
      }).then(() => {
        onClose();
        methods.reset();
        toast.success("Stakeholder updated successfully");
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Stakeholder" : "Create Stakeholder"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <StakeholderForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={patchError}
            isPending={isPatchPending}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
