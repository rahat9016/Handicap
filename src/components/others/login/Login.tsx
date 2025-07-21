"use client";

import HeroSection from "@/components/share/HeroSection";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/navigation";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";


export default function Login() {
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate: login, isPending } = useAuth(() => {
        reset();
        router.push("/admin");
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        login(data);
    };

    // const onSubmit = (data: LoginFormData) => {
    //     alert(JSON.stringify(data));

    //     fetch(
    //         `http://localhost:3332/nest-b-auth/api/v1/auth/login`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //             body: JSON.stringify(data),
    //         }
    //     )
    //         .then((res) => {
    //             console.log("res", res);

    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log("data", data);
    //             if (data.success === true) {

    //                 reset();

    //             } else {

    //             }
    //         })
    // };

    return (
        <div>
            <HeroSection />
            <div style={{ backgroundImage: `url('/images/common/loginBg.png')` }} className="flex flex-col bg-contain bg-top bg-no-repeat py-20 px-4">
            <div className="w-full lg:w-4/12 mx-auto px-6 py-7 lg:px-8 bg-white shadow-xl rounded-md">
                <div className="flex flex-col items-center">
                    <Image width={97} height={43} src="/logo.png" alt="logo" />
                    <Title>Login To Your Account</Title>
                    <Paragraph>We’re glad to see you again</Paragraph>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <Label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email address
                            </Label>
                            <div className="mt-3">
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="Enter your valid email address here"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="error">{errors.email.message}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="block text-sm font-medium leading-6">
                                    Password
                                </Label>
                                <div className="text-sm">
                                    <Link href="/forgot-password" className="font-medium text-primary hover:text-accent/90">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-3">
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password here"
                                    required
                                    className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="error">{errors.password.message}</span>
                                )}
                            </div>
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
                        Don’t have an account?
                        and{" "}
                        <Link href="/privacy" className="font-medium text-accent hover:text-accent/90">
                            Sign Up Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}
