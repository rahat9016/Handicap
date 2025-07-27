/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef, DataTable } from "@/components/ui/data-table";
import { useGet } from "@/hooks/useGet";
import { usePagination } from "@/hooks/usePagination";
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { OrganizationForm, organizationSchema } from "../schema/AddOrganizer";
import CreateOrganizationModal from "./CreateOrganizationModal";

interface IOrganization {
  name: string;
  type: {
    createdAt: string;
    description: string;
    id: number;
    isActive: boolean;
    name: string;
    updatedAt: string;
  };
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  isActive: boolean;
  id: string;
}
export default function AllOrganization() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { data, isLoading } = useGet(
    "/organizations",
    ["organizations", currentPage.toString()],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }
  );

  const { mutateAsync, error } = usePost(
    "/organizations",
    (data) => {
      console.log("POST success", data);
    },
    [["organizations"]]
  );
  const methods = useForm<OrganizationForm>({
    resolver: yupResolver(organizationSchema),
  });

  const onSubmit = (data: OrganizationForm) => {
    const formData = new FormData();

    // Append required fields
    formData.append("name", data.name);
    formData.append("contactPhone", data.contactPhone || "");
    formData.append("typeId", data.typeId);
    formData.append("code", data.name.toLowerCase().replace(/\s+/g, "-"));

    // Append optional fields only if they are provided
    if (data.contactEmail) formData.append("contactEmail", data.contactEmail);
    if (data.address) formData.append("address", data.address || "");
    if (data.description)
      formData.append("description", data.description || "");
    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    } else if (typeof data.logo === "string" && data.logo.trim() !== "") {
      formData.append("logo", data.logo);
    }

    // Submit the form data
    mutateAsync(formData).then(() => {
      console.log("Organization created successfully");
      toast.success("Organization created successfully");
      setIsModalOpen(false);
      // Reset the form after successful submission
      methods.reset();
    });
  };

  // Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
  }, [data]);

  const columns: ColumnDef<IOrganization>[] = [
    { header: "Organization Name", accessorKey: "name" },
    {
      header: "Type",
      accessorKey: "type",
      cell: (_, row) => {
        return <span>{row.type?.name || "N/A"}</span>;
      },
    },
    { header: "E-mail", accessorKey: "contactEmail" },
    { header: "Phone", accessorKey: "contactPhone" },
    {
      header: "Created date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = new Date(value as string);
        return <span>{format(date, "dd MMM yyyy")}</span>;
      },
    },
  ];
  return (
    <div className="bg-white p-8 min-h-[85vh] border border-skeleton rounded-2xl">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-erieBlack font-inter">
          All Organizations
        </h1>
        <Button
          className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11"
          onClick={() => setIsModalOpen(true)}
        >
          {" "}
          Create Organization{" "}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      <CreateOrganizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        methods={methods}
        errors={error?.errors}
        onSubmit={onSubmit}
      />
    </div>
  );
}
