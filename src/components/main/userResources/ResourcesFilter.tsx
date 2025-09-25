"use client";
import { IResource } from "@/components/dashboard/resources/types/types";
import Pagination from "@/components/share/Pagination";
import SectionTopTitle from "@/components/share/SectionTopTitle";
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
import { useEffect, useState } from "react";
import ResourceCardSkeleton from "./ResourceCardSkeleton";
import ResourceLibrary from "./ResourceLibrary";
import ResourcesSorting from "./ResourcesSorting";
import { Button } from "@/components/ui/button";

const ResourcesFilter = () => {
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
  const { resourceTypes, languages, sortBy, keywords } = useAppSelector(
    (state) => state.filter
  );

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filters = {
    sort: sortBy,
    categoryIds: resourceTypes,
    languageIds: languages,
    keywordIds: keywords,
    search: debouncedSearch,
  };

  const queryString = buildQueryParams(filters, {
    ...(itemsPerPage !== -1 && {
      page: currentPage,
      limit: itemsPerPage,
    }),
  });

  // API call
  const { data, isLoading, refetch } = useGet<IResource[]>(
    `/resources?${queryString}`,
    ["resources", queryString]
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="container px-4 sm:px-6 lg:px-8 py-8 lg:py-16 xl:py-20">
        <SectionTopTitle
          title="Resource Library"
          desc="Access our comprehensive collection of disability inclusion resources, including guidelines, training materials, research reports, and tools."
        />
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-6 mt-8">
          <Button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="bg-[#2A53CD] hover:bg-[#0490EF] text-white"
            variant="default"
          >
            {isFiltersOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 xl:gap-20 mt-8 lg:mt-14">
          {/* Filters Sidebar */}
          <div className={`
            w-full lg:w-80 xl:w-[300px] 
            ${isFiltersOpen ? 'block' : 'hidden lg:block'}
            lg:sticky lg:top-32 self-start overflow-y-auto custom-scrollbar 
            max-h-[80vh] lg:max-h-[75vh] bg-white border p-4 rounded-md
            z-10 lg:z-auto
          `}>
            <ResourcesSorting />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[calc(100%-320px)] xl:w-10/12 lg:ml-auto">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <span className="text-sm whitespace-nowrap">Rows per page:</span>
                <Select
                  value={itemsPerPage === -1 ? "all" : itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage?.(value)}
                >
                  <SelectTrigger className="w-[80px] sm:w-[100px]">
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
              
              <div className="w-full sm:w-auto order-1 sm:order-2">
                <div className="relative w-full sm:w-64 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search here..."
                    value={search}
                    onChange={handleSearchChange}
                    className="border pl-10 pr-4 py-2 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="border-t pt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {Array.from({ length: 6 }, (_, index) => (
                    <ResourceCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div>
                  <ResourceLibrary
                    resources={(data?.data as IResource[]) || []}
                    refetch={refetch}
                  />
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      setItemsPerPage={setItemsPerPage}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesFilter;