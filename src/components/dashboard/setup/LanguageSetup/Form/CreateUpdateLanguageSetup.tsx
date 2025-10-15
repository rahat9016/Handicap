import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { getChangedFields } from "@/utils/getChangedFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LanguageFormType, languageSchema } from "../../Schema/Setup";
import { ILanguage } from "../../types/setup";
import LanguageForm from "./LanguageForm";

export default function CreateUpdateLanguageSetup({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ILanguage | undefined;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost(
    "/languages",
    (data) => {
      console.log("POST success", data);
    },
    [["languages"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch<LanguageFormType>(
    (data) => console.log("Success", data),
    [["languages"]]
  );

  const methods = useForm<LanguageFormType>({
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
        isActive: initialValues.isActive,
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        code: "",
        name: "",
        nativeName: "",
        isActive: false,
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: LanguageFormType) => {
    if (!initialValues) {
      const { isActive: _isActive, ...postData } = data;
      mutateAsync(postData).then(() => {
        onClose();
        methods.reset();
        toast.success("Language created successfully");
      });
      return;
    }
    // If initialValues is provided, it means we are updating an existing language
    const newChangedData = getChangedFields(data, initialValues);
    patchAsync({
      url: `/languages/${initialValues.id}`,
      data: newChangedData,
    }).then(() => {
      onClose();
      methods.reset();
      toast.success("Language updated successfully");
    });
  };

  const isPending = isPostPending || isPatchPending;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Language" : "Create Language"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <LanguageForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={error || patchError}
            isPending={isPending}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
