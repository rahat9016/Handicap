"use client";
import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/usePost";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  ContactFormType,
  contactValidationSchema,
} from "./schema/ContactSchema";

export default function ContactForm() {
  const { mutateAsync, error, isPending } = usePost(
    "/contact-us",
    (data) => {
      console.log("POST success", data);
    },
    [["contact"]]
  );

  const methods = useForm<ContactFormType>({
    resolver: yupResolver(contactValidationSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      organization: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormType) => {
    mutateAsync(data)
      .then(() => {
        toast.success("Message sent successfully!");
        methods.reset();
      })
      .catch((error) => {
        console.error("Contact form error:", error);
        toast.error(error?.message || "Failed to send message");
      });
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
              <InputLabel label={t("email_label")} required />
              <ControlledInputField
                type="email"
                name="email"
                placeholder={t("email_placeholder")}
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label={t("subject_label")} required />
              <ControlledInputField
                name="subject"
                placeholder={t("subject_placeholder")}
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label={t("message_label")} required />
              <ControlledTextareaField
                name="message"
                placeholder={t("message_placeholder")}
                className="bg-white min-h-[120px]"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  {error.message || "Failed to send message. Please try again."}
                </p>
              </div>
            )}

            <Button
              disabled={isPending}
              type="submit"
              className="capitalize bg-primary text-white rounded-lg px-6 lg:px-10 py-3 h-10 lg:h-11 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              {isPending ? t("sending") : t("sendMessage")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
