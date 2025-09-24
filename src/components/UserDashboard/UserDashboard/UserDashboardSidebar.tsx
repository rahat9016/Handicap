"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "@/i18n/navigation";
import { logoutUser } from "@/lib/redux/features/auth/authSlice";
import { clearOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import {
  setAdminOrganizationPermission,
  setPermission,
} from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export default function UserDashboardSidebar() {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    userInformation: { firstName },
  } = useAppSelector((state) => state.auth);
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/user-dashboard",
    },
    // { id: "profile", label: "Profile", icon: User, href: "/user-dashboard/profile-management" },
    {
      id: "courses",
      label: "My Courses",
      icon: BookOpen,
      href: "/user-dashboard/my-courses",
    },
    // { id: "quizzes", label: "Quizzes", icon: FileText, href: "/dashboard/quizzes" }
  ];

  return (
    <div>
      <Card
        className={`h-screen bg-sidebar border-sidebar-border transition-all duration-300 py-0 ${
          isCollapsed ? "w-[80px]" : "w-64"
        } flex flex-col`}
      >
        <div
          className={`  relative`}
        >
          <div className="h-[93px] border-b border-sidebar-border">
            {!isCollapsed ? (
              <div onClick={() => router.push("/")} className="cursor-pointer flex items-center justify-center w-full h-full">
                <div className="text-center">
                  <h2 className="font-inter text-lg text-[#0077CC] font-bold leading-none ">
                    Disability Inclusion
                    <br /> Resource Hub
                  </h2>
                  <p className="font-inter font-medium text-sm text-[#666666]">
                    Bangladesh
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div onClick={() => router.push("/")} className="rounded-full w-12 h-12 border flex items-center justify-center font-inter font-bold text-sm p-1  text-[#0077CC] cursor-pointer">
                DIRH
              </div>
              </div>
            )}
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`bg-white hover:bg-white absolute top-3  text-black border rounded-full !w-7 !h-7 p-1 -right-3`}
            >
              {isCollapsed ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="px-4 pb-1 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/diverse-student-profiles.png" />
              <AvatarFallback className="bg-gray text-sidebar-accent-foreground">
                {firstName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {firstName}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  Student
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const pathWithoutLocale = pathname.replace(/^\/(en|bn)/, "");
              const isActive = pathWithoutLocale === item.href;

              return (
                <li key={item.id}>
                  <Button
                    className={`w-full ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } gap-3 h-12 text- transition-colors ${
                      isActive
                        ? "bg-dashboard-primary text-white"
                        : " hover:bg-dashboard-primary/70 hover:text-white text-black bg-gray"
                    }`}
                    onClick={() => router.push(item.href)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="px-4 mb-5">
          <Button
            onClick={() => {
              dispatch(logoutUser());
              dispatch(clearOrganization());
              dispatch(setPermission(false));
              dispatch(setAdminOrganizationPermission(false));
            }}
            className="w-full bg-[#F0F0F0] hover:bg-[#FDECEC] text-[#A8A8A8] hover:text-[#EB5757]  flex items-center justify-start gap-2 h-12 !px-4"
          >
            <LogOut className="h-6 w-6" size={24} /> {!isCollapsed && "Logout"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
