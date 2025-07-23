"use client";

import ControlledInputField from "@/components/share/ControlledInputField";
import HeroSection from "@/components/share/HeroSection";
import InputLabel from "@/components/share/InputLabel";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useRouter } from "@/i18n/navigation";
import { LoginFormData } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, SignupForm } from "./Schema/Signup";
export default function SignUp() {
  const router = useRouter();
  const methods = useForm<SignupForm>({
    resolver: yupResolver(registerSchema),
  });
  const { mutate: login, isPending } = useAuth(() => {
    methods.reset();
    router.push("/login");
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data);
  };

  return (
    <div>
      <HeroSection />
      <div
        style={{ backgroundImage: `url('/images/common/loginBg.png')` }}
        className="flex flex-col bg-contain bg-top bg-no-repeat py-20 px-4"
      >
        <div className="w-full lg:w-4/12 mx-auto px-6 py-7 lg:px-8 bg-white shadow-xl rounded-md">
          <div className="flex flex-col items-center">
            <Image width={97} height={43} src="/logo.png" alt="logo" />
            <Title>Signup To Your Account</Title>
            <Paragraph>We’re glad to see you again</Paragraph>
          </div>

          <div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full"
              >
                <div className="flex flex-col gap-6 mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                    <div>
                      <InputLabel label="First Name" required />
                      <ControlledInputField
                        name="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <InputLabel label="Last Name" required />
                      <ControlledInputField
                        name="lastName"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 lg:gap-5">
                    <div>
                      <InputLabel label="Email" required />
                      <ControlledInputField
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <InputLabel label="Phone" required />
                      <ControlledInputField
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <InputLabel label="Password" required />
                      <ControlledInputField
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-dashboard-primary hover:bg-dashboard-primary text-white mt-6"
                  >
                    {isPending ? "Loading..." : "Register"}
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
