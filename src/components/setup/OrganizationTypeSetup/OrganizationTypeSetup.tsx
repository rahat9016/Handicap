/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
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
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet(
    "/organization-types",
    ["organization-types", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
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
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-erieBlack font-inter">Mapped Organizer</h1>
        <Button className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11" onClick={() => setIsModalOpen(true)}>
          {" "}
          Create Type Setup{" "}
        </Button>
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
      <CreateUpdateOrganizationTypeSetup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
