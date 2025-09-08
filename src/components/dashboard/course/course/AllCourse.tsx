"use client";
import { ICourse } from "@/components/main/training/types/traning";
import { IOrganization } from "@/components/organizer/types";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import {
  EllipsisVertical,
  MessageCircleQuestionMark,
  Shapes,
  SquarePen,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import CreateUpdateCourseQuiz from "./CreateUpdateCourseQuiz";

export default function AllCourse() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { organizationId } = useAppSelector((state) => state.organizer);
  const { adminOrganizationPermission, hasPermission } = useAppSelector(
    (state) => state.permission
  );
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
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
  const { data: organizationsData } = useGet<IOrganization[]>(
    "/organizations",
    ["organizations"],
    {},
    { enabled: hasPermission }
  );
  const endpoint = selectedId
    ? `/course/organization/${selectedId}`
    : organizationId
    ? `/course/organization/${organizationId}`
    : "/course";
  const shouldFetch = selectedId !== undefined || organizationId !== undefined;

  const { data, isLoading } = useGet<ICourse[]>(
    endpoint,
    [
      "courseList",
      currentPage.toString(),
      selectedId ?? organizationId ?? "all",
    ],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    },
    { enabled: shouldFetch }
  );

  // // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<ICourse>[] = useMemo(() => {
  return [
    {
      header: "Thumbnail",
      accessorKey: "thumbnailUrl",
      cell: (_value: string | number | undefined, row: ICourse) => (
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
      ),
    },
    { header: "Resource Title", accessorKey: "title" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Category",
      accessorKey: "CourseCategory",
      cell: (_value: string | number | undefined, row: ICourse) => <span>{row?.CourseCategory?.name}</span>,
    },
    {
      header: "Organization",
      accessorKey: "organization",
      cell: (_value: string | number | undefined, row: ICourse) => <span>{row?.organization?.name}</span>,
    },
    { header: "Duration ", accessorKey: "durationMinutes" },
    { header: "Objectives", accessorKey: "objectives" },
    {
      header: "Is Active",
      accessorKey: "isActive",
      cell: (value: boolean | undefined) => {
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value ? "bg-[#bfffda] text-green" : "bg-rose-200 text-rose-700"
            }`}
          >
            {value ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    adminOrganizationPermission
      ? {
          header: "Action",
          accessorKey: "id",
          cell: (value: string | number | undefined) => {
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 border border-skeleton rounded bg-[#F5F5F5] cursor-pointer">
                    <EllipsisVertical className="text-lg text-darkLiver" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/course/course-video-upload/${value}`)}
                    className="flex items-center gap-1 text-darkLiver font-inter font-normal text-sm"
                  >
                    <Video />
                    Add Video
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/course/course-quiz-upload/${value}`)}
                    // onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1 text-darkLiver font-inter font-normal text-sm"
                  >
                    <MessageCircleQuestionMark />
                    Add Quiz
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/course/course-update/${value}`)}
                    className="flex items-center gap-1 text-darkLiver font-inter font-normal text-sm"
                  >
                    <SquarePen />
                    Edit Course
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        }
      : undefined,
  ].filter(Boolean) as ColumnDef<ICourse>[];
}, [adminOrganizationPermission, router]);


  const options = mapToSelectOptions(organizationsData?.data, "name", "id");

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
        IsCreate={adminOrganizationPermission} // [If you need a create button, just pass true as a props]
        // setIsModalOpen={setIsModalOpen} // [create modal open state]
        routeURL="/admin/course/course-create" // [If you need to navigate to a different page, just pass the route URL as a props]
        options={options}
        setSelectedId={setSelectedId}
      />
      <CreateUpdateCourseQuiz
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
