"use client";
import UserSkeleton from "@/components/main/layout/dashboardLayout/Skeleton/UserSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks";
import { Bell } from "lucide-react";

export default function UserDashboardHeader() {
  const {
    userInformation: { firstName, roleName },
    loading,
  } = useAppSelector((state) => state.auth);

  return (
    <div
      className={`h-[94px] bg-white shadow-sm flex items-center  px-6 border-b border-skeleton gap-5 justify-between `}
    >
         <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg lg:text-3xl font-bold text-foreground leading-none">
              Welcome back, {firstName}!
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground mt-1">
              Continue your learning journey
            </p>
          </div>
        </div>
      <div className="flex items-center gap-4">
        <div>
          <div className="w-12 h-12 bg-dashboard-primary rounded-full flex items-center justify-center text-white relative">
            <div className="w-[22px] h-[22px] bg-[#DC3545] rounded-full flex items-center justify-center absolute top-0 -right-2">
              <p className="font-inter font-semibold text-white text-xs">2</p>
            </div>
            <Bell />
          </div>
        </div>
        {loading ? (
          <UserSkeleton />
        ) : (
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div>
              <h2 className="text-dashboard-primary font-semibold font-inter text-base leading-none">
                Hello, {firstName}
              </h2>
              <p className="text-[#8C8C8C] text-xs lg:text-sm font-inter font-normal">
                {roleName}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}