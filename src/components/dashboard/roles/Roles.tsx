/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { format } from "date-fns";
import { EllipsisVertical, FilePenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import CreateUpdateRole from "./CreateUpdateRoles";
import { IRole } from "./types/Role";
export default function Roles() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [role, setRole] = useState<IRole>();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet<IRole[]>(
    "/roles",
    ["roles", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }
  );

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  // const handleEdit = (row: IRole) => {
  //   setRole(row);
  //   setIsModalOpen(true);
  // };
  // const handleView = (row: IRole) => {
  //   setRole(row);
  //   setIsView(true);
  // };
  const columns: ColumnDef<IRole>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Role", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    { header: "Parent Role ID", accessorKey: "parentRoleId" },
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
      accessorKey: "isSystemRole",
      cell: (value) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive
                ? "bg-[#bfffda] text-green"
                : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Active" : "Inactive  "}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: () => {
      // const role = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 border border-skeleton rounded bg-[#F5F5F5] cursor-pointer">
              <EllipsisVertical className="text-lg text-darkLiver" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => {
                // your edit logic here
                console.log("Edit clicked:", role);
              }}
              className="flex items-center gap-1 cursor-pointer text-darkLiver font-inter font-normal text-sm"
            >
              <FilePenLine />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    },
  ];
  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-erieBlack font-inter">Users</h1>
      </div>
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      <CreateUpdateRole
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRole(undefined);
        }}
        // initialValues={role}
      />
      
    </div>
  );
}
