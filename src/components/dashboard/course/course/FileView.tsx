import Pagination from "@/components/share/Pagination";
import TableTopBarHeader from "@/components/share/TableTopBarHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/lib/redux/hooks";
import { Eye, Plus, SlidersHorizontal, SquarePen } from "lucide-react";
import Image from "next/image";
import { IResource, IResourceProps } from "../../resources/types/types";

export default function FileView({
  data,
  isLoading,
  handleEdit,
  handleView,
  setIsModalOpen,
  search,
  onSearchChange,
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
}: IResourceProps) {
  const { adminOrganizationPermission } = useAppSelector(
    (state) => state.permission
  );
  return (
    <div id="fileView">
      <div className="flex items-center gap-4">
        <TableTopBarHeader
          icon={<SlidersHorizontal />}
          title={"All Resources"}
          subtitle={"Manage Resources"}
          searchValue={search}
          onSearchChange={onSearchChange}
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
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border">
                <Skeleton className="w-[160px] h-[160px] mx-auto rounded-md" />
                <Skeleton className="h-4 mt-2 w-3/4 mx-auto" />
              </div>
            ))
          : data?.map((resource: IResource) => (
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
    </div>
  );
}
