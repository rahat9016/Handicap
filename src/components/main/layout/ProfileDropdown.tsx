"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/lib/redux/features/auth/authSlice";
import { clearOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { ChevronDown, User } from "lucide-react";

export function ProfileDropdown() {
  const dispatch = useAppDispatch();
  const {
    userInformation: { firstName },
  } = useAppSelector((state) => state.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <User size={20} />
          <p className="">{firstName}</p>
          <ChevronDown size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          dispatch(logoutUser());
          dispatch(clearOrganization());
        }}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
