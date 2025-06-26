"use client";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

export default function ContactForm() {
  const { isPending } = useMutation({
    // mutationFn: feedbackRequest,
    onSuccess: () => {},
  });
  const methods = useForm({
    // resolver: yupResolver(feedbackValidationSchema),
  });

  const onSubmit = () => {
    // mutateAsync(data)
    //   .then((res) => {
    //     if (res.success) {
    //       methods.reset();
    //       toast.success(res?.message, {
    //         position: "bottom-left",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error(error?.message, {
    //       position: "bottom-left",
    //     });
    //   });
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
              <div>
                <InputLabel label="First Name" required />
                <ControlledInputField
                  name="firstName"
                  placeholder="Enter your first name"
                  className="bg-white"
                />
              </div>
              <div>
                <InputLabel label="Last Name" />
                <ControlledInputField
                  name="lastName"
                  placeholder="Enter your last name"
                  className="bg-white"
                />
              </div>
            </div>
            <div>
              <InputLabel label="Organization" />
              <ControlledInputField
                type="text"
                name="organization"
                placeholder="Enter your organization name here"
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label="Email" />
              <ControlledInputField
                type="email"
                name="email"
                placeholder="Enter your valid email address here"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Subject" />
              <ControlledInputField
                name="subject"
                placeholder="Enter the subject of your message"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Message" />
              <ControlledTextareaField
                name="message"
                placeholder="Enter additional message"
                className="bg-white"
              />
            </div>
              <Button
                disabled={isPending}
                type="submit"
                className="capitalize bg-primary text-white rounded-lg px-6 lg:px-10 py-3 h-10 lg:h-11"
              >
                {isPending ? "Sending..." : "Send Message"}
              </Button>
              
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
