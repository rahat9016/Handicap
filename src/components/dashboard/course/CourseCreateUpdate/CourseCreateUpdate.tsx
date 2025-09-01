"use client";
import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledSelectField from "@/components/share/ControlledSelectField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { useAppSelector } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FileUploadController } from "../../resources/resources/FileUploadController";
import { ICategory } from "../CourseCategories/types/Categories";
import {
    courseInformationSchema,
    resourcesInformationUpdateForm,
} from "./Schema/Course";

export default function CourseCreateUpdate() {
  const { data } = useGet<ICategory[]>("/course-category", ["course-category"]);
  const { mutateAsync, error } = usePost(
    "/course",
    (data) => {
      console.log("POST success", data);
    },
    [["courseList"]]
  );
  const { organizationId } = useAppSelector((state) => state.organizer);
  const methods = useForm({
    resolver: yupResolver(courseInformationSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const onSubmit = (data: resourcesInformationUpdateForm) => {
    console.log({ data });
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId);
    formData.append("organizationId", organizationId);
    if (data.description) formData.append("description", data.description);
    if (data.objectives) formData.append("objectives", data.objectives);
    if (data.thumbNail instanceof File) {
      formData.append("thumbNail", data.thumbNail);
    } else if (
      typeof data.thumbNail === "string" &&
      data.thumbNail.trim() !== ""
    ) {
      formData.append("thumbNail", data.thumbNail);
    }

    mutateAsync(formData).then(() => {
      toast.success("Course created successfully");
      methods.reset();
    });
  };

  const categoryOptions = mapToSelectOptions(data?.data, "name", "id");
  return (
    <div className="bg-white p-7 border rounded-lg min-h-[80vh]">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-6">
              <FileUploadController name={`thumbNail`} className="h-[224px] w-full" />
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
            <div className="grid grid-cols-1 gap-3 lg:gap-5">
              <div>
                <InputLabel label="Objectives" />
                <ControlledTextareaField
                  name="objectives"
                  placeholder="Enter your objectives"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
              <div>
                <InputLabel label="Category" required />
                <ControlledSelectField
                  name="categoryId"
                  placeholder="Please enter your category"
                  options={categoryOptions}
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
              Create
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
