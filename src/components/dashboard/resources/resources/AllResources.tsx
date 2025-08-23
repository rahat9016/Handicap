/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { Eye, SlidersHorizontal, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { IResource } from "../types/types";
import CreateUpdateResources from "./CreateUpdateResources";
import ViewResourceDetails from "./ViewDetails";

export default function AllResources() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [resource, setResource] = useState<IResource | undefined>(undefined);
  const [isView, setIsView] = useState<boolean>(false);
  const { organizationId } = useAppSelector((state) => state.organizer);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage
  } = usePagination();

  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const endpoint = organizationId
    ? `/resources/organization/${organizationId}`
    : "/resources";
  const shouldFetch = organizationId !== undefined;

  const { data, isLoading } = useGet(
    endpoint,
    ["resources", currentPage.toString(), organizationId ?? "all"],
    {
    ...(itemsPerPage !== -1 && {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
      
    }),
    search: debouncedSearch,
  },
    { enabled: shouldFetch }
  );

  const { adminOrganizationPermission } = useAppSelector(
    (state) => state.permission
  );

  const handleEdit = (row: IResource) => {
    setResource(row);
    setIsModalOpen(true);
  };
  const handleView = (row: IResource) => {
    setResource(row);
    setIsView(true);
  };
  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<IResource>[] = [
    { header: "Resource Title", accessorKey: "title" },
    { header: "Description", accessorKey: "description" },
    { header: "Download Count", accessorKey: "downloadCount" },
    { header: "View Count", accessorKey: "viewCount" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    {
      header: "Is Active",
      accessorKey: "isCurrent",
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
      header: "Is Private",
      accessorKey: "isPrivate",
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
      accessorKey: "actions",
      cell: (_value, row: IResource) => {
        return (
          <div className="flex items-center gap-5">
            {adminOrganizationPermission && (
              <button
                onClick={() => handleEdit(row)}
                className="text-darkLiver hover:underline text-sm flex items-center gap-1"
              >
                <SquarePen size={16} />
                Edit
              </button>
            )}
            <button
              onClick={() => handleView(row)}
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
        icon={<SlidersHorizontal />}
        title="All Resources"
        subtitle="Manage Resources"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={adminOrganizationPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateResources
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setResource(undefined);
        }}
        initialValues={resource}
      />

      {resource && (
        <ViewResourceDetails
          isOpen={isView}
          onClose={() => {
            setIsView(false);
            setResource(undefined);
          }}
          resource={resource}
        />
      )}
    </div>
  );
}
