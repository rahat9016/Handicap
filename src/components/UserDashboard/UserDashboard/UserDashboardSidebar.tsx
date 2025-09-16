"use client";
import { BookOpen, FileText, Home, Menu, Settings, User, X } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

export default function UserDashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "quizzes", label: "Quizzes", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <div>
      <Card
        className={`h-screen bg-sidebar border-sidebar-border transition-all duration-300 ${
          isCollapsed ? "w-[70px]" : "w-64"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                EduPanel
              </h2>
            )}
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="bg-dashboard-primary hover:bg-dashboard-primary/90"
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/diverse-student-profiles.png" />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  John Doe
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
              // const isActive = activeSection === item.id

              return (
                <li key={item.id}>
                  <Button
                    className={`w-full justify-start gap-3 bg-dashboard-primary hover:bg-dashboard-primary/90 h-10`}
                    //   onClick={() => onSectionChange(item.id)}
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
