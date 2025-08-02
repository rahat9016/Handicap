"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { setOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { IUserRole } from "./types/types";

export default function OrganizationList() {
  const dispatch = useAppDispatch()
  const navigate = useRouter();
  const { data, isLoading } = useGet<IUserRole[]>("/user/organizations-role", [
    "organizations-role",
  ]);

  const handleNavigate = (roleId: number, organizationId: number) => {
    dispatch(setOrganization({ roleId: roleId.toString(), role: organizationId.toString() }));
    // Navigate to the organization details page
    navigate.push('/admin')
  }

  return (
    <div className="container py-40">
      <h1 className="text-2xl font-bold mb-4">Organization List</h1>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="mb-4">
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
      ) : (
          <div>
            {data?.data?.length ? (
              <div className="grid grid-cols-4 gap-3">
                {data.data.map((role) => (
                  <Card onClick={() => handleNavigate(role.id, role.organizationId)} key={role.id} className="mb-2 h-24">
                    <CardContent>
                      <strong>{role.organizationName}</strong> - {role.roleName}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No roles found.</p>
            )}
          </div>

      )}
    </div>
  );
}
