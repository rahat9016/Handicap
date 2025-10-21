import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import { ControlledCheckField } from "@/components/share/ControlledCheckField";
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
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IPowerBi } from "./types/interface";
import { PowerBiForm, powerBiSchema } from "./Schema";


export default function CreateUpdatePowerBi({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IPowerBi | undefined;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
  } = usePost<PowerBiForm>(
    "/powerbi",
    (data) => {
      console.log("POST success", data);
    },
    [["powerbi"], ["power-bi-reports"]]
  );

  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
  } = usePatch(
    (data) => console.log("Success", data),
    [["powerbi"], ["power-bi-reports"]]
  );

  const methods = useForm<PowerBiForm>({
    resolver: yupResolver(powerBiSchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        title: initialValues.title,
        link: initialValues.link,
        description: initialValues.description,
        isActive: Boolean(initialValues?.isActive),
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        title: "",
        link: "",
        description: "",
        isActive: false,
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: PowerBiForm) => {
    const organizedData: {
      title: string;
      link: string;
      description?: string | undefined;
      isActive?: boolean;
    } = {
      title: data.title,
      link: data.link,
    };

    if (data.description) {
      organizedData.description = data.description;
    }

    // Include isActive for both create and update if needed
    if (initialValues || data.isActive !== undefined) {
      organizedData.isActive = data.isActive;
    }

    if (initialValues) {
      patchAsync({
        url: `/powerbi/${initialValues.id}`,
        data: organizedData,
      })
        .then(() => {
          toast.success("Power BI report updated successfully");
          onClose();
          methods.reset();
        })
        .catch((error) => {
          toast.error("Failed to update Power BI report");
          console.error(error);
        });
      return;
    }

    mutateAsync(organizedData)
      .then(() => {
        toast.success("Power BI report created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create Power BI report");
        console.error(error);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Power BI Report" : "Create Power BI Report"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Title" required />
              <ControlledInputField
                name="title"
                placeholder="Enter the report title..."
              />
            </div>

            <div className="mb-4">
              <InputLabel label="Power BI Link" required />
              <ControlledInputField
                name="link"
                placeholder="Enter the Power BI embed link..."
              />
            </div>

            <div className="mb-4">
              <InputLabel label="Description" />
              <ControlledTextareaField
                name="description"
                placeholder="Write down here the report description..."
              />
            </div>

            <div className="mb-4">
              <InputLabel label="Active/Deactivate" />
              <ControlledCheckField
                name="isActive"
                label="Active Report (Visible on website)"
              />
            </div>

            <ErrorMessage error={error} />
            <ErrorMessage error={patchError} />

            <div className="flex justify-end gap-3 mt-6">
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
