"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { logoutUser } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  BarChart3,
  Folder,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Upload,
  User2
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const menuItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      label: "Users",
      icon: User2,
      href: "/admin/users",
    },
    {
      label: "Content",
      icon: Upload,
      children: [
        { label: "Page Sections", href: "/admin/page-sections" },
        // { label: "Home Section", href: "/admin/organizer/organizer-mapped" },
      ],
    },
    {
      label: "Organization Manage",
      icon: Settings,
      children: [
        { label: "Organization mapped", href: "/admin/organizer/organizer-mapped" },
        { label: "All Organizations", href: "/admin/organizer/all-organization" },
      ],
    },
    {
      label: "Setup",
      icon: Settings,
      children: [
        { label: "Organization Type Setup", href: "/admin/setup/organization-type-setup" },
      ],
    },
    {
      label: "Resources",
      icon: Folder,
      children: [
        // { label: "Add Resources", href: "#" },
        { label: "All Resources", href: "/admin/resources" },
      ],
    },
    {
      label: "Training Management",
      icon: GraduationCap,
      children: [
        { label: "Add Training", href: "#" },
        { label: "All Trainings", href: "#" },
      ],
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      label: "Role Management",
      icon: ShieldCheck,
      children: [
        { label: "Add Role", href: "/admin/roles/create-roles" },
        { label: "All Roles", href: "/admin/roles/all-roles" },
      ],
    },
    {
      label: "System Settings",
      icon: Settings,
      href: "/settings",
    },
    {
      label: "Modules Management",
      icon: ShieldCheck,
      children: [
        { label: "Add Module", href: "/admin/modules/create-modules" },
      ],
    },
  ];

  const pathname = usePathname();
  return (
    <aside className="w-[300px] bg-white h-[90vh] border-r border-skeleton flex flex-col px-[22px] fixed top-0 overflow-y-auto py-6">
      <nav className="flex flex-col h-full">
        <div className="flex flex-col items-center  gap-3 mb-8">
          <Image width={109} height={48} src="/logo.png" alt="logo" />
          <div className="text-center">
            <h3 className="font-inter text-lg font-bold mb-1 text-erieBlack">
              Handicap International{" "}
            </h3>
            <p className="font-inter text-sm font-normal text-[#4D4D4D]">
              Disability Inclusion Hub
            </p>
          </div>
        </div>
        <Accordion
          type="multiple"
          className="w-full h-full flex  flex-col gap-1"
        >
          {menuItems.map((item) => {
            const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, '');
            const isActive = item.href === pathnameWithoutLocale;

            return (
              <AccordionItem
                key={item.label}
                value={item.label}
                className="border-b-0"
              >
                {item.children ? (
                  <>
                    <AccordionTrigger className="px-4 h-[46px] hover:no-underline text-[#8C8C8C] data-[state=open]:bg-dashboard-primary data-[state=open]:text-white leading-none">
                      <div className="flex items-center font-inter">
                        <item.icon className="mr-2 h-4 w-4  data-[state=open]:text-white flex items-center" />{" "}
                        {item.label}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`w-full h-[46px] flex items-center gap-2 px-4 text-sm hover:bg-[#EAF6FB] hover:text-dashboard-primary ${
                            isActive ? "bg-dashboard-primary text-white" : ""
                          } rounded-2xl font-inter text-[#8C8C8C]`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`w-full h-[46px] flex items-center gap-2 px-4 text-sm hover:bg-[#EAF6FB] hover:text-dashboard-primary ${
                      isActive ? "bg-dashboard-primary text-white" : ""
                    } rounded-md font-inter text-[#8C8C8C]`}
                  >
                    <item.icon className="h-4 w-4" /> {item.label}
                  </Link>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
        <Button onClick={() => dispatch(logoutUser())} className="w-full bg-[#F0F0F0] hover:bg-[#FDECEC] text-[#A8A8A8] hover:text-[#EB5757]  flex items-center justify-start gap-2 h-12 !px-4">
          <LogOut className="h-6 w-6" size={24} /> Logout
        </Button>
      </nav>
    </aside>
  );
}
