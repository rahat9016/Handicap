"use client";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";
import { IResource } from "../types/types";
import CreateUpdateResources from "./CreateUpdateResources";
import ResourceTabs from "./ResourceTabs";
import ViewResourceDetails from "./ViewDetails";

export default function AllResources() {
  const navigate = useRouter();
  const [isView, setIsView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [resource, setResource] = useState<IResource | undefined>(undefined);
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
  const endpoint = selectedId
    ? `/resources/organization/${selectedId}`
    : organizationId
    ? `/resources/organization/${organizationId}`
    : "/resources";

  const shouldFetch = selectedId !== undefined || organizationId !== undefined;

  const { data, isLoading } = useGet(
    endpoint,
    [
      "resources",
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

  const handleEdit = (row: IResource) => {
    navigate.push(`/admin/resources/${row.id}`);
  };
  const handleView = (row: IResource) => {
    setResource(row);
    setIsView(true);
  };
  
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <ResourceTabs
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        handleEdit={handleEdit}
        handleView={handleView}
        setIsModalOpen={setIsModalOpen}
        search={search}
        onSearchChange={handleSearchChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setSelectedId={setSelectedId}
      />
      <CreateUpdateResources
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setResource(undefined);
        }}
        initialValues={resource}
      />

      {resource && (
        <ViewResourceDetails
          isOpen={isView}
          onClose={() => {
            setIsView(false);
            setResource(undefined);
          }}
          resource={resource}
        />
      )}
    </div>
  );
}
