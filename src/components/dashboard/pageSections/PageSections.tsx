"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import CreateSectionModal from "./CreatePageSection";

interface IPageSection {
  id: number;
  pageId: string;
  sectionType: string;
  order: number;
  title: string;
  subtitle: string;
  content: string;
  imageUrls: string[];
  buttonLabel: string;
  buttonUrl: string;
  configuration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export default function PageSections() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

const columns: ColumnDef<IPageSection>[] = [
  { header: "Section ID", accessorKey: "id" },
  { header: "Page", accessorKey: "pageId" },
  { header: "Section Type", accessorKey: "sectionType" },
  { header: "Order", accessorKey: "order" },
  { header: "Title", accessorKey: "title" },
  { header: "Status", accessorKey: "isActive" },
  { header: "Created Date", accessorKey: "createdAt" },

  /*
  {
    header: "Actions",
    accessorKey: "id",
    cell: (_, row) => (
      <ActionButtons
        onEdit={() => handleEdit(row)}
        onDelete={() => handleDelete(row)}
      />
    )
  }
  */
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
      
      <CreateSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}