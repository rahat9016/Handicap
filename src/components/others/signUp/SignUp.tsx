/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
import HeroSection from "@/components/share/HeroSection";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/usePost";
import { Link, useRouter } from "@/i18n/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import yup from "yup";
import OtpVerifyForm from "./OtpVerifyForm";
import { OTPForm, SignupForm, signupValidationSchemas } from "./Schema/Signup";
import SignUpForm from "./SignUpForm";
type CombinedForm = SignupForm & Partial<OTPForm>;

export default function SignUp() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const methods = useForm<SignupForm>({
    resolver: yupResolver(
      signupValidationSchemas[step] as yup.ObjectSchema<any>
    ),
    mode: "onChange",
  });
  const { mutateAsync: signup, isPending, error } = usePost("/auth/register");
  const {
    mutateAsync: verifyOTP,
    isPending: otpIsPending,
    error: otpError,
  } = usePost("/auth/verify-user");

  const { mutate: resendOTP } = usePost("/auth/resend-otp-verify-user");
  const onSubmit: SubmitHandler<CombinedForm> = (data: CombinedForm) => {
    console.log(data);
    if (step === 0) {
      signup(data as SignupForm).then(() => {
        setStep(1);
      });
    } else {
      const otpData: OTPForm = {
        email: data.email,
        otp: data?.otp as string,
      };
      verifyOTP(otpData).then(() => {
        toast.success("OTP verified successfully");
        router.push("/login");
        setStep(0);
        methods.reset();
      });
    }
  };

  const resendOTPHandler = async () => {
    const email = methods.getValues("email");

    if (!email) {
      toast.error("Email is required to resend OTP");
      return false;
    }

    return new Promise<boolean>((resolve) => {
      resendOTP(
        { email },
        {
          onSuccess: () => {
            toast.success("OTP sent successfully!");
            resolve(true);
          },
          onError: (error: any) => {
            toast.error(error?.message || "Failed to resend OTP");
            resolve(false);
          },
        }
      );
    });
  };

  const renderStepsContent = () => {
    switch (step) {
      case 0:
        return <SignUpForm />;
      case 1:
        return <OtpVerifyForm resendOTPHandler={resendOTPHandler} />;
      default:
        return <SignUpForm />;
    }
  };

  return (
    <div>
      <HeroSection />
      <div
        style={{ backgroundImage: `url('/images/common/loginBg.png')` }}
        className="flex flex-col bg-contain bg-top bg-no-repeat py-10 px-4"
      >
        <div className="w-full lg:w-4/12 mx-auto px-6 py-7 lg:px-8 bg-white shadow-xl rounded-md border">
          <div className="flex flex-col items-center">
            {/* <Image width={97} height={43} src="/logo.png" alt="logo" /> */}
            <Title>
              {step === 0
                ? "Signup To Your Account"
                : "Verify your account by OTP"}
            </Title>
            <Paragraph>
              {step === 0
                ? "We’re glad to see you again"
                : "Enter the OTP sent to your email"}
            </Paragraph>
          </div>

          <div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full"
              >
                {renderStepsContent()}
                <div className="mt-2">
                  <ErrorMessage error={error || otpError} />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-dashboard-primary hover:bg-dashboard-primary text-white mt-6"
                  >
                    {isPending
                      ? "Loading..."
                      : otpIsPending
                      ? "Loading..."
                      : step === 0
                      ? "Register"
                      : "Verified OTP"}
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
