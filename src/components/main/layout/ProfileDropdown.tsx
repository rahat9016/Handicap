"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/navigation";
import { logoutUser } from "@/lib/redux/features/auth/authSlice";
import { clearOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import {
  setAdminOrganizationPermission,
  setPermission,
} from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { ChevronDown, User } from "lucide-react";

export function ProfileDropdown() {
  const dispatch = useAppDispatch();
  const {
    userInformation: { firstName, roleName },
  } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearOrganization());
    dispatch(setPermission(false));
    dispatch(setAdminOrganizationPermission(false));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1 text-sm text-gray-700 focus:outline-none"
          aria-label="Open profile menu"
        >
          <User size={20} />
          <span className="font-medium">{firstName}</span>
          <ChevronDown size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="z-[9999] min-w-[160px] shadow-lg rounded-md bg-white"
      >
        <DropdownMenuLabel className="text-gray-700 font-semibold">
          My Account
        </DropdownMenuLabel>

        {roleName === "SUPER_ADMIN" && (
          <DropdownMenuItem
            onClick={() => router.push("/admin")}
            className="cursor-pointer"
          >
            Admin
          </DropdownMenuItem>
        )}

        {roleName === "ADMIN" && (
          <DropdownMenuItem
            onClick={() => router.push("/organization-list")}
            className="cursor-pointer"
          >
            Admin
          </DropdownMenuItem>
        )}

        {roleName === "USER" && (
          <DropdownMenuItem
            onClick={() => router.push("/user-dashboard")}
            className="cursor-pointer"
          >
            Dashboard
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
