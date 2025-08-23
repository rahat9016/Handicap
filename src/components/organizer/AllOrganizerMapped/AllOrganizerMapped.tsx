/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import CreateOrganizerMappedModal from "./CreateOrganizerMappedModal";
interface IOrganization {
  organizationName: string;
  role: string;
  userName: string;
}
export default function AllOrganizerMapped() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();
  const { search, handleSearchChange, debouncedSearch } = useSearchDebounce(300);
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

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<IOrganization>[] = [
    { header: "User Name", accessorKey: "userName" },
    { header: "Organization Name", accessorKey: "organizationName" },
    { header: "Role", accessorKey: "role" },
    
    
  ];
  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
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
        IsCreate // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateOrganizerMappedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
