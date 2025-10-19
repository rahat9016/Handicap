"use client";

import DeleteDialog from "@/components/common/DeleteDialog";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useDelete } from "@/hooks/useDelete";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { Hash, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateUpdateTags from "./Form/CreateUpdateTags";
import { ITags } from "./types/Tags";

export default function NewsTags() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<ITags | undefined>();
  const [deleteTags, setDeleteTags] = useState<ITags | undefined>();
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
  const { data, isLoading } = useGet<ITags[]>(
    "/news-tag",
    ["news-tag", currentPage.toString()],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );
  const { mutateAsync: deleteAsync, isPending: isDeleting } = useDelete(
    (data) => {
      console.log("DELETE success", data);
    },
    [["news-tag"]]
  );
  const { hasPermission } = useAppSelector((state) => state.permission);

  const handleEdit = (row: ITags) => {
    setTags(row);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns: ColumnDef<ITags>[] = [
    { header: "Name", accessorKey: "name" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value: string | number | undefined) => {
        if (!value) return null;
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
    {
      header: "Is Active",
      accessorKey: "isActive",
      cell: (value: boolean | undefined) => {
        const isActive = value;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {isActive ? "Active" : "Inactive  "}
          </span>
        );
      },
    },
    hasPermission
      ? {
          header: "Action",
          accessorKey: "id",
          cell: (_value: string | number | undefined, row: ITags) => {
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
        }
      : undefined,
  ].filter(Boolean) as ColumnDef<ITags>[];

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
        icon={<Hash />}
        title="News Tags"
        subtitle="Manage news tags"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate={hasPermission} // [If you need a create button, just pass true as a props]
        setIsModalOpen={setIsModalOpen} // [create modal open state]
      />
      <CreateUpdateTags
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTags(undefined);
        }}
        initialValues={tags}
      />
      <DeleteDialog
        open={!!deleteTags}
        onOpenChange={(open) => !open && setDeleteTags(undefined)}
        loading={isDeleting}
        onConfirm={() => {
          if (deleteTags) {
            deleteAsync({ url: `/news-tag/${deleteTags.id}` })
              .then(() => {
                toast.success("Tags deleted successfully");
                setDeleteTags(undefined);
              })
              .catch((error) => {
                toast.error("Failed to delete Tags");
                console.error(error);
              });
          }
        }}
      />
    </div>
  );
}
