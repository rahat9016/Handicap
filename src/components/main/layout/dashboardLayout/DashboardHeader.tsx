"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks";
import { Bell } from "lucide-react";

export default function DashboardHeader() {
  const { userInformation: { firstName, roleName } } = useAppSelector(state => state.auth)
  return (
    <div className="h-[90px] bg-white shadow-sm flex items-center justify-end px-6 border-b border-skeleton gap-5 ">
      <div>
        <div className="w-12 h-12 bg-dashboard-primary rounded-full flex items-center justify-center text-white relative">
          <div className="w-[22px] h-[22px] bg-[#DC3545] rounded-full flex items-center justify-center absolute top-0 -right-2">
            <p className="font-inter font-semibold text-white text-xs">2</p>
          </div>
          <Bell />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12" >
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div>
        <h2 className="text-dashboard-primary font-semibold font-inter text-base">Hello, {firstName}</h2>
        <p className="text-[#8C8C8C] text-sm font-inter font-normal">{roleName}</p>
      </div>
      </div>
    </div>
  );
}
