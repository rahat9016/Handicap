/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Toolbar from "@/components/common/Toolbar";
import Pagination from "@/components/share/Pagination";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useAppSelector } from "@/lib/redux/hooks";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { useEffect, useState } from "react";
import EventCardSkeleton from "./EventCardSkeleton";
import EventLibrary from "./EventLibrary";
import EventsSorting from "./EventsSorting";
import { IEventItem } from "./types/interface";

const Events = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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
  const { eventCategories } = useAppSelector(
    (state) => state.filter
  );

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filters = {
    categoryIds: eventCategories,
    search: debouncedSearch,
  };

  const queryString = buildQueryParams(filters, {
    ...(itemsPerPage !== -1 && {
      page: currentPage,
      limit: itemsPerPage,
    }),
  });

  // API call
  const { data, isLoading } = useGet<IEventItem[]>(
    `/events?isPublished=true&${queryString}`,
    ["events", queryString]
  );
  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-[#f3f3f3]">
      <div className="container px-4 sm:px-6 lg:px-8 py-0 lg:pb-16 xl:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-start  gap-5 lg:gap-6 xl:gap-8 pt-8 lg:pt-14">
          <div
            className={`
            w-full lg:w-80 xl:w-[300px] 
            ${isFiltersOpen ? "block" : "hidden lg:block"}
            lg:sticky lg:top-48 self-start overflow-y-auto custom-scrollbar 
            max-h-[80vh] lg:max-h-[75vh] bg-white border p-4 rounded-md
            z-10 lg:z-auto shadow-lg lg:shadow-none
          `}
          >
            <EventsSorting />
          </div>
          <div className="w-full lg:w-10/12 lg:ml-auto">
            <Toolbar
              search={search}
              onSearchChange={handleSearchChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              isFiltersOpen={isFiltersOpen}
              onToggleFilters={() => setIsFiltersOpen((prev) => !prev)}
            />
            <div className="pt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {Array.from({ length: 6 }, (_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div>
                  <EventLibrary
                    events={(data?.data as IEventItem[]) || []}
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
      </div>
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                ✕
              </button>
            </div>
            <EventsSorting />
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 bg-[#2A53CD] hover:bg-[#0490EF] text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
