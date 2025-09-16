"use client";

import { Button } from "@/components/ui/button";
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
        {roleName === "ADMIN" && (
          <DropdownMenuLabel
            className="cursor-pointer"
            onClick={() => router.push("/admin")}
          >
            Admin
          </DropdownMenuLabel>
        )}
        {roleName === "USER" && (
          <Button onClick={() => router.push("/user-dashboard")}>
            Dashboard
          </Button>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(logoutUser());
            dispatch(clearOrganization());
            dispatch(setPermission(false));
            dispatch(setAdminOrganizationPermission(false));
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
