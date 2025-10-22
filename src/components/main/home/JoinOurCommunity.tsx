"use client";

import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { usePost } from "@/hooks/usePost";
import { useEffect } from "react";

interface JoinFormType {
  email: string;
}

// ✅ Validation schema
const joinSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function JoinOurCommunity() {
  const t = useTranslations("Home");

  const { mutateAsync, isPending, reset } = usePost<JoinFormType>(
    "/community-join-requests",
    (data) => {
      console.log("Join success", data);
    }
  );
  // /handicap/api/v1/community-join-requests
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<JoinFormType>({
    resolver: yupResolver(joinSchema),
  });

  // ✅ Handle form submission
  const onSubmit = async (data: JoinFormType) => {
    try {
      await mutateAsync(data as unknown as Record<string, unknown>);

      toast.success("🎉 You’ve successfully joined our community!");
      resetForm();
    } catch (err) {
      // Extract API message safely
      let message = "❌ Failed to join community. Please try again.";

      if (err instanceof Error) {
        // standard JS error
        message = err.message;
      } else if (typeof err === "object" && err !== null) {
        // backend API-style error
        const apiError = err as { message?: string; errorMessages?: string };
        message =
          apiError.errorMessages ||
          apiError.message ||
          "❌ Failed to join community. Please try again.";
      }

      toast.error(message);
    }
  };

  // ✅ Reset state when component unmounts
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className="relative w-full bg-[#262D3D]">
      <div
        className="container bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/home/sentBg.png')` }}
      >
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            classTitle="text-white"
            classDesc="text-white"
            title={t("joinOurCommunity")}
            desc={t("communityMessage")}
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-7/12 mx-auto mt-[60px]"
          >
            <div className="flex items-center gap-3">
              <Input
                placeholder={t("enterEmail")}
                className={`border h-[46px] bg-white placeholder:text-[#B7B7B7] focus:border-[#7297FF] ${
                  errors.email ? "border-red-500" : "border-[#7297FF]"
                }`}
                {...register("email")}
              />
              <div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#2A53CD] text-white h-[46px] flex items-center font-inter text-sm font-medium px-6 disabled:opacity-70"
                >
                  {isPending ? t("joining") || "Joining..." : t("joinNow")}
                </Button>
              </div>
            </div>

            {/* Validation Error Message */}
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

            <p className="text-white text-sm font-inter font-normal mt-3">
              {t("privacyAgreement")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
