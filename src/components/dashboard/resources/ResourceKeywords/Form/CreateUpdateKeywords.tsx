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
import { KeywordsForm, keywordsSchema } from "../Schema/Keywords";
import { IKeywords } from "../types/Keywords";
import KeywordForm from "./KeywordForm";

export default function CreateUpdateKeywords({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IKeywords | undefined;
}) {
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost<KeywordsForm>(
    "/resource-keywords",
    (data) => {
      console.log("POST success", data);
    },
    [["resource-keywords"]]
  );
  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch<KeywordsForm>(
    (data) => {
      console.log("PATCH success", data);
    },
    [["resource-keywords"]]
  );

  const methods = useForm<KeywordsForm>({
    resolver: yupResolver(keywordsSchema),
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
        name: initialValues?.name,
        isActive: initialValues?.isActive,
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        isActive: false,
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: KeywordsForm) => {
    const organizedData = {
      name: data.name,
    };
    if (initialValues) {
      const newChangedData = getChangedFields(data, initialValues);
      console.log(newChangedData);
      patchAsync({
        url: `/resource-keywords/${initialValues.id}`,
        data: newChangedData,
      }).then(() => {
        toast.success("Keyword updated successfully");
        onClose();
        methods.reset();
      });
      return;
    }
    // If initialValues is not provided, it means we are creating a new keyword
    mutateAsync(organizedData)
      .then(() => {
        toast.success("Keyword created successfully");
        onClose();
        methods.reset();
      })
      .catch((error) => {
        toast.error("Failed to create keyword");
        console.error(error);
      });
  };
  const isPending = isPostPending || isPatchPending;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Keywords" : "Create Keywords"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <KeywordForm
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
