"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { Building2, Eye, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { IOrganizationResponse } from "../types";
import CreateUpdateOrganization from "./Form/CreateUpdateOrganization";
import ViewOrganizationDetails from "./ViewDetails";

export default function AllOrganization() {
  const { hasPermission } = useAppSelector((state) => state.permission);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [organization, setOrganization] = useState<
    IOrganizationResponse | undefined
  >(undefined);
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
  const { data, isLoading } = useGet(
    "/organizations",
    ["organizations", currentPage.toString()],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );

  const handleEdit = (row: IOrganizationResponse) => {
    setOrganization(row);
    setIsModalOpen(true);
  };

  const handleView = (row: IOrganizationResponse) => {
    setOrganization(row);
    setIsViewModalOpen(true);
  };
  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns: ColumnDef<IOrganizationResponse>[] = [
    { header: "Organization Name", accessorKey: "name" },
    {
      header: "Type",
      accessorKey: "type",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (_: any, row: IOrganizationResponse) => {
        return <span>{row.type?.name || "N/A"}</span>;
      },
    },
    { header: "E-mail", accessorKey: "contactEmail" },
    { header: "Phone", accessorKey: "contactPhone" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value: string) => {
        const date = new Date(value);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    {
      header: "Is Active",
      accessorKey: "isActive",
      cell: (value: boolean) => {
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
    hasPermission
      ? {
          header: "Action",
          accessorKey: "id",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: (_value: any, row: IOrganizationResponse) => {
            return (
              <div className="flex items-center gap-5">
                <button
                  onClick={() => handleEdit(row)}
                  className="text-darkLiver hover:underline text-sm flex items-center gap-1"
                >
                  <SquarePen size={16} />
                  Edit
                </button>
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
        }
      : undefined,
  ].filter(Boolean) as ColumnDef<IOrganizationResponse>[];
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
        icon={<Building2 />}
        title="All Organizations"
        subtitle="Manage organizations accounts"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateOrganization
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setOrganization(undefined);
        }}
        initialValues={organization}
      />

      {isViewModalOpen && (
        <ViewOrganizationDetails
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setOrganization(undefined);
          }}
          organization={organization}
        />
      )}
    </div>
  );
}
