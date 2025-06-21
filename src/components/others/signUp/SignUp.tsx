import Link from "next/link"
import { ArrowLeft, Github, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Register() {
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
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">Create a new account</h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-accent hover:text-accent/90">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="first-name" className="block text-sm font-medium leading-6">
                                    First name
                                </Label>
                                <div className="mt-2">
                                    <Input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="last-name" className="block text-sm font-medium leading-6">
                                    Last name
                                </Label>
                                <div className="mt-2">
                                    <Input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email address
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium leading-6">
                                Password
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" required />
                            <Label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the{" "}
                                <Link href="/terms" className="font-medium text-accent hover:text-accent/90">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="font-medium text-accent hover:text-accent/90">
                                    Privacy Policy
                                </Link>
                            </Label>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full rounded-[--radius] bg-accent text-accent-foreground hover:bg-accent/90"
                            >
                                Create account
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
                </div>
            </div>
        </div>
    )
}

