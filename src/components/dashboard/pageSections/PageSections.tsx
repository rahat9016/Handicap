"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";

import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { format } from "date-fns";
import { NotebookText, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdatePageSectionModal from "./CreateUpdatePageSection";
import { IPageSection } from "./types";

export default function PageSections() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [section, setSection] = useState<IPageSection>();
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
    "/page-sections",
    ["page-sections", currentPage.toString()],
    {
    ...(itemsPerPage !== -1 && {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }),
    search: debouncedSearch,
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
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        icon={<NotebookText />}
        title="Page Sections"
        subtitle="Manage page sections"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
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
