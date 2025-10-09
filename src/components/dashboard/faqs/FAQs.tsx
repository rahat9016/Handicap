"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { NotebookText, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateFAQs from "./CreateUpdateFAQs";
import { useAppSelector } from "@/lib/redux/hooks";
import { IFaqItem } from "./types";

const FAQs = () => {
  const { hasPermission } = useAppSelector((state) => state.permission);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<IFaqItem>();
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

  const { data, isLoading } = useGet<IFaqItem[]>(
    "/faqs",
    ["faqs", currentPage.toString()],
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

  const handleEdit = (row: IFaqItem) => {
    setSelect(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<IFaqItem>[] = [
    {
      header: "Question EN",
      accessorKey: "question",
      
    },
    {
      header: "Question BN",
      accessorKey: "questionBn",
      
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
        icon={<NotebookText />}
        title="Frequently Asked Quesitons"
        subtitle="Manage page sections"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />

      <CreateUpdateFAQs
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelect(undefined);
        }}
        initialValues={select}
      />
    </div>
  );
};

export default FAQs;
