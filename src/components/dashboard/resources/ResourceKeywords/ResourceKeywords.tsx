"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateKeywords from "./CreateUpdateKeywords";
import { IKeywords } from "./types/Keywords";

export default function ResourceKeywords() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet<IKeywords[]>(
    "/resource-keywords",
    ["resource-keywords", currentPage.toString()],
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

  const columns: ColumnDef<IKeywords>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
  ];
  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-erieBlack font-inter">
          Resource Keywords
        </h1>
        <Button
          className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11 gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="!text-2xl text-white" /> Create
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
      <CreateUpdateKeywords
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        // initialValues={role}
      />
    </div>
  );
}
