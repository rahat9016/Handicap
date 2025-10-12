"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Bell, Building2, ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import UserSkeleton from "./Skeleton/UserSkeleton";

export default function DashboardHeader({
  toggleSidebar,
}: {
  toggleSidebar?: () => void;
}) {
  const {
    userInformation: { firstName, roleName },
    loading,
  } = useAppSelector((state) => state.auth);
  const { organizationName, roleName: organizationRoleName } = useAppSelector(
    (state) => state.organizer
  );

  const router = useRouter();
  const pathname = usePathname();
  const isUser = pathname.startsWith("/user-dashboard");
  console.log(pathname.startsWith("/user-dashboard"));
  return (
    <div
      className={`h-[70px] md:h-[90px] bg-white shadow-sm flex items-center px-3 md:px-6 border-b border-skeleton gap-3 md:gap-5 ${
        organizationName ? "justify-between" : "justify-end"
      }`}
    >
      <Link
        href="/"
        className="flex font-medium items-center gap-2 border px-4 py-2 hover:bg-muted rounded-lg text-sm "
      >
        <BiArrowBack size={20} />
        Back to Home
      </Link>
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <button
            className="lg:hidden p-1 md:p-2 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6 text-dashboard-primary" />
          </button>
        )}

        {!isUser && organizationName && (
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              onClick={() => router.push("/organization-list")}
              className="bg-dashboard-primary hover:bg-dashboard-primary text-white hover:text-white text-xs md:text-sm h-8 md:h-10 px-2 md:px-4"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Back to Organization</span>
              <span className="xs:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-1 md:gap-2">
              <Building2 className="w-6 h-6 md:w-10 md:h-10" />
              <div className="text-left max-w-[120px] md:max-w-none">
                <h3 className="text-dashboard-primary font-semibold font-inter text-sm md:text-base truncate">
                  {organizationName}
                </h3>
                <h5 className="text-[#8C8C8C] text-xs md:text-sm font-inter font-normal truncate">
                  {organizationRoleName}
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <div className="relative">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-dashboard-primary rounded-full flex items-center justify-center text-white">
            <Bell className="w-3 h-3 md:w-5 md:h-5" />
          </div>
          <div className="w-4 h-4 md:w-[22px] md:h-[22px] bg-[#DC3545] rounded-full flex items-center justify-center absolute -top-1 -right-1 md:-top-2 md:-right-2">
            <p className="font-inter font-semibold text-white text-[10px] md:text-xs">
              2
            </p>
          </div>
        </div>

        {loading ? (
          <UserSkeleton />
        ) : (
          <div className="flex items-center gap-2 md:gap-4">
            <Avatar className="w-8 h-8 md:w-12 md:h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="hidden sm:block">
              <h2 className="text-dashboard-primary font-semibold font-inter text-sm md:text-base truncate">
                Hello, {firstName}
              </h2>
              <p className="text-[#8C8C8C] text-xs md:text-sm font-inter font-normal truncate">
                {roleName}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
