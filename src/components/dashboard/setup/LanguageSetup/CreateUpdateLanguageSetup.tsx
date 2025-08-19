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
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageForm, languageSchema } from "../Schema/Setup";
import { ILanguage } from "../types/setup";

export default function CreateUpdateLanguageSetup({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ILanguage | undefined;
}) {
  const { mutateAsync, error, reset: postReset } = usePost(
    "/languages",
    (data) => {
      console.log("POST success", data);
    },
    [["languages"]]
  );
  const { mutateAsync: patchAsync, error: patchError, reset: patchReset } = usePatch<LanguageForm>(
    (data) => console.log("Success", data),
    [["languages"]]
  );

  const methods = useForm<LanguageForm>({
    resolver: yupResolver(languageSchema),
    defaultValues: {
      code: "",
      name: "",
      nativeName: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        code: initialValues.code,
        name: initialValues.name,
        nativeName: initialValues.nativeName,
      });
    }
  }, [initialValues, methods]);

  // Open the dialog when isOpen changes
  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        code: "",
        name: "",
        nativeName: "",
      });
      postReset()
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: LanguageForm) => {
    if (!initialValues) {
      mutateAsync(data).then(() => {
        console.log("Language created successfully");
        onClose();
        // Reset the form after successful submission
        methods.reset();
      });
      return;
    }
    // If initialValues is provided, it means we are updating an existing language
    patchAsync({
      url: `/languages/${initialValues.id}`,
      data,
    }).then(() => {
      console.log("Language updated successfully");
      onClose();
      // Reset the form after successful submission
      methods.reset();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Language" : "Create Language"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Code" required />
              <ControlledInputField
                name="code"
                placeholder="Write here code eg. en,bn "
              />
            </div>
            <div className="mb-4">
              <InputLabel label="Name" required />
              <ControlledInputField
                name="name"
                placeholder="Enter name of language"
              />
            </div>
            <div className="mb-4">
              <InputLabel label="Native Name" required />
              <ControlledInputField
                name="nativeName"
                placeholder="Enter native name of language"
              />
            </div>
            {error?.errors?.length ||
              (patchError?.errors?.length && (
                <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
                  {error?.errors && error?.errors[0]}
                  {patchError?.errors && patchError?.errors[0]}
                </div>
              ))}
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
