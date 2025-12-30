"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";

import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { ILangType, IPageSection } from "@/types";
import { NotebookText, SquarePen } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateUpdatePageSectionModal from "./Form/CreateUpdatePageSection";

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
    setItemsPerPage,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEdit = (row: IPageSection) => {
    setSection(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<IPageSection>[] = [
    {
      header: "Thumbnail",
      accessorKey: "imageUrls",
      cell: (
        _value: string | number | boolean | string[] | ILangType,
        row: IPageSection
      ) => {
        return (
          <div className="w-14 h-14 p-1 border flex items-center justify-center rounded-md cursor-pointer hover:opacity-80">
            {row?.imageUrls[0] && (
              <Image
                src={row.imageUrls[0]}
                width={44}
                height={44}
                alt="thumbnail"
                className="rounded"
              />
            )}
          </div>
        );
      },
      
    },
    { header: "Page Name", accessorKey: "pageId" },
    { header: "Section Type", accessorKey: "sectionType" },
    { header: "Order", accessorKey: "order" },
    {
      header: "Title EN",
      accessorKey: "title",
      cell: (
        _value: string | number | boolean | string[] | ILangType,
        row: IPageSection
      ) => {
        return <div>{row?.title?.en && <span>{row.title.en}</span>}</div>;
      },
      exportValue: (row: IPageSection) => row?.title?.en || ""
    },
    {
      header: "Title BN",
      accessorKey: "title",
      cell: (
        _value: string | number | boolean | string[] | ILangType,
        row: IPageSection
      ) => {
        return <div>{row?.title?.bn && <span>{row.title.bn}</span>}</div>;
      },
      exportValue: (row: IPageSection) => row?.title?.bn || ""
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_value: string | number | boolean | string[] | ILangType, row: IPageSection) => {
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
  ].filter(Boolean) as ColumnDef<IPageSection>[];

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
        icon={<NotebookText />}
        title="Page Sections"
        subtitle="Manage page sections"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        // IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
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
