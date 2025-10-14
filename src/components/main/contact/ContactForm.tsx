"use client";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Contact");
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
              <div>
                <InputLabel label={t("firstName")} required />
                <ControlledInputField
                  name="firstName"
                  placeholder={t("enterFirstName")}
                  className="bg-white"
                />
              </div>
              <div>
                <InputLabel label={t("lastName")} />
                <ControlledInputField
                  name="lastName"
                  placeholder={t("enterLastName")}
                  className="bg-white"
                />
              </div>
            </div>
            <div>
              <InputLabel label={t("organization")} />
              <ControlledInputField
                type="text"
                name="organization"
                placeholder={t("organization_placeholder")}
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label={t("email_label")} />
              <ControlledInputField
                type="email"
                name="email"
                placeholder={t("email_placeholder")}
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label={t("subject_label")} />
              <ControlledInputField
                name="subject"
                placeholder={t("subject_placeholder")}
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label={t("message_label")} />
              <ControlledTextareaField
                name="message"
                placeholder={t("message_placeholder")}
                className="bg-white"
              />
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="capitalize bg-primary text-white rounded-lg px-6 lg:px-10 py-3 h-10 lg:h-11"
            >
              {isPending ?t('sending') : t('sendMessage')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
