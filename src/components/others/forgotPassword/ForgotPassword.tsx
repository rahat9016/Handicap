/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/usePost";
import { Link, useRouter } from "@/i18n/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import yup from "yup";
import SignUpForm from "./ForgotPasswordForm";
import OtpVerifyForm from "./OtpVerifyForm";
import {
  ForgotPasswordForm,
  OTPForm,
  PasswordForm,
  forgotPasswordValidationSchemas,
} from "./Schema/forgotPassword";
import SetPassword from "./SetPassword";
type CombinedForm = ForgotPasswordForm & Partial<OTPForm & PasswordForm>;

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const methods = useForm<ForgotPasswordForm>({
    resolver: yupResolver(
      forgotPasswordValidationSchemas[step] as yup.ObjectSchema<any>
    ),
    mode: "onChange",
  });
  const {
    mutateAsync: forgotPassword,
    isPending,
    error,
  } = usePost("/auth/forgot-password");
  const {
    mutateAsync: verifyOTP,
    isPending: otpIsPending,
    error: otpError,
  } = usePost("/auth/verify-otp");
  const {
    mutateAsync: confirmPassword,
    isPending: IsConfirmPending,
    error: confirmError,
  } = usePost("/auth/reset-password");

  const { mutate: resendOTP } = usePost("/auth/resend-otp");
  console.log(methods.getValues());
  const onSubmit: SubmitHandler<CombinedForm> = (data: CombinedForm) => {
    console.log(data);
    if (step === 0) {
      forgotPassword(data as ForgotPasswordForm).then(() => {
        setStep(1);
      });
    } else if (step === 1) {
      const otpData: { otp: string; email: string } = {
        otp: data?.otp as string,
        email: data?.email as string,
      };
      verifyOTP(otpData).then(() => {
        toast.success("OTP verified successfully");
        setStep(2);
        // methods.reset();
      });
    } else {
      const confirmData: { otp: string; email: string; newPassword: string } = {
        otp: data?.otp as string,
        email: data?.email as string,
        newPassword: data?.password as string,
      };
      console.log(confirmData);
      confirmPassword(confirmData).then(() => {
        toast.success("Password changed successfully");
        router.push("/login");
        setStep(0);
        methods.reset();
      });
    }
  };

  const resendOTPHandler = () => {
    const email = methods.getValues("email");
    if (!email) {
      toast.error("Email is required to resend OTP");
      return;
    }
    if (email) {
      resendOTP({ email });
    }
  };

  const renderStepsContent = () => {
    switch (step) {
      case 0:
        return <SignUpForm />;
      case 1:
        return <OtpVerifyForm resendOTPHandler={resendOTPHandler} />;
      case 2:
        return <SetPassword />;
      default:
        return <SignUpForm />;
    }
  };

  return (
    <div>
      <div
        style={{ backgroundImage: `url('/images/common/loginBg.png')` }}
        className="flex flex-col bg-contain bg-top bg-no-repeat py-20 px-4 "
      >
        <div className="w-full lg:w-4/12 mx-auto px-6 py-7 lg:px-8 bg-white shadow-xl rounded-md border">
          <div className="flex flex-col items-center">
            <Image width={97} height={43} src="/logo.png" alt="logo" />
            <Title>
              {step === 0
                ? "Signup To Your Account"
                : step === 1
                ? "Verify your account by OTP"
                : "Set Your Password"}
            </Title>
            <Paragraph>
              {step === 0
                ? "We’re glad to see you again"
                : step === 1
                ? "Enter the OTP sent to your email"
                : "Confirm your new password"}
            </Paragraph>
          </div>

          <div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full "
              >
                {renderStepsContent()}
                <div className="mt-2">
                  <ErrorMessage error={error} />
                  <ErrorMessage error={otpError} />
                  <ErrorMessage error={confirmError} />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-dashboard-primary hover:bg-dashboard-primary text-white mt-4"
                  >
                    {isPending
                      ? "Loading..."
                      : otpIsPending
                      ? "Loading..."
                      : IsConfirmPending
                      ? "Loading..."
                      : step === 0
                      ? "Get OTP"
                      : step === 1
                      ? "Verified OTP"
                      : "Change Password"}
                  </Button>
                </div>
              </form>
            </FormProvider>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              do have an account? and{" "}
              <Link href="/login" className="font-medium text-black">
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
