"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { logoutUser } from "@/lib/redux/features/auth/authSlice";
import { clearOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import {
  setAdminOrganizationPermission,
  setPermission,
} from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";
import {
  Building2,
  CalendarDays,
  Folder,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Newspaper,
  Settings,
  Shapes,
  ShieldCheck,
  Upload,
  User2,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({
  className,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { hasPermission } = useAppSelector((state) => state.permission);

  const pathname = usePathname();

  const menuItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    hasPermission && { label: "Users", icon: User2, href: "/admin/users" },
    hasPermission && {
      label: "Content",
      icon: Upload,
      children: [{ label: "Page Sections", href: "/admin/page-sections" }],
    },
    hasPermission && {
      label: "Organization Manage",
      icon: Building2,
      children: [
        {
          label: "Organization mapped",
          href: "/admin/organizer/organizer-mapped",
        },
        {
          label: "All Organizations",
          href: "/admin/organizer/all-organization",
        },
      ],
    },
    hasPermission && {
      label: "Setup",
      icon: Settings,
      children: [
        {
          label: "Organization Type Setup",
          href: "/admin/setup/organization-type-setup",
        },
        { label: "Language Setup", href: "/admin/setup/language-setup" },
      ],
    },
    {
      label: "Resources",
      icon: Folder,
      children: [
        { label: "Resources List", href: "/admin/resources/resources-list" },
        {
          label: "Resource Categories",
          href: "/admin/resources/resource-categories",
        },
        {
          label: "Resource Keywords",
          href: "/admin/resources/resource-keywords",
        },
      ],
    },
    hasPermission && {
      label: "News",
      icon: Newspaper,
      children: [
        { label: "News List", href: "/admin/news/news-list" },
        { label: "News Categories", href: "/admin/news/news-categories" },
        { label: "News Tags", href: "/admin/news/news-tags" },
      ],
    },
    hasPermission && {
      label: "Events",
      icon: CalendarDays,
      children: [
        { label: "Event List", href: "/admin/events/events-list" },
        { label: "Events Categories", href: "/admin/events/events-categories" },
        { label: "Events Tags", href: "/admin/events/events-tags" },
      ],
    },
    {
      label: "Course's",
      icon: Shapes,
      children: [
        { label: "Course List", href: "/admin/course/course-list" },
        { label: "Course Categories", href: "/admin/course/course-categories" },
      ],
    },
    hasPermission && {
      label: "Role Management",
      icon: ShieldCheck,
      children: [{ label: "All Roles", href: "/admin/roles/all-roles" }],
    },
  ].filter(Boolean) as Array<{
    label: string;
    icon: LucideIcon;
    href?: string;
    children?: { label: string; href: string }[];
  }>;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 min-h-screen w-[320px] xl:w-[350px] bg-white border-r border-skeleton flex flex-col px-[20px] py-6 transition-transform duration-300 ease-in-out z-50",
        {
          "-translate-x-full": !isOpen,
          "translate-x-0": isOpen,
          "lg:translate-x-0 lg:static": true,
        },
        className
      )}
    >
      <div
        onClick={() => router.push("/")}
        className="flex flex-col items-center gap-3 mb-4 cursor-pointer mt-20 xl:mt-0"
      >
        <Image width={109} height={48} src="/logo.png" alt="logo" />
        <div className="text-center">
          <h3 className="font-inter text-lg font-bold mb-1 text-erieBlack">
            Handicap International
          </h3>
          <p className="font-inter text-sm font-normal text-[#4D4D4D]">
            Disability Inclusion Resource Hub
          </p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto mt-3  custom-scrollbar">
        {/* Menu */}
        <Accordion
          type="multiple"
          className="flex flex-col h-full gap-1 w-full"
        >
          {menuItems.map((item) => {
            const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, "");
            const isActiveParent =
              item.href && pathnameWithoutLocale === item.href;
            const isActiveChild = item.children?.some(
              (child) => pathnameWithoutLocale === child.href
            );
            const isActive = isActiveParent || isActiveChild;

            return (
              <AccordionItem
                key={item.label}
                value={item.label}
                className="border-b-0"
              >
                {item.children ? (
                  <>
                    <AccordionTrigger
                      className={`px-4 h-[46px] flex items-left font-inter leading-none hover:no-underline ${
                        isActive
                          ? "bg-dashboard-primary text-white"
                          : "text-[#8C8C8C] hover:bg-[#EAF6FB] hover:text-dashboard-primary"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-2 h-4 w-4 ${
                            isActive ? "text-white" : ""
                          }`}
                        />
                        {item.label}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent
                      className={`flex flex-col w-full mt-1 ${
                        isActiveChild ? "block" : ""
                      }`}
                    >
                      {item.children.map((child) => {
                        const isChildActive =
                          pathnameWithoutLocale === child.href;
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsOpen(false)} // close on mobile
                            className={`w-full h-[46px] flex items-center gap-2 px-4 text-sm rounded-md font-inter pl-6 ${
                              isChildActive
                                ? "bg-dashboard-primary text-white"
                                : "text-[#8C8C8C] hover:bg-[#EAF6FB] hover:text-dashboard-primary"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    onClick={() => setIsOpen(false)}
                    className={`w-full h-[46px] flex items-center gap-2 px-4 text-sm rounded-md font-inter ${
                      isActive
                        ? "bg-dashboard-primary text-white"
                        : "text-[#8C8C8C] hover:bg-[#EAF6FB] hover:text-dashboard-primary"
                    }`}
                  >
                    <item.icon className="h-4 w-4" /> {item.label}
                  </Link>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </nav>
      <div className="px-6 pb-6">
        <Button
          onClick={() => {
            dispatch(logoutUser());
            dispatch(clearOrganization());
            dispatch(setPermission(false));
            dispatch(setAdminOrganizationPermission(false));
            setIsOpen(false);
          }}
          className="w-full bg-[#F0F0F0] hover:bg-[#FDECEC] text-[#A8A8A8] hover:text-[#EB5757] flex items-center justify-start gap-2 h-12 !px-4"
        >
          <LogOut className="h-6 w-6" size={24} /> Logout
        </Button>
      </div>
    </aside>
  );
}
