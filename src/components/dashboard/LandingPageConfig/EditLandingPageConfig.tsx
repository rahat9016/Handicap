/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { schema } from "./schema";
import { ILandingPageStats, IStatField } from "./types/interface";

export default function EditLandingPageConfig({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues: ILandingPageStats | undefined;
}) {
  const { mutateAsync, isPending } = usePost(
    `/landing-page-config/upsert`,
    () => {
      toast.success("Landing page updated successfully");
      onClose();
    },
    [["landing-page-config"]]
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isOpen && initialValues) reset(initialValues);
  }, [isOpen, initialValues, reset]);

  const startItems = useCallback((): [string, IStatField][] => {
    if (!initialValues) return [];
    return Object.entries(initialValues)
      .filter(([key]) => key.startsWith("field"))
      .map(([key, value]) => [key, value as IStatField]);
  }, [initialValues]);

  const onSubmit = async (data: any) => {
    const payload = Object.keys(data)
      .filter((key) => key.startsWith("field"))
      .reduce((obj, key) => {
        obj[key] = data[key as keyof ILandingPageStats];
        return obj;
      }, {} as Record<string, IStatField>);
    console.log(payload);
    await mutateAsync({
      ...payload,
    }).then(() => {
      toast.success("landing page updated successfully");
      reset();
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[70vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Landing Page Statistics</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-3">
            {startItems().map(([key, field], idx) => (
              <div
                key={key}
                className="border p-4 rounded-lg bg-gray-50 space-y-3"
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  {field.title.en || `Field ${idx + 1}`}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <InputLabel label="Title (English)" required />
                    <ControlledInputField
                      name={`${key}.title.en`}
                      placeholder="Enter English title"
                    />
                  </div>
                  <div>
                    <InputLabel label="Title (Bangla)" required />
                    <ControlledInputField
                      name={`${key}.title.bn`}
                      placeholder="Enter Bangla title"
                    />
                  </div>
                  <div>
                    <InputLabel label="Value (English)" required />
                    <ControlledInputField
                      name={`${key}.value.en`}
                      placeholder="Enter English value"
                    />
                  </div>
                  <div>
                    <InputLabel label="Value (Bangla)" required />
                    <ControlledInputField
                      name={`${key}.value.bn`}
                      placeholder="Enter Bangla value"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
