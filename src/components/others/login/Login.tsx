"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
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
        router.push("/dashboard");
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
        <div className="flex min-h-screen flex-col">
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground mb-8 hover:text-accent transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to home
                    </Link>
                    <div className="flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                            <span className="text-accent-foreground text-xl font-bold">P</span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Or{" "}
                        <Link href="/register" className="font-medium text-accent hover:text-accent/90">
                            create a new account
                        </Link>
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email address
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="name@example.com"
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
                                    <Link href="/forgot-password" className="font-medium text-accent hover:text-accent/90">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="error">{errors.password.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
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

                                {/* Sign in */}
                                {isPending ? "Loading..." : "Sign in"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Twitter className="mr-2 h-4 w-4" />
                                Twitter
                            </Button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-muted-foreground">
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="font-medium text-accent hover:text-accent/90">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="font-medium text-accent hover:text-accent/90">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
