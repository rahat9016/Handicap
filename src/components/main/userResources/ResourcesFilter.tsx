"use client";
import { IResource } from "@/components/dashboard/resources/types/types";
import Pagination from "@/components/share/Pagination";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useEffect } from "react";
import ResourceCardSkeleton from "./ResourceCardSkeleton";
import ResourceLibrary from "./ResourceLibrary";
import ResourcesSorting from "./ResourcesSorting";

export default function ResourcesFilter() {
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet<IResource[]>(
    "/resources",
    ["resources", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div>
      <div className="container py-10 lg:py-20">
        <SectionTopTitle
          title="Resource Library"
          desc="Access our comprehensive collection of disability inclusion resources, including guidelines, training materials, research reports, and tools."
        />
        <div className="flex items-start gap-28 mt-14">
          <div className="w-2/12">
            <ResourcesSorting />
          </div>
          <div className="w-10/12">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: 8 }, (_, index) => (
                  <ResourceCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div>
                <ResourceLibrary
                  resources={(data?.data as IResource[]) || []}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
