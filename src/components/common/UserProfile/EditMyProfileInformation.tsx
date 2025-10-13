"use client";
import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { IUserInformation } from "@/lib/redux/features/auth/authTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FileUploadController } from "./FileUploadController";
import { profileForm, profileSchema } from "./schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IUserInformation | null;
}

const EditMyProfileInformation = ({
  isOpen,
  onClose,
  initialValues,
}: Props) => {
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
  } = usePatch((data) => console.log("Success", data), [["user"]]);
  const methods = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
      });
    }
  }, [initialValues, reset]);

  useEffect(() => {
    if (!isOpen) {
      reset({
        ...initialValues,
      });
      patchReset();
    }
  }, [isOpen, reset, patchReset, initialValues]);

  const onSubmit = async (data: profileForm) => {
    console.log(data.profilePicture);
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone", data.phone);

    if (data.profilePicture instanceof File) {
      formData.append("profilePicture", data.profilePicture);
    } else if (typeof data.profilePicture === "string") {
      formData.append("profilePicture", data.profilePicture);
    }
    await patchAsync({
      url: `/user/profile/${initialValues?.id}`,
      data: formData,
    }).then(() => {
      toast.success("Contact information updated successfully");
      reset();
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[60vw] w-[60vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update My Profile Information</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FileUploadController name="profilePicture" />
            <div className="flex flex-col gap-3 mt-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="First Name" required />
                  <ControlledInputField
                    name="firstName"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <InputLabel label="Last Name" required />
                  <ControlledInputField
                    name="lastName"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 lg:gap-5">
                <div>
                  <InputLabel label="Phone" required />
                  <ControlledInputField
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
            <ErrorMessage error={patchError} />
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
};

export default EditMyProfileInformation;
