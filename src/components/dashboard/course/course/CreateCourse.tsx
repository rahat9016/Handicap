/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import { ICourse } from "@/components/main/training/types/traning";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import ControlledToggleField from "@/components/share/ControlledToggleField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePost } from "@/hooks/usePost";
import { useAppSelector } from "@/lib/redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resourcesSchema } from "./Schema/Course";

export default function CreateUpdateResources({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ICourse | undefined;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
  } = usePost(
    "/resources",
    (data) => {
      console.log("POST success", data);
    },
    [["resources"]]
  );

  const { organizationId } = useAppSelector((state) => state.organizer);
  // Initialize form methods
  const methods = useForm({
    resolver: yupResolver(resourcesSchema),
    defaultValues: {
      organizationId: organizationId || "",
      title: "",
      description: "",
      isPrivate: false,
    },
    mode: "onChange",
  });

  // Open the dialog when isOpen changes
  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        title: "",
        description: "",
        isPrivate: false,
        organizationId: "",
      });
      postReset();
    }
  }, [isOpen, methods, postReset]);
   
  const onSubmit = (data: any) => {
    console.log({ data });
    const formData = new FormData();

    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("languageId", data.languageId);
    formData.append("organizationId", organizationId);
    formData.append("isPrivate", data.isPrivate);

    if (data.file) {
      if (typeof data.file === "string") {
        // If file is URL string, send it as is
        formData.append("file", data.file);
      } else {
        // File object
        formData.append("file", data.file);
      }
    }

    if (!initialValues) {
      mutateAsync(formData).then(() => {
        toast.success("Resource created successfully");
        onClose();
        methods.reset();
      });
      return;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-h-[95vh]  w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Resources" : "Create Resources"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-6 mt-8">
              <div className="grid grid-cols-1 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Title" required />
                  <ControlledInputField
                    name="title"
                    placeholder="Please enter your title"
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <ControlledToggleField
                    name="isPrivate"
                    label="Private Resource"
                  />
                </div>
              </div>

              <ErrorMessage error={error} />
            </div>
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
