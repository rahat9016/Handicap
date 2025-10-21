"use client";

import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { Power } from "lucide-react";
import { useEffect, useState } from "react";
import { IPowerBi } from "./types/interface";
import CreateUpdatePowerBi from "./CreateUpdatePowerBi";
import { useAppSelector } from "@/lib/redux/hooks";

export default function PowerBi() {
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [powerBi, setPowerBi] = useState<IPowerBi | undefined>();
  const { hasPermission } = useAppSelector((state) => state.permission);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();
  const { data, isLoading } = useGet<IPowerBi[]>(
    "/powerbi",
    ["powerbi", currentPage.toString()],
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

  const columns: ColumnDef<IPowerBi>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (value: unknown, row: IPowerBi) => (
        <div className="font-medium">
          {row.title || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (value: unknown, row: IPowerBi) => (
        <div className="max-w-md truncate">
          {row.description || <span className="text-gray-400">N/A</span>}
        </div>
      ),
    },
    {
      header: "Link",
      accessorKey: "link",
      cell: (value: unknown, row: IPowerBi) => (
        <div>
          {row.link ? (
            <a
              href={row.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline truncate block max-w-xs"
            >
              {row.link}
            </a>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: (value: unknown, row: IPowerBi) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-[#bfffda] text-green"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      header: "Actions",
      accessorKey: "id",
      cell: (value: unknown, row: IPowerBi) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-green-600 hover:text-green-900"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (row: IPowerBi) => {
    setPowerBi(row);
    setIsModalOpen(true);
  };
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
        icon={<Power />}
        title="PowerBi"
        subtitle="Manage user powerBi"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission}
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdatePowerBi
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        initialValues={powerBi}
      />
    </div>
  );
}
