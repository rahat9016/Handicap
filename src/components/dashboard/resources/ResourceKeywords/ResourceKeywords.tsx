"use client";

import DeleteDialog from "@/components/common/DeleteDialog";
import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useDelete } from "@/hooks/useDelete";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { format } from "date-fns";
import { Hash, Plus, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateUpdateKeywords from "./CreateUpdateKeywords";
import { IKeywords } from "./types/Keywords";

export default function ResourceKeywords() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<IKeywords | undefined>();
  const [deleteKeywords, setDeleteKeywords] = useState<IKeywords | undefined>();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet<IKeywords[]>(
    "/resource-keywords",
    ["resource-keywords", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }
  );
  const {
      mutateAsync: deleteAsync,
      isPending: isDeleting, 
    } = useDelete(
      (data) => {
        console.log("DELETE success", data);
      },
      [["resource-keywords"]]
    );

  const handleEdit = (row: IKeywords) => {
    setKeywords(row);
    setIsModalOpen(true);
  };
  const handleDelete = (row: IKeywords) => {
    setDeleteKeywords(row);
  }; 

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<IKeywords>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
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
            <button
              onClick={() => handleDelete(row)}
              className="text-darkLiver hover:text-rose-600 hover:underline text-sm flex items-center gap-1"
            >
              <Trash2 size={16} className="text-rose-600" />
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <div className="flex w-full items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-dashboard-primary rounded-lg flex items-center justify-center text-white">
            <Hash />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-erieBlack font-inter">
              Resource Keywords
            </h1>
            <p className="font-inter text-xs">Manage resource keywords</p>
          </div>
        </div>
        <Button
          className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11 gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="!text-2xl text-white" /> Create
        </Button>
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
      <CreateUpdateKeywords
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        initialValues={keywords}
      />
      <DeleteDialog
        open={!!deleteKeywords}
        onOpenChange={(open) => !open && setDeleteKeywords(undefined)}
        loading={isDeleting}
        onConfirm={() => {
          if (deleteKeywords) {
            deleteAsync({ url: `/resource-keywords/${deleteKeywords.id}` }).then(() => {
              toast.success("Keyword deleted successfully");
              setDeleteKeywords(undefined);
            }).catch((error) => {
              toast.error("Failed to delete keyword");
              console.error(error);
            });
          }
        }}
      />
    </div>
  );
}
