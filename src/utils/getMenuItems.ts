import {
  Activity,
  BadgeInfo,
  Building2,
  CalendarDays,
  Folder,
  LayoutDashboard,
  LucideIcon,
  Newspaper,
  Settings,
  Shapes,
  ShieldCheck,
  Upload,
  User2,
} from "lucide-react";
import { FaQuestion } from "react-icons/fa";
import { PiChats } from "react-icons/pi";
import { UserRole } from "./UserRoleEnum";

export interface MenuItem {
  label: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  href?: string;
  children?: { label: string; href: string }[];
}

export function getMenuItems(
  hasPermission: boolean,
  role: UserRole | null
): MenuItem[] {
  if (role === UserRole.USER) {
    return [
      { label: "Dashboard", icon: LayoutDashboard, href: "/user-dashboard" },
      { label: "My Courses", icon: Shapes, href: "/user-dashboard/my-courses" },
      {
        label: "Certifications",
        icon: Folder,
        href: "/user-dashboard/certifications",
      },
    ];
  }
  const menuItems: (MenuItem | false)[] = [
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
    {
      label: "Events",
      icon: CalendarDays,
      children: hasPermission
        ? [
            { label: "Event List", href: "/admin/events/events-list" },
            {
              label: "Events Categories",
              href: "/admin/events/events-categories",
            },
            { label: "Events Tags", href: "/admin/events/events-tags" },
          ]
        : [{ label: "Event List", href: "/admin/events/events-list" }],
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
    hasPermission && {
      label: "Contacts",
      icon: PiChats,
      href: "/admin/contacts",
    },
    hasPermission && {
      label: "Contact Information",
      icon: BadgeInfo,
      href: "/admin/contact-information",
    },
    hasPermission && { label: "FAQs", icon: FaQuestion, href: "/admin/faqs" },
    hasPermission && {
      label: "Activity",
      icon: Activity,
      href: "/admin/activity",
    },
  ];

  return menuItems.filter(Boolean) as MenuItem[];
}
