"use client";
import Pagination from "@/components/share/Pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { Search } from "lucide-react";
import { useEffect } from "react";
import ResourceCardSkeleton from "../userResources/ResourceCardSkeleton";
import CourseLibrary from "./CourseLibrary";
import TrainingSorting from "./TrainingSorting";
import { ICourse } from "./types/traning";

export default function Courses() {
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
  const { courseCategories, sortBy, level, organizationIds } = useAppSelector(
    (state) => state.filter
  );

  const filters = {
    sort: sortBy,
    categoryIds: courseCategories,
    level: level,
    organizationIds: organizationIds,
    search: debouncedSearch,
  };

  const queryString = buildQueryParams(filters, {
    ...(itemsPerPage !== -1 && {
      page: currentPage,
      limit: itemsPerPage,
    }),
  });

  // API call
  const { data, isLoading } = useGet<ICourse[]>(
    `/course/published?${queryString}`,
    ["course-published", queryString]
  );
  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="bg-[#f3f3f3]">
      <div className="container py-10 lg:py-20 lg:pb-40">
        <div className="flex items-start gap-20">
          <div className="w-[300px] sticky top-40 self-start overflow-y-auto custom-scrollbar h-[75vh] bg-white border p-4 rounded-md">
            <TrainingSorting />
          </div>
          <div className="w-10/12 ml-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Rows per page:</span>
                <Select
                  value={itemsPerPage === -1 ? "all" : itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage?.(value)}
                  
                >
                  <SelectTrigger className="w-[80px] bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {[10, 20, 30, 40, 50].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="ml-auto flex items-center mb-4 w-[300px] border px-2 rounded-md bg-white">
                <Search />
                <Input
                  placeholder="Search here..."
                  value={search}
                  onChange={handleSearchChange}
                  className="border-none shadow-none"
                />
              </div>
            </div>
            <div className="border-t pt-4">
              {isLoading ? (
                <div className="grid grid-cols-3 gap-6">
                  {Array.from({ length: 10 }, (_, index) => (
                    <ResourceCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div>
                  <CourseLibrary
                    courses={(data?.data as ICourse[]) || []}
                    // refetch={refetch}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    setItemsPerPage={setItemsPerPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex items-start gap-6">
          <div className="w-3/12 lg:w-2/12">
            <CoursesFilter />
          </div>
          <div className="w-9/12 lg:w-10/12">
            <CoursesList />
          </div>
        </div> */}
      </div>
    </div>
  );
}
