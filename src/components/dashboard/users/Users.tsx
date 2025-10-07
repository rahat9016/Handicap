"use client";
import { IUser } from "@/components/organizer/types";
import { StatusToggle } from "@/components/share/StatusToggle";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { usePatch } from "@/hooks/usePatch";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { Eye, SquarePen, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateUser from "./CreateUpdateUsers";
import ViewDetails from "./ViewDetails";
export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  // const [selectedUser, setSelectedUser] = useState<any>(null); // row currently selected
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();
  const { data, isLoading } = useGet<IUser>(
    "/user",
    ["user", currentPage.toString()],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );
  const { mutateAsync } = usePatch<IUser[]>(
    (data) => console.log("Success", data),
    [["user"]]
  );

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    { header: "First Name", accessorKey: "firstName", sortable: true },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Email", accessorKey: "email", sortable: true },
    { header: "Phone", accessorKey: "phone" },
    { header: "User Role", accessorKey: "roleName" },

    {
      header: "Action",
      accessorKey: "actions",
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
    {
      header: "Is Active",
      accessorKey: "accountStatus",
      cell: (_value, row) => {
        return (
          <StatusToggle
            id={row.id}
            status={row.status}
            onConfirm={async (id, newStatus) => {
              await mutateAsync({
                url: `/user/${id}/status`,
                data: { status: newStatus },
              });
            }}
          />
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
        icon={<UsersIcon />}
        title="Users"
        subtitle="Manage user accounts"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        // IsCreate // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
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
