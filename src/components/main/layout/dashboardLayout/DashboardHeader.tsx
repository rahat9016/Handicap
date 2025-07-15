import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="h-[90px] bg-white shadow-sm flex items-center justify-end px-6 border-b border-skeleton gap-5">
      <div className="flex items-center gap-1 border border-gray rounded-xl px-2 h-12 w-full max-w-64">
        <Search className={`w-7 h-7 text-[#8C8C8C] `} />
        <Input
          type="text"
          placeholder="Search..."
          className="border-none bg-transparent placeholder-gray-400 shadow-none py-1 placeholder:text-[#646464] group-hover:placeholder:text-white group-hover:text-white"
        />
      </div>
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
        <h2 className="text-dashboard-primary font-semibold font-inter text-base">Hello, MERN</h2>
        <p className="text-[#8C8C8C] text-sm font-inter font-normal">Supper User</p>
      </div>
      </div>
    </div>
  );
}
