/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { Eye, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { IUser } from "../organizer/types";
import CreateUpdateUser from "./CreateUpdateUsers";
import ViewDetails from "./ViewDetails";

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet<IUser>(
    "/user",
    ["user", currentPage.toString()],
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

  const handleEdit = (row: IUser) => {
    setUser(row);
    setIsModalOpen(true);
  };
  const handleView = (row: IUser) => {
    setUser(row);
    setIsView(true);
  };
  const columns: ColumnDef<IUser>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "phone", accessorKey: "phone" },
    { header: "User Role", accessorKey: "roleName" },
    {
      header: "Is Active",
      accessorKey: "accountStatus",
      cell: (value) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive == "ACTIVE"
                ? "bg-[#bfffda] text-green"
                : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive}
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
              Edit Role
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
      <CreateUpdateUser
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUser(undefined);
        }}
        initialValues={user}
      />
      {user && (
        <ViewDetails
          isOpen={isView}
          onClose={() => {
            setIsView(false);
            setUser(undefined);
          }}
          user={user}
        />
      )}
    </div>
  );
}
