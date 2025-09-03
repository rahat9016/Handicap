"use client";

import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { format } from "date-fns";
import { Languages, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { ILanguage } from "../types/setup";
import CreateUpdateLanguageSetup from "./CreateUpdateLanguageSetup";
export default function LanguageSetup() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<ILanguage | undefined>(undefined);
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
  const { data, isLoading } = useGet<ILanguage[]>(
    "/languages",
    ["languages", currentPage.toString()],
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
  }, [data]);

  const handleEdit = (row: ILanguage) => {
    setLanguage(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<ILanguage>[] = [
    { header: "Code", accessorKey: "code" },
    { header: "Name", accessorKey: "name" },
    { header: "Native Name", accessorKey: "nativeName" },
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
        icon={<Languages />}
        title="Language Setup"
        subtitle="Manage Language Setup"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateLanguageSetup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setLanguage(undefined);
        }}
        initialValues={language}
      />
    </div>
  );
}
