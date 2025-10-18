"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { CalendarDays, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateEvents from "./Form/CreateUpdateEvents";
import { IEvent } from "./types";

export default function EventsList() {
  const [events, setEvents] = useState<IEvent>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { hasPermission } = useAppSelector((state) => state.permission);
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

  const { data, isLoading } = useGet<IEvent[]>(
    "/events",
    ["events", currentPage.toString()],
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

  const handleEdit = (row: IEvent) => {
    console.log(row);
    setEvents(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<IEvent>[] = [
    { header: "Title", accessorKey: "title" },
    {
      header: "Start Date",
      accessorKey: "startDate",
      cell: (value) => {
        const dateValue = typeof value === "string" ? value : "";
        return (
          <span>
            {dateValue ? format(new Date(dateValue), "MMM dd, yyyy") : "—"}
          </span>
        );
      },
    },
    {
      header: "End Date",
      accessorKey: "endDate",
      cell: (value) => {
        const dateValue = typeof value === "string" ? value : "";
        return (
          <span>
            {dateValue ? format(new Date(dateValue), "MMM dd, yyyy") : "—"}
          </span>
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (value) => {
        const htmlContent = typeof value === "string" ? value : "";
        return (
          <div
            className="text-sm text-gray-700 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        );
      },
    },

    {
      header: "Is Published",
      accessorKey: "isPublished",
      cell: (value) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Published" : "Unpublished"}
          </span>
        );
      },
    },
    {
      header: "Is Online",
      accessorKey: "isOnline",
      cell: (value) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Online" : "Offline"}
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
        icon={<CalendarDays />}
        title="Events"
        subtitle="Manage events"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />

      <CreateUpdateEvents
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEvents(undefined);
        }}
        initialValues={events}
      />
    </div>
  );
}
