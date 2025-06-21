/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { ArrowRight, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen flex-col">
            <header className="sticky container top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-primary">Next-Auth-V1</span>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href="#features"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#about"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            About
                        </Link>
                        <Link
                            href="#contact"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </Link>
                        {/* <Link href="/signup">
                            <Button size="sm">Sign up</Button>
                        </Link> */}
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Your Project Title
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        A brief description of your project. Explain what problems it solves and why users should care about
                                        it.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link href="/signup">
                                        <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8">
                                            Get Started
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href="/docs">
                                        <Button variant="outline" className="inline-flex h-10 items-center justify-center rounded-md px-8">
                                            Documentation
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-2">
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                        <p className="text-lg font-medium">Your App Screenshot Here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to get started?</h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                                Join thousands of satisfied users today.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <div className="flex justify-center space-x-2">
                                <Link href="/signup">
                                    <Button className="w-full sm:w-auto">Sign Up Now</Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Contact Sales
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full border-t bg-background py-6">
                <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com" target="_blank" rel="noreferrer">
                            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                            <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

