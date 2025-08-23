"use client";
import Pagination from "@/components/share/Pagination";
import TableTopBarHeader from "@/components/share/TableTopBarHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { Eye, Plus, SlidersHorizontal, SquarePen } from "lucide-react";
import Image from "next/image";
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
    setItemsPerPage,
    setTotalItems,
  } = usePagination();

  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);
  const endpoint = organizationId
    ? `/resources/organization/${organizationId}`
    : "/resources";
  const shouldFetch = organizationId !== undefined;

  const { data } = useGet(
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
  // // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  // const columns: ColumnDef<IResource>[] = [
  //   { header: "Resource Title", accessorKey: "title" },
  //   { header: "Description", accessorKey: "description" },
  //   { header: "Download Count", accessorKey: "downloadCount" },
  //   { header: "View Count", accessorKey: "viewCount" },
  //   {
  //     header: "Created date",
  //     accessorKey: "createdAt",
  //     cell: (value) => {
  //       const date = new Date(value as string);
  //       return <span>{format(date, "dd MMM yyyy")}</span>;
  //     },
  //   },
  //   {
  //     header: "Is Active",
  //     accessorKey: "isCurrent",
  //     cell: (value) => {
  //       const isActive = value;

  //       return (
  //         <span
  //           className={`px-2 py-1 rounded-full text-xs font-medium ${
  //             isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
  //           }`}
  //         >
  //           {isActive ? "Active" : "Inactive"}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     header: "Is Private",
  //     accessorKey: "isPrivate",
  //     cell: (value) => {
  //       const isActive = value;

  //       return (
  //         <span
  //           className={`px-2 py-1 rounded-full text-xs font-medium ${
  //             isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
  //           }`}
  //         >
  //           {isActive ? "Active" : "Inactive"}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     header: "Action",
  //     accessorKey: "actions",
  //     cell: (_value, row: IResource) => {
  //       return (
  //         <div className="flex items-center gap-5">
  //           {adminOrganizationPermission && (
  //             <button
  //               onClick={() => handleEdit(row)}
  //               className="text-darkLiver hover:underline text-sm flex items-center gap-1"
  //             >
  //               <SquarePen size={16} />
  //               Edit
  //             </button>
  //           )}
  //           <button
  //             onClick={() => handleView(row)}
  //             className="text-darkLiver hover:underline text-sm flex items-center gap-1"
  //           >
  //             <Eye size={16} />
  //             View
  //           </button>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <div className="flex items-center gap-4">
        <TableTopBarHeader
          icon={<SlidersHorizontal />}
          title={"All Resources"}
          subtitle={"Manage Resources"}
          searchValue={search}
          onSearchChange={handleSearchChange}
          showSearch
          searchPlaceholder={"Search resources..."}
        />
        {adminOrganizationPermission && (
          <Button
            className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11 gap-1 !px-6"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="!text-2xl text-white" /> Create
          </Button>
        )}
      </div>
      <div className="grid grid-cols-6 gap-4 border-t mt-4 pt-4">
        {Array.isArray(data?.data) &&
          data?.data?.map((resource: IResource) => (
            <div
              key={resource.id}
              className="relative hover:bg-slate-50 rounded-lg p-4 cursor-pointer group"
            >
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {adminOrganizationPermission && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(resource);
                          }}
                          className="p-1 rounded-sm bg-white shadow"
                        >
                          <SquarePen size={18} className="text-black" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-dashboard-primary text-white px-3 py-1 rounded-md shadow">
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(resource);
                        }}
                        className="p-1 rounded-sm bg-white shadow "
                      >
                        <Eye size={18} className="text-black" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-dashboard-primary text-white px-3 py-1 rounded-md shadow">
                      <p>View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Image
                src="/folder.png"
                alt="folder"
                width={160}
                height={160}
                className="mx-auto"
              />
              <p className="truncate text-sm px-4">{resource.title}</p>
            </div>
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setItemsPerPage={setItemsPerPage}
      />
      {/* <DataTable
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
      /> */}
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
