"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { format } from "date-fns";
import { UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUpdateRole from "./CreateUpdateRoles";
import { IRole } from "./types/Role";
export default function Roles() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { search, handleSearchChange, debouncedSearch } =
      useSearchDebounce(300);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage
  } = usePagination();
  const { data, isLoading } = useGet<IRole[]>(
    "/roles",
    ["roles", currentPage.toString()],
    {
    ...(itemsPerPage !== -1 && {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }),
    search: debouncedSearch,
  }
  );

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        icon={<UserCog />}
        title="Roles"
        subtitle="Manage role accounts"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        // IsCreate // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateRole
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          
        }}
        // initialValues={role}
      />
      
    </div>
  );
}
