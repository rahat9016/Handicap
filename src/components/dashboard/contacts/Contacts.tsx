"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { Eye, NotebookText } from "lucide-react";
import { useEffect, useState } from "react";
import { IContactMessage } from "./types";
import ViewDetails from "./ViewContactDetails";

const Contacts = () => {
  const [isView, setIsView] = useState<boolean>(false);
  const [contact, setContact] = useState<IContactMessage>();
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

  const { data, isLoading, refetch } = useGet(
    "/contact-us",
    ["contact-us", currentPage.toString()],
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

  const handleMessageView = (row: IContactMessage) => {
    setContact(row);
    setIsView(true);
  };

  const columns: ColumnDef<IContactMessage>[] = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Organization", accessorKey: "organization" },
    { header: "Email", accessorKey: "email" },
    { header: "Subject", accessorKey: "subject" },
    { header: "Message", accessorKey: "message" },
    {
      header: "Seen",
      accessorKey: "isRead",
      cell: (value) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Seen" : "Not seen"}
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
              onClick={() => handleMessageView(row)}
              className="text-darkLiver hover:underline text-sm flex items-center gap-1"
            >
              <Eye size={16} />
              View
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
        title="Contact Messages"
        subtitle="Messages from contact"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        // IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      {contact && (
        <ViewDetails
          isOpen={isView}
          onClose={() => {
            setIsView(false);
            setContact(undefined);
          }}
          contact={contact}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Contacts;
