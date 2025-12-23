// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { StatusToggle } from "@/components/share/StatusToggle";
// import { ColumnDef, DataTable } from "@/components/ui/data-table";
// import { usePost } from "@/hooks/usePost";
// import { useAppSelector } from "@/lib/redux/hooks";
// import { format } from "date-fns";
// import { Eye, SlidersHorizontal, SquarePen } from "lucide-react";
// import { IResource, IResourceProps } from "../types/types";

// export default function TableView({
//   data,
//   isLoading,
//   handleEdit,
//   handleView,
//   setIsModalOpen,
//   search,
//   onSearchChange,
//   currentPage,
//   setCurrentPage,
//   totalItems,
//   itemsPerPage,
//   setItemsPerPage,
// }: IResourceProps) {
//   const { adminOrganizationPermission, hasPermission } = useAppSelector(
//     (state) => state.permission
//   );
//   const { mutateAsync } = usePost(
//     ``,
//     (data) => {
//       console.log("POST success", data);
//     },
//     [["resources"]]
//   );
//   const columns: ColumnDef<IResource>[] = [
//     {
//       header: "Title EN",
//       accessorKey: "title",
//       cell: (_value: any, row: IResource) => {
//         return <div>{row?.title?.en && <span>{row.title.en}</span>}</div>;
//       },
//     },
//     {
//       header: "Title BN",
//       accessorKey: "title",
//       cell: (_value: any, row: IResource) => {
//         return <div>{row?.title?.en && <span>{row.title.bn}</span>}</div>;
//       },
//     },
//     // {
//     //   header: "Description",
//     //   accessorKey: "description",
//     //   cell: (_value: any, row: IResource) => {
//     //     return (
//     //       <div>{row?.description?.en && <span>{row.description.en}</span>}</div>
//     //     );
//     //   },
//     // },
//     {
//       header: "Organization",
//       accessorKey: "organization",
//       cell: (_value: any, row: any) => {
//         return <span>{row?.organization?.name}</span>;
//       },
//     },
//     { header: "Download Count", accessorKey: "totalDownloadCount" },
//     { header: "View Count", accessorKey: "totalViewCount" },
//     {
//       header: "Created date",
//       accessorKey: "createdAt",
//       cell: (value: string) => {
//         const date = new Date(value as string);
//         return <span>{format(date, "dd MMM yyyy")}</span>;
//       },
//     },
//     {
//       header: "Is Active",
//       accessorKey: "isCurrent",
//       cell: (value: boolean) => {
//         const isActive = value;

//         return (
//           <span
//             className={`px-2 py-1 rounded-full text-xs font-medium ${
//               isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
//             }`}
//           >
//             {isActive ? "Active" : "Inactive"}
//           </span>
//         );
//       },
//     },
//     {
//       header: "Is Approved",
//       accessorKey: "isApproved",
//       cell: (value: boolean) => {
//         const isActive = value;

//         return (
//           <span
//             className={`px-2 py-1 rounded-full text-xs font-medium ${
//               isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
//             }`}
//           >
//             {isActive ? "Approved" : "Unapproved"}
//           </span>
//         );
//       },
//     },
//     {
//       header: "Visibility",
//       accessorKey: "isPrivate",
//       cell: (value: boolean) => {
//         const isActive = value;

//         return (
//           <span
//             className={`px-2 py-1 rounded-full text-xs font-medium ${
//               isActive ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
//             }`}
//           >
//             {isActive ? "Private" : "Public"}
//           </span>
//         );
//       },
//     },
//     hasPermission && {
//       header: "Feature",
//       accessorKey: "actions",
//       cell: (_value: any, row: IResource) => {
//         return (
//           <div  className="flex items-center gap-5">
//             <StatusToggle
//               id={10}
//               status={row.featured}
//               onConfirm={async (_id, newStatus) => {
//                 await mutateAsync({
//                   endpoint: `/resources/toggle-featured/${row.id}`,
//                   data: { featured: newStatus },
//                 });
//               }}
//               levelValue_1="Featured"
//               levelValue_2="Not Featured"
//             />
//           </div>
//         );
//       },
//     },
//     {
//       header: "Action",
//       accessorKey: "actions",
//       cell: (_value: any, row: IResource) => {
//         return (
//           <div className="flex items-center gap-5">
//             {adminOrganizationPermission && (
//               <button
//                 onClick={() => handleEdit(row)}
//                 className="text-darkLiver hover:underline text-sm flex items-center gap-1"
//               >
//                 <SquarePen size={16} />
//                 Edit
//               </button>
//             )}
//             <button
//               onClick={() => handleView(row)}
//               className="text-darkLiver hover:underline text-sm flex items-center gap-1"
//             >
//               <Eye size={16} />
//               View
//             </button>
//           </div>
//         );
//       },
//     },
//     hasPermission && {
//       header: "Approval",
//       accessorKey: "actions",
//       cell: (_value: any, row: IResource) => {
//         return (
//           <div className="flex items-center gap-5">
//             <StatusToggle
//               id={10}
//               status={row.isApproved}
//               onConfirm={async (_id, newStatus) => {
//                 await mutateAsync({
//                   endpoint: `/resources/toggle-approved/${row.id}`,
//                   data: { isApproved: newStatus },
//                 });
//               }}
//               levelValue_1="Approved"
//               levelValue_2="Unapproved"
//             />
//           </div>
//         );
//       },
//     },
//   ].filter(Boolean) as ColumnDef<IResource>[];
//   return (
//     <div>
//       <DataTable
//         columns={columns}
//         data={Array.isArray(data) ? data : []}
//         isLoading={isLoading}
//         totalItems={totalItems}
//         currentPage={currentPage}
//         itemsPerPage={itemsPerPage}
//         onPageChange={setCurrentPage}
//         setItemsPerPage={setItemsPerPage}
//         icon={<SlidersHorizontal />}
//         title="All Resources"
//         subtitle="Manage Resources"
//         showSearch
//         searchValue={search}
//         onSearchChange={onSearchChange}
//         IsCreate={adminOrganizationPermission} // [If you need a create button, just pass true as a props]
//         setIsModalOpen={setIsModalOpen} // [create modal open state]
//       />
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusToggle } from "@/components/share/StatusToggle";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePost } from "@/hooks/usePost";
import { useAppSelector } from "@/lib/redux/hooks";
import { format } from "date-fns";
import { Eye, MoreVertical, SlidersHorizontal, SquarePen } from "lucide-react";
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
      exportValue: (row: IResource) => row?.title?.en ?? "",
    },
    {
      header: "Title BN",
      accessorKey: "title",
      cell: (_value: any, row: IResource) => {
        return <div>{row?.title?.bn && <span>{row.title.bn}</span>}</div>;
      },
      exportValue: (row: IResource) => row?.title?.bn ?? "",
    },
    {
      header: "Organization",
      accessorKey: "organization",
      cell: (_value: any, row: any) => {
        return <span>{row?.organization?.name}</span>;
      },
      exportValue: (row: IResource) => row?.organization?.name ?? "",
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
      exportValue: (row: IResource) => row.isCurrent ? "Active" : "Inactive",
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
      exportValue: (row: IResource) => row.isApproved ? "Approved" : "Unapproved",
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
      exportValue: (row: IResource) => row.isPrivate ? "Private" : "Public",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (_value: any, row: IResource) => {
        return (
          <div className="flex items-center gap-2">
            {/* View button always visible */}
            <button
              onClick={() => handleView(row)}
              className="text-darkLiver hover:text-gray-700 p-1 rounded transition-colors"
              title="View details"
            >
              <Eye size={16} />
            </button>

            {/* Edit button if permission */}
            {adminOrganizationPermission && (
              <button
                onClick={() => handleEdit(row)}
                className="text-darkLiver hover:text-gray-700 p-1 rounded transition-colors"
                title="Edit"
              >
                <SquarePen size={16} />
              </button>
            )}

            {/* Dropdown for all toggles */}
            {hasPermission && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-1 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title="More actions"
                >
                  <MoreVertical size={16} className="sm:size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 sm:w-56 md:w-64 lg:w-72 max-w-[90vw] mx-2 sm:mx-0"
                sideOffset={4}
                collisionPadding={16}
              >
                <DropdownMenuItem
                  asChild
                  className="px-2 sm:px-3 py-2 sm:py-2.5 focus:bg-transparent" // Added focus:bg-transparent
                  onSelect={(e) => e.preventDefault()} // Prevent dropdown close on select
                >
                  <div
                    className="flex items-center justify-between w-full cursor-default gap-2 sm:gap-3"
                    onClick={(e) => e.stopPropagation()} // Stop click propagation
                  >
                    <span className="text-xs sm:text-sm font-medium truncate">
                      Featured
                    </span>
                    <div className="flex-shrink-0 scale-90 sm:scale-100">
                      <StatusToggle
                        id={`featured-${row.id}`}
                        status={row.featured}
                        onConfirm={async (_id, newStatus) => {
                          await mutateAsync({
                            endpoint: `/resources/toggle-featured/${row.id}`,
                            data: { featured: newStatus },
                          });
                        }}
                        levelValue_1="Featured"
                        levelValue_2="Not Featured"
                      />
                    </div>
                  </div>
                </DropdownMenuItem>

                {hasPermission && (
                  <DropdownMenuItem
                    asChild
                    className="px-2 sm:px-3 py-2 sm:py-2.5 focus:bg-transparent"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <div
                      className="flex items-center justify-between w-full cursor-default gap-2 sm:gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-xs sm:text-sm font-medium truncate">
                        Approval
                      </span>
                      <div className="flex-shrink-0 scale-90 sm:scale-100">
                        <StatusToggle
                          id={`approved-${row.id}`}
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
                    </div>
                  </DropdownMenuItem>
                )}


                <DropdownMenuItem
                  asChild
                  className="px-2 sm:px-3 py-2 sm:py-2.5 focus:bg-transparent"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div
                    className="flex items-center justify-between w-full cursor-default gap-2 sm:gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs sm:text-sm font-medium truncate">
                      Recommended
                    </span>
                    <div className="flex-shrink-0 scale-90 sm:scale-100">
                      <StatusToggle
                        id={`visibility-${row.id}`}
                        status={row?.isSuggested}
                        onConfirm={async (_id, newStatus) => {
                          await mutateAsync({
                            endpoint: `/resources/toggle-recommended/${row.id}`,
                            data: { isSuggested: newStatus },
                          });
                        }}
                        levelValue_1="Yes"
                        levelValue_2="No"
                      />
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>}
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
        IsCreate={adminOrganizationPermission}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
