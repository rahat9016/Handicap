/* eslint-disable react-hooks/exhaustive-deps */
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
import { ICourse } from "../training/types/traning";
import CourseLibrary from "../training/CourseLibrary";
import EventsSorting from "./EventsSorting";
import EventCalendar from "./EventCalendar";

const Events = () => {
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
  const { data, isLoading } = useGet<ICourse[]>(`/events?${queryString}`, [
    "events",
    queryString,
  ]);
  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="bg-[#f3f3f3]">
      <div className="container py-10 lg:py-20 lg:pb-40">
        <EventCalendar />
      </div>
    </div>
  );
};

export default Events;
