"use client";
import Toolbar from "@/components/common/Toolbar";
import { IResource } from "@/components/dashboard/resources/types/types";
import Pagination from "@/components/share/Pagination";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResourceCardSkeleton from "./ResourceCardSkeleton";
import ResourceLibrary from "./ResourceLibrary";
import ResourcesSorting from "./ResourcesSorting";

const ResourcesFilter = () => {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { search, handleSearchChange, debouncedSearch, setSearch } =
    useSearchDebounce(300);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();
  const { resourceTypes, languages, sortBy, keywords, featured, IsSuggested } = useAppSelector(
    (state) => state.filter
  );

  const searchQuery = searchParams.get("search") || "";

  const filters = {
    sort: sortBy,
    categoryIds: resourceTypes,
    languageIds: languages,
    keywordIds: keywords,
    search: debouncedSearch || searchQuery,
    IsSuggested: IsSuggested,
    featured
  };

  const queryString = buildQueryParams(filters, {
    ...(itemsPerPage !== -1 && {
      page: currentPage,
      limit: itemsPerPage,
    }),
  });

  // API call
  const { data, isLoading, refetch } = useGet<IResource[]>(
    `/resources?${queryString}&isApproved=true`,
    ["resources", queryString]
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (searchQuery) setSearch(searchQuery);
  }, [searchQuery, setSearch]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="container px-4 sm:px-6 lg:px-8 py-0 lg:pb-16 xl:pb-20">
        <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6 xl:gap-8 mt-8 lg:mt-14">
          <div
            className={`
            w-full lg:w-80 xl:w-[300px] 
            ${isFiltersOpen ? "block" : "hidden lg:block"}
            lg:sticky lg:top-48 self-start overflow-y-auto custom-scrollbar 
            max-h-[80vh] lg:max-h-[75vh] bg-white border p-4 rounded-md
            z-10 lg:z-auto shadow-lg lg:shadow-none
          `}
          >
            <ResourcesSorting />
          </div>

          <div className="w-full lg:w-[calc(100%-320px)] xl:w-10/12 lg:ml-auto">
            <Toolbar
              search={search}
              onSearchChange={handleSearchChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              isFiltersOpen={isFiltersOpen}
              onToggleFilters={() => setIsFiltersOpen((prev) => !prev)}
            />
            <div className="pt-4">
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
                    viewMode={viewMode}
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
        {isFiltersOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
            onClick={() => setIsFiltersOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ResourcesFilter;
