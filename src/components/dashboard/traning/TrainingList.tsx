"use client";

import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { GraduationCap, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateTraining from "./Form/CreateUpdateTraining";
import { ITraining } from "./types/Training";

export default function TrainingList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [training, setTraining] = useState<
    ITraining | undefined
  >();
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

  const { data, isLoading } = useGet<ITraining[]>(
    "/resource-categories",
    [
      "resource-categories",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
    ],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );
  const { hasPermission } = useAppSelector((state) => state.permission);

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEdit = (row: ITraining) => {
    setTraining(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<ITraining>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Course Link", accessorKey: "link" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value: string | number | undefined) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    {
      header: "Is Active",
      accessorKey: "isActive",
      cell: (value: boolean | undefined) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Active" : "Inactive  "}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_value: string | number | undefined, row: ITraining) => {
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
  ].filter(Boolean) as ColumnDef<ITraining>[];

  return (
    <div className="bg-white p-4 lg:p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <DataTable
        key={hasPermission ? "with-action" : "no-action"}
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        icon={<GraduationCap />}
        title="Training"
        subtitle="Manage training"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateTraining
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTraining(undefined);
        }}
        initialValues={training}
      />
    </div>
  );
}
