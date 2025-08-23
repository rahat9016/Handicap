/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { format } from "date-fns";
import { Building2, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { IOrganizationResponse } from "../types";
import CreateUpdateOrganization from "./CreateUpdateOrganization";

export default function AllOrganization() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [organization, setOrganization] = useState<IOrganizationResponse | undefined>(undefined);
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
    "/organizations",
    ["organizations", currentPage.toString()],
    {
    ...(itemsPerPage !== -1 && {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }),
    search: debouncedSearch,
  }
  );

  const handleEdit = (row: IOrganizationResponse) => {
      setOrganization(row);
      setIsModalOpen(true);
    };

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<IOrganizationResponse>[] = [
    { header: "Organization Name", accessorKey: "name" },
    {
      header: "Type",
      accessorKey: "type",
      cell: (_, row) => {
        return <span>{row.type?.name || "N/A"}</span>;
      },
    },
    { header: "E-mail", accessorKey: "contactEmail" },
    { header: "Phone", accessorKey: "contactPhone" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    {
      header: "Is Active",
      accessorKey: "isActive",
      cell: (value) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_value, row: IOrganizationResponse) => {
        return (
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleEdit(row)}
              className="text-darkLiver hover:underline text-sm flex items-center gap-1"
            >
              <SquarePen size={16} />
              Edit
            </button>
          </div>
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
        icon={<Building2 />}
        title="All Organizations"
        subtitle="Manage organizations accounts"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateOrganization
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setOrganization(undefined);
        }}
        initialValues={organization}
      />
    </div>
  );
}
