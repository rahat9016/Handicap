"use client";

import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { Hash, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateKeywords from "./CreateUpdateKeywords";
import { IKeywords } from "./types/Keywords";

export default function ResourceKeywords() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<IKeywords | undefined>();
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
  const { data, isLoading } = useGet<IKeywords[]>(
    "/resource-keywords",
    ["resource-keywords", currentPage.toString()],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );

  const { hasPermission } = useAppSelector((state) => state.permission);

  const handleEdit = (row: IKeywords) => {
    setKeywords(row);
    setIsModalOpen(true);
  };

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns: ColumnDef<IKeywords>[] = [
    { header: "Name", accessorKey: "name" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value: string | number | undefined) => {
        if (!value) return null;
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    hasPermission
      ? {
          header: "Action",
          accessorKey: "id",
          cell: (_value: string | number | undefined, row: IKeywords) => {
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
        }
      : undefined,
  ].filter(Boolean) as ColumnDef<IKeywords>[];

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
        icon={<Hash />}
        title="Resource Keywords"
        subtitle="Manage resource keywords"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateKeywords
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setKeywords(undefined);
        }}
        initialValues={keywords}
      />
    </div>
  );
}
