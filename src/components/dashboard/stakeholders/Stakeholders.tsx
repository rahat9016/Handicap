"use client";

import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { format } from "date-fns";
import { Boxes, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateStakeholders from "./Form/CreateUpdateStakeholders";
import { IStakeholder } from "./types/stakeholders";

export default function Stakeholders() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stakeholder, setStakeholder] = useState<IStakeholder | undefined>(
    undefined
  );
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
  const { data, isLoading } = useGet<IStakeholder[]>(
    "/stakeholders",
    ["Stakeholders", currentPage.toString()],
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

  const handleEdit = (row: IStakeholder) => {
    setStakeholder(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<IStakeholder>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    {
      header: "Updated At date",
      accessorKey: "updatedAt",
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
      cell: (_value, row) => {
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
        icon={<Boxes />}
        title="Stakeholders"
        subtitle="Manage Stakeholders Setup"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        // IsCreate // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateStakeholders
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStakeholder(undefined);
        }}
        initialValues={stakeholder}
      />
    </div>
  );
}
