"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";

import { format } from "date-fns";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdatePageSectionModal from "./CreateUpdatePageSection";
import { IPageSection } from "./types";

export default function PageSections() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [section, setSection] = useState<IPageSection>();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();

  const { data, isLoading } = useGet(
    "/page-sections",
    ["page-sections", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const handleEdit = (row: IPageSection) => {
    setSection(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<IPageSection>[] = [
    { header: "Section ID", accessorKey: "id" },
    { header: "Page", accessorKey: "pageId" },
    { header: "Section Type", accessorKey: "sectionType" },
    { header: "Order", accessorKey: "order" },
    { header: "Title", accessorKey: "title" },
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
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
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
              Edit Content
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-erieBlack font-inter">
          Page Sections
        </h1>
        <Button
          className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Section
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

      <CreateUpdatePageSectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSection(undefined);
        }}
        initialValues={section}
      />
    </div>
  );
}
