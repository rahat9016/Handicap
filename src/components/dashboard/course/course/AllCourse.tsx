"use client";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { Shapes } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { ICourse } from "../types/types";

export default function AllCourse() {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [open, setOpen] = useState(false);
// console.log(isModalOpen)
  // const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  // const [resource, setResource] = useState<IResource | undefined>(undefined);
  // const [isView, setIsView] = useState<boolean>(false);
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
  // const endpoint = selectedId
  //   ? `/resources/organization/${selectedId}`
  //   : organizationId
  //   ? `/resources/organization/${organizationId}`
  //   : "/course";

  const shouldFetch = organizationId !== undefined;

  const { data, isLoading } = useGet<ICourse[]>(
    "/course",
    ["courseList", currentPage.toString(), organizationId ?? "all"],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    },
    { enabled: shouldFetch }
  );

  // const handleEdit = (row: IResource) => {
  //   navigate.push(`/admin/resources/${row.id}`);
  // };
  // const handleView = (row: IResource) => {
  //   setResource(row);
  //   setIsView(true);
  // };
  // // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<ICourse>[] = [
    {
      header: "Thumbnail",
      accessorKey: "thumbnailUrl",
      cell: (_value, row) => {
        return (
          <div className="w-14 h-14 p-1 border flex items-center justify-center rounded-md cursor-pointer hover:opacity-80">
            {row?.thumbnailUrl && (
              <Image
                src={row.thumbnailUrl}
                width={44}
                height={44}
                alt="thumbnail"
                className="rounded"
              />
            )}
          </div>
        );
      },
    },
    { header: "Resource Title", accessorKey: "title" },
    { header: "Description", accessorKey: "description" },
    {
      header: "organization",
      accessorKey: "organization",
      cell: (_value, row) => {
        return <span>{row?.organization?.name}</span>;
      },
    },
    { header: "Duration ", accessorKey: "durationMinutes" },
    { header: "Objectives", accessorKey: "objectives" },

    {
      header: "Is Active",
      accessorKey: "isActive",
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
        icon={<Shapes />}
        title="Course"
        subtitle="Manage course"
        showSearch
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
        routeURL="/admin/course/course-create" // [If you need to navigate to a different page, just pass the route URL as a props]
      />
      {/* <CreateUpdateResources
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          // setResource(undefined);
        }}
        // initialValues={resource}
      /> */}

      {/* {resource && (
        <ViewResourceDetails
          isOpen={isView}
          onClose={() => {
            setIsView(false);
            setResource(undefined);
          }}
          resource={resource}
        />
      )} */}
    </div>
  );
}
