"use client";

import ErrorMessage from "@/components/common/Errors/ErrorMessage";
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
import {
  setAdminOrganizationPermission,
  setPermission,
} from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { LoginFormData } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { LoginForm, userLoginSchema } from "./Schema/Login";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
      password: "",
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
  const rawCallback = searchParams.get("callbackUrl");
  const callbackUrl = rawCallback ? decodeURIComponent(rawCallback) : "/";

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data)
      .then((res) => {
        if (res?.id) {
          dispatch(setUserId(res.id));
          if (res?.roleId === 1) dispatch(setPermission(true));
          else if (res?.roleId === 2)
            dispatch(setAdminOrganizationPermission(true));
          else dispatch(setPermission(false));
        }
        let destination = callbackUrl;

        if (res?.role === "USER") {
          // ✅ Send USER to user dashboard
          destination = "/user-dashboard";
        } else if (res?.parentRoleId === 2) {
          console.log("call 4");
          destination = "/organization-list";
        } else if (res?.parentRoleId === null) {
          destination = callbackUrl;
        } else if (!rawCallback) {
          destination = "/admin";
        }

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
        <div className="w-full lg:w-4/12 mx-auto px-6 py-7 lg:px-8 bg-white shadow-md rounded-md border">
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
                    <div className="relative">
                      <ControlledInputField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-black"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary mt-3 block text-right font-inter"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2">
                  <ErrorMessage error={error} />
                </div>
                <div>
                  <Button
                    disabled={isPending}
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
