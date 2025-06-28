"use client";
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaUserCog } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { logout } from "@/services/auth.service";

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <LuLayoutDashboard className="text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Admin",
            href: "/admin",
            icon: (
                <LuLayoutDashboard className="text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "User",
            href: "/users",
            icon: (
                <FaUserCog className=" text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },

    ];

    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row w-full h-screen flex-1  ",
                ""
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                            <div>
                                <button
                                    onClick={() => logout()}
                                    className="flex gap-2 text-white hover:text-red-700 mt-1 py-2 rounded-md transition-all"
                                >
                                    <BiLogOutCircle className="h-5 w-5" />
                                    {open && <span className="text-sm">Logout</span>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <SidebarLink
                            link={{
                                label: "Mahfuz Islam",
                                href: "#",
                                icon: (
                                    <Image
                                        src={"/images/sidebar/mahfuz.JPG"}
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1">
                <div className="p-2 md:p-10 rounded-tl-2xl border border-Tertiary bg-bg flex flex-col gap-2 flex-1 w-full h-full overflow-hidden overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm  py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-white whitespace-pre"
            >
                Dashboard
            </motion.span>
        </Link>
    );
};
const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm  py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};
