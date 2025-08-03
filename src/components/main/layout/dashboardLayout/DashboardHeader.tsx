"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Bell, Building2, ChevronLeft } from "lucide-react";
import UserSkeleton from "./Skeleton/UserSkeleton";

export default function DashboardHeader() {
  const {
    userInformation: { firstName, roleName },
    loading,
  } = useAppSelector((state) => state.auth);
  const { organizationName, roleName: organizationRoleName } = useAppSelector(
    (state) => state.organizer
  );

  const router = useRouter();
  return (
    <div
      className={`h-[90px] bg-white shadow-sm flex items-center  px-6 border-b border-skeleton gap-5 ${
        organizationName ? "justify-between" : "justify-end"
      }`}
    >
      {organizationName && (
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.push("/organization-list")}
            className="bg-dashboard-primary hover:bg-dashboard-primary text-white hover:text-white"
          >
            <ChevronLeft />
            Back to Organization
          </Button>
          <div className="flex items-start gap-1">
            <Building2 size={40} />
            <div className="text-left">
              <h3 className="text-dashboard-primary font-semibold font-inter text-base">
                {organizationName}
              </h3>
              <h5 className="text-[#8C8C8C] text-sm font-inter font-normal">
                {organizationRoleName}
              </h5>
            </div>
          </div>
        </div>
      )}
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
              <h2 className="text-dashboard-primary font-semibold font-inter text-base">
                Hello, {firstName}
              </h2>
              <p className="text-[#8C8C8C] text-sm font-inter font-normal">
                {roleName}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
