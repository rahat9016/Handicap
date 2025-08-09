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
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { KeywordsForm, keywordsSchema } from "./Schema/Keywords";
import { IKeywords } from "./types/Keywords";


export default function CreateUpdateKeywords({
  isOpen,
  onClose,
}: // initialValues,
{
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IKeywords | undefined;
}) {

  const { mutateAsync, error } = usePost<KeywordsForm>(
    "/resource-keywords",
    (data) => {
      console.log("POST success", data);
    },
    [["resource-keywords"], ["categories"]]
  );

  const methods = useForm<KeywordsForm>({
    resolver: yupResolver(keywordsSchema),
  });

  const onSubmit = (data: KeywordsForm) => {
    mutateAsync(data)
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
          <DialogTitle>Create Category</DialogTitle>
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
            {error?.errors?.length && (
              <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
                {error?.errors && error?.errors[0]}
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="submit"
                className="bg-dashboard-primary hover:bg-dashboard-primary text-white"
              >
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
