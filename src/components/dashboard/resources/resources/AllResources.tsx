/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import DeleteDialog from "@/components/common/DeleteDialog";
import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useDelete } from "@/hooks/useDelete";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { format } from "date-fns";
import { Eye, Plus, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IResource } from "../types/types";
import CreateUpdateResources from "./CreateUpdateResources";
import ViewResourceDetails from "./ViewDetails";

export default function AllResources() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [resource, setResource] = useState<IResource | undefined>(undefined);
  const [deleteKeywords, setDeleteKeywords] = useState<IResource | undefined>();
  const [isView, setIsView] = useState<boolean>(false);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet(
    "/resources",
    ["resources", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }
  );
  const { mutateAsync: deleteAsync, isPending: isDeleting } = useDelete(
    (data) => {
      console.log("DELETE success", data);
    },
    [["rresources"]]
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
      header: "Action",
      accessorKey: "id",
      cell: (_value, row: IResource) => {
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
            <button
              onClick={() => setDeleteKeywords(row)}
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
        <h1 className="text-xl font-bold text-erieBlack font-inter">
          All Resources
        </h1>
        <Button
          className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11 gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="!text-2xl text-white" /> Create
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? (data.data as IResource[]) : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
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

      <DeleteDialog
        open={!!deleteKeywords}
        onOpenChange={(open) => !open && setDeleteKeywords(undefined)}
        loading={isDeleting}
        onConfirm={() => {
          if (deleteKeywords) {
            deleteAsync({ url: `/resources/${deleteKeywords.id}` })
              .then(() => {
                toast.success("Resource deleted successfully");
                setDeleteKeywords(undefined);
              })
              .catch((error) => {
                toast.error("Failed to delete resource");
                console.error(error);
              });
          }
        }}
      />
    </div>
  );
}
