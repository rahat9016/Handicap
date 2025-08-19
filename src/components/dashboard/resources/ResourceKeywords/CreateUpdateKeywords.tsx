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
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { KeywordsForm, keywordsSchema } from "./Schema/Keywords";
import { IKeywords } from "./types/Keywords";

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
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, patchReset, postReset]);

  const onSubmit = (data: KeywordsForm) => {
    const organizedData = {
      name: data.name
    }

    if (initialValues) {
      patchAsync({
        url: `/resource-keywords/${initialValues.id}`,
        data: organizedData,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialValues ? "Update Keywords" : "Create Keywords"}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <InputLabel label="Name" required />
              <ControlledInputField
                name="name"
                placeholder="Enter the category name..."
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
