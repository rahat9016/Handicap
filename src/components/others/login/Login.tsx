"use client";

import ControlledInputField from "@/components/share/ControlledInputField";
import HeroSection from "@/components/share/HeroSection";
import InputLabel from "@/components/share/InputLabel";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Link, useRouter } from "@/i18n/navigation";
import { setUserId } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { LoginFormData } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { LoginForm, userLoginSchema } from "./Schema/Login";
export default function Login() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm<LoginForm>({
    resolver: yupResolver(userLoginSchema),
  });

  const { mutateAsync: login, isPending } = useAuth(() => {
    router.push("/");
  });
  const callbackUrl = decodeURIComponent(
    searchParams.get("callbackUrl") || `/admin`
  );

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data)
      .then((res) => {
        console.log("Login successful:", res?.id);
        if(res?.id) {
          dispatch(setUserId(res?.id));
        }
        router.push(callbackUrl);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
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
            <Title>Login To Your Account</Title>
            <Paragraph>We’re glad to see you again</Paragraph>
          </div>
          <FormProvider {...methods}>
            <div>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <InputLabel label="Email" required />
                  <ControlledInputField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <div className="mt-3">
                    <InputLabel label="Password" required />
                    <ControlledInputField
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <Link
                    href="#"
                    className="font-medium text-primary mt-3 block text-right"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="flex items-center space-x-2 my-6">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full rounded-[--radius] bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {isPending ? "Loading..." : "Sign in"}
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="mt-6  gap-4">
                  <Button variant="outline" className="w-full">
                    Continue with Google
                  </Button>
                </div>
              </div>

              <p className="mt-10 text-center text-sm text-muted-foreground">
                Don’t have an account? and{" "}
                <Link href="/register" className="font-medium text-black">
                  Sign Up Now
                </Link>
              </p>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
