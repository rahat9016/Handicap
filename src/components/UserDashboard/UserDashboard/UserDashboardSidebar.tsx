"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { ArrowLeftToLine, BookOpen, Home, Menu } from "lucide-react";
import { useState } from "react";

export default function UserDashboardSidebar() {
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
        className={`h-screen bg-sidebar border-sidebar-border transition-all duration-300 ${
          isCollapsed ? "w-[74px]" : "w-64"
        } flex flex-col`}
      >
        <div className={`${isCollapsed ? "p-4":"p-1.5"} border-b border-sidebar-border relative`}>
          <div>
            {!isCollapsed && (
              <div
                onClick={() => router.push("/")}
                className="cursor-pointer"
              >
                <div className="text-center">
                  <h2 className="font-inter text-lg text-[#0077CC] font-bold leading-none">
                    Disability Inclusion
                    <br /> Resource Hub
                  </h2>
                  <p className="font-inter font-medium text-sm text-[#666666]">
                    Bangladesh
                  </p>
                </div>
              </div>
            )}
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`bg-dashboard-primary hover:bg-dashboard-primary/90 absolute -top-3 ${isCollapsed ? "right-3":"right-0"}`}
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4" />
              ) : (
                <ArrowLeftToLine className="h-4 w-4" />
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
                    className={`w-full justify-start gap-3 h-12 text- transition-colors ${
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
      </Card>
    </div>
  );
}
