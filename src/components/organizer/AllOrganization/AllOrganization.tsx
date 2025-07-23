/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useEffect } from "react";
interface IOrganization {
  name: string;
  type: string;
  email: string;
  phone: string;
  createdDate: string;
  status: string;
  id: string; // if using for action buttons
};
export default function AllOrganization() {
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet(
    "/organizations",
    ["organizations", currentPage.toString()],
    {
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
  });

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<IOrganization>[] = [
    { header: "Organization Name", accessorKey: "name" },
    { header: "Type", accessorKey: "type" },
    { header: "E-mail", accessorKey: "email" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Created date", accessorKey: "createdDate" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    // {
    //   header: "Action",
    //   accessorKey: "id",
    //   cell: (_, row) => (
    //     <ActionButtons
    //       onEdit={() => handleEdit(row)}
    //       onDelete={() => handleDelete(row)}
    //     />
    //   )
    // }
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
      />
    </div>
  );
}
