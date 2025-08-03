"use client";

import { IUser } from "@/components/organizer/types";
import ControlledInputField from "@/components/share/ControlledInputField";
import HeroSection from "@/components/share/HeroSection";
import InputLabel from "@/components/share/InputLabel";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useGet } from "@/hooks/useGet";
import { Link, useRouter } from "@/i18n/navigation";
import {
  setUserId,
  setUserInformation,
} from "@/lib/redux/features/auth/authSlice";
import { setPermission } from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { LoginFormData } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { LoginForm, userLoginSchema } from "./Schema/Login";
export default function Login() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const {
    userInformation: { id },
  } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const methods = useForm<LoginForm>({
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "12345678",
    },
  });

  const {
    mutateAsync: login,
    isPending,
    error,
  } = useAuth(() => {
    router.push("/");
  });
  const { data, isSuccess } = useGet<IUser>(
    `/user/${id}`,
    ["user", id || ""],
    undefined,
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
  const callbackUrl = decodeURIComponent(
    searchParams.get("callbackUrl") || `/admin`
  );

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data)
      .then((res) => {
        console.log("Login successful:", res?.id);
        console.log("res?.roleId === 1", res?.roleId === 1) 
        if (res?.id) {
          dispatch(setUserId(res.id));
          if (res?.roleId === 1) dispatch(setPermission(true));
          else dispatch(setPermission(false));
        }

        const destination =
          res?.parentRoleId === 2 ? "/organization-list" : callbackUrl;

        router.push(destination);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  
  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setUserInformation(data.data));
    }
  }, [isSuccess, data, dispatch]);

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
                {error && error?.errors && (
                  <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm mt-3">
                    {error?.errors[0]}
                  </div>
                )}
                <div>
                  <Button
                    type="submit"
                    className="w-full rounded-[--radius] bg-dashboard-primary text-white hover:bg-dashboard-primary hover:text-white mt-3"
                  >
                    {isPending ? "Loading..." : "Sign in"}
                  </Button>
                </div>
              </form>
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
