"use client";

import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { UserRole } from "@/utils/UserRoleEnum";
import { format } from "date-fns";
import { Activity } from "lucide-react";
import { useEffect } from "react";
import { IUserActivity } from "./types/interface";

export default function ActivityUser() {
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();
  const { data, isLoading } = useGet<IUserActivity[]>(
    "/activity-logs",
    ["activity-logs", currentPage.toString()],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns: ColumnDef<IUserActivity>[] = [
    {
      header: "First Name",
      accessorKey: "user",
      cell: (_value, row) => (
        <div>
          {row.user?.firstName || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Last Name",
      accessorKey: "user",
      cell: (_value, row) => (
        <div>
          {row.user?.lastName || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "details",
      cell: (_value, row) => (
        <div>
          {row.details.email || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Title",
      accessorKey: "details",
      cell: (_value, row) => (
        <div>
          {row.details.title || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "details",
      cell: (_value, row) => {
        const roleId = row.details.roleId;
        const roleName =
          roleId === 1
            ? UserRole.SUPER_ADMIN
            : roleId === 2
            ? UserRole.ADMIN
            : roleId === 3
            ? UserRole.USER
            : "Unknown";
        return <span className="font-medium">{roleName}</span>;
      },
    },
    {
      header: "Activity Type",
      accessorKey: "activityType",
      cell: (_value, row) => (
        <span className="text-sm font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
          {row.activityType}
        </span>
      ),
    },
    {
      header: "Entity Type",
      accessorKey: "entityType",
      cell: (_value, row) => (
        <div>
          {row.entityType || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Entity ID",
      accessorKey: "entityId",
      cell: (_value, row) => (
        <div>{row.entityId || <span className="text-gray-400">N/A</span>}</div>
      ),
    },
    {
      header: "IP Address",
      accessorKey: "ipAddress",
      cell: (_value, row) => (
        <div>{row.ipAddress || <span className="text-gray-400">N/A</span>}</div>
      ),
    },
    {
      header: "Device Info",
      accessorKey: "deviceInfo",
      cell: (_value, row) => (
        <div>
          {row.deviceInfo || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
  ];
  return (
    <div className="bg-white p-4 lg:p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        icon={<Activity />}
        title="Activity"
        subtitle="Manage user activity"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        // IsCreate // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
    </div>
  );
}
