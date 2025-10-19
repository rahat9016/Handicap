/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Pagination from "@/components/share/Pagination";
import { Button } from "@/components/ui/button";
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
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ResourceCardSkeleton from "../main/userResources/ResourceCardSkeleton";
import NewsLibrary from "./NewsLibrary";
import NewsSorting from "./NewsSorting";
import { INews } from "./types/news";
import SectionTopTitle from "../share/SectionTopTitle";
import { useTranslations } from "next-intl";

const News = () => {
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
  const { newsCategories, sortBy, newsTags } = useAppSelector(
    (state) => state.filter
  );

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filters = {
    sort: sortBy,
    categoryIds: newsCategories,
    tagIds: newsTags,
    search: debouncedSearch,
  };

  const queryString = buildQueryParams(filters, {
    ...(itemsPerPage !== -1 && {
      page: currentPage,
      limit: itemsPerPage,
    }),
  });

  // API call
  const { data, isLoading } = useGet<INews[]>(`/news?${queryString}`, [
    "news",
    queryString,
  ]);

  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const t = useTranslations('News')

  return (
    <div className="bg-[#f3f3f3]">
      <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-20 lg:pb-40">
        <SectionTopTitle title={t("news")} desc={t("newsSectionDesc")} />
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-20 mt-8 lg:mt-14">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-full lg:w-[300px] lg:sticky lg:top-40 lg:self-start overflow-y-auto custom-scrollbar lg:h-[75vh] bg-white border p-4 rounded-md">
            <NewsSorting />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-10/12 lg:ml-auto">
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              {/* Rows per page */}
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">
                  Rows per page:
                </span>
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

              {/* Search Field - Always visible */}
              <div className="flex items-center w-full sm:w-[300px] border px-2 rounded-md bg-white">
                <Search className="min-w-[18px]" />
                <Input
                  placeholder="Search news..."
                  value={search}
                  onChange={handleSearchChange}
                  className="border-none shadow-none"
                />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex flex-col gap-4 mb-4">
              <div className="flex items-center gap-3">
                {/* Search Field */}
                <div className="flex-1 flex items-center border px-2 rounded-md bg-white">
                  <Search className="min-w-[18px]" />
                  <Input
                    placeholder="Search news..."
                    value={search}
                    onChange={handleSearchChange}
                    className="border-none shadow-none"
                  />
                </div>

                {/* Filter Button */}
                <div
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="bg-[#2A53CD] hover:bg-[#0490EF] text-white p-2 rounded-md shrink-0"
                >
                  <Filter className="w-6 h-6" />
                </div>
              </div>

              {/* Rows per page */}
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">
                  Rows per page:
                </span>
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
            </div>

            {/* News List */}
            <div className="border-t pt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }, (_, index) => (
                    <ResourceCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div>
                  <NewsLibrary news={(data?.data as INews[]) || []} />
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

      {/* Mobile Filter Modal */}
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
            <NewsSorting />
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

export default News;
