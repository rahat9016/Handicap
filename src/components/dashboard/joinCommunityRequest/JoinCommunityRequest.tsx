"use client";

import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { format } from "date-fns";
import { FileCog } from "lucide-react";
import { useEffect } from "react";
import { IJoinCommunity } from "./types/interface";

export default function JoinCommunityRequest() {
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();

  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  // ✅ Fetch data from the correct API
  const { data, isLoading } = useGet<IJoinCommunity[] | undefined>(
    "/community-join-requests",
    [
      "community-join-requests",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
    ],
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

  // ✅ Table Columns
  const columns: ColumnDef<IJoinCommunity>[] = [
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Created Date",
      accessorKey: "createdAt",
      cell: (value: string | number) => {
        if (!value) return "-";
        const date = new Date(value);
        return <span>{format(date, "dd MMM yyyy")}</span>;
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
        icon={<FileCog />}
        title="Join Community Requests"
        subtitle="List of all users who joined the community"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={false}
      />
    </div>
  );
}
