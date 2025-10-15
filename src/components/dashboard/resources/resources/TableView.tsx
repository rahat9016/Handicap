/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusToggle } from "@/components/share/StatusToggle";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { usePost } from "@/hooks/usePost";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { Eye, SlidersHorizontal, SquarePen } from "lucide-react";
import { IResource, IResourceProps } from "../types/types";

export default function TableView({
  data,
  isLoading,
  handleEdit,
  handleView,
  setIsModalOpen,
  search,
  onSearchChange,
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
}: IResourceProps) {
  const { adminOrganizationPermission, hasPermission } = useAppSelector(
    (state) => state.permission
  );
  const { mutateAsync } = usePost(
    ``,
    (data) => {
      console.log("POST success", data);
    },
    [["resources"]]
  );
  const columns: ColumnDef<IResource>[] = [
    {
      header: "Title EN",
      accessorKey: "title",
      cell: (_value: any, row: IResource) => {
        return <div>{row?.title?.en && <span>{row.title.en}</span>}</div>;
      },
    },
    {
      header: "Title BN",
      accessorKey: "title",
      cell: (_value: any, row: IResource) => {
        return <div>{row?.title?.en && <span>{row.title.bn}</span>}</div>;
      },
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (_value: any, row: IResource) => {
        return (
          <div>{row?.description?.en && <span>{row.description.en}</span>}</div>
        );
      },
    },
    {
      header: "organization",
      accessorKey: "organization",
      cell: (_value: any, row: any) => {
        return <span>{row?.organization?.name}</span>;
      },
    },
    { header: "Download Count", accessorKey: "totalDownloadCount" },
    { header: "View Count", accessorKey: "totalViewCount" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value: string) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    {
      header: "Is Active",
      accessorKey: "isCurrent",
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
    {
      header: "Is Approved",
      accessorKey: "isApproved",
      cell: (value: boolean) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Approved" : "Unapproved"}
          </span>
        );
      },
    },
    {
      header: "Visibility",
      accessorKey: "isPrivate",
      cell: (value: boolean) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Private" : "Public"}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "actions",
      cell: (_value: any, row: IResource) => {
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
    hasPermission && {
      header: "Approval",
      accessorKey: "actions",
      cell: (_value: any, row: IResource) => {
        return (
          <div className="flex items-center gap-5">
            <StatusToggle
              id={10}
              status={row.isApproved}
              onConfirm={async (_id, newStatus) => {
                await mutateAsync({
                  endpoint: `/resources/toggle-approved/${row.id}`,
                  data: { isApproved: newStatus },
                });
              }}
              levelValue_1="Approved"
              levelValue_2="Unapproved"
            />
          </div>
        );
      },
    },
  ].filter(Boolean) as ColumnDef<IResource>[];
  return (
    <div>
      <DataTable
        columns={columns}
        data={Array.isArray(data) ? data : []}
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
        onSearchChange={onSearchChange}
        IsCreate={adminOrganizationPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
    </div>
  );
}
