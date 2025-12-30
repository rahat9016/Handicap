"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { SquarePen, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { UserOrganizationAssignment } from "../types";
import CreateUpdateOrganizerMappedModal from "./Form/CreateUpdateOrganizerMappedModal";
import { IOrganization } from "./types";

export default function AllOrganizerMapped() {
  const { hasPermission } = useAppSelector((state) => state.permission);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [organizationTypes, setOrganizationTypes] =
    useState<UserOrganizationAssignment>();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();

  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);
  const { data, isLoading } = useGet(
    "/user-organization-role",
    ["user-organization-role", currentPage.toString()],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );

  const handleEdit = (row: UserOrganizationAssignment) => {
    setOrganizationTypes(row);
    setIsModalOpen(true);
  };

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns: ColumnDef<IOrganization>[] = [
    { header: "User Name", accessorKey: "userName" },
    { header: "Organization Name", accessorKey: "organizationName" },
    { header: "Role", accessorKey: "role" },

    hasPermission
      ? {
          header: "Action",
          accessorKey: "action",
          cell: (_value: unknown, row: UserOrganizationAssignment) => {
            return (
              <div className="flex items-center gap-5">
                <button
                  onClick={() => handleEdit(row as UserOrganizationAssignment)}
                  className="text-darkLiver hover:underline text-sm flex items-center gap-1"
                >
                  <SquarePen size={16} />
                  Edit
                </button>
              </div>
            );
          },
        }
      : undefined,
  ].filter(Boolean) as ColumnDef<IOrganization>[];

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
        icon={<UserRoundPlus />}
        title="Mapped Organizer"
        subtitle="Manage Organizer accounts"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateOrganizerMappedModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setOrganizationTypes(undefined);
        }}
        initialValues={organizationTypes}
      />
    </div>
  );
}
