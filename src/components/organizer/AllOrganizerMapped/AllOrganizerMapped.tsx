/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
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
  } = usePagination();
  // const { search, handleSearchChange, debouncedSearch } = useSearchDebounce(300);
  const { data, isLoading } = useGet(
    "/user-organization-role",
    ["user-organization-role", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
      // search: debouncedSearch,
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
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-erieBlack font-inter">Mapped Organizer</h1>
        <div className="flex items-center gap-5">
          {/* <div>
          <Input
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="w-[300px]"
          />
        </div> */}
        <Button className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11" onClick={() => setIsModalOpen(true)}>
          {" "}
          Create User Role Organizer{" "}
        </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      <CreateOrganizerMappedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
