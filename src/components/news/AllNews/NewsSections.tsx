"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { NotebookText, SquarePen } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateUpdateNewsSectionModal from "./CreateUpdateNewsSection";
import { INewsSection } from "./types";

export default function NewsSections() {
  const { hasPermission } = useAppSelector((state) => state.permission);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [section, setSection] = useState<INewsSection>();
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

  const { data, isLoading } = useGet("/news", ["all-news"], {
    ...(itemsPerPage !== -1 && {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }),
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEdit = (row: INewsSection) => {
    setSection(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<INewsSection>[] = [
    {
      header: "Thumbnail",
      accessorKey: "images",
      cell: (value) => {
        const images = value as
          | { id: number; newsId: number; imageUrl: string }[]
          | undefined;
        return (
          <div className="w-14 h-14 p-1 border flex items-center justify-center rounded-md cursor-pointer hover:opacity-80">
            {images && images[0] && (
              <Image
                src={images[0].imageUrl}
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
    { header: "Title", accessorKey: "title" },
    { header: "Summary", accessorKey: "summary" },
    {
      header: "Is Published",
      accessorKey: "isPublished",
      cell: (value) => {
        const isPublished = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isPublished
                ? "bg-[#bfffda] text-green"
                : "bg-rose-200 text-rose-700"
            }`}
          >
            {isPublished ? "Published" : "Unpublished"}
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
        icon={<NotebookText />}
        title="News"
        subtitle="Manage news"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />

      <CreateUpdateNewsSectionModal
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
