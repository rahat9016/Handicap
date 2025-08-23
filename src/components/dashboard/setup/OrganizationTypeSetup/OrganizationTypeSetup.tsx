/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { FileCog } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateOrganizationTypeSetup from "./CreateUpdateOrganizationTypeSetup";
interface IOrganization {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}
export default function OrganizationTypeSetup() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const { search, handleSearchChange, debouncedSearch } =
      useSearchDebounce(300);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage
  } = usePagination();
  const { data, isLoading } = useGet(
    "/organization-types",
    ["organization-types", currentPage.toString()],
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
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
    header: "Is Active",
    accessorKey: "isActive",
    cell: (value) => {
      const isActive = value

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive
              ? "bg-[#bfffda] text-green"
              : "bg-rose-200 text-rose-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
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
        icon={<FileCog />}
        title="Organization Types"
        subtitle="Organization Types Setup"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateOrganizationTypeSetup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
