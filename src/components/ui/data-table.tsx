// components/ui/data-table.tsx
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

// Types
export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading: boolean;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPagination = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Determine range to show
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the start/end
    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }

    // Add ellipsis if needed
    if (startPage > 2) pages.push("...");

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add trailing ellipsis if needed
    if (endPage < totalPages - 1) pages.push("...");

    // Always show last page if not first
    if (totalPages > 1) pages.push(totalPages);

    return (
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> entries
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {pages.map((page, index) => (
            <Button
              key={index}
              variant="outline"
              className={`${page === currentPage? "bg-dashboard-primary hover:bg-dashboard-primary text-white hover:text-white":"" }`}
              // variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={typeof page !== "number"}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-[#C6DFF8] h-[62px] px-6">
          <TableRow>
            {columns?.map((column, index) => (
              <TableHead key={index} className="font-medium font-inter text-base text-erieBlack">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
              <TableRow className="h-[62px]" key={`skeleton-${rowIndex}`}>
                {columns.map((column, colIndex) => (
                  <TableCell key={`skeleton-${rowIndex}-${colIndex}`}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row, rowIndex) => (
              <TableRow className=" h-[62px] text-darkLiver font-inter font-normal text-sm" key={rowIndex}>
                {columns?.map((column) => {
                  const value = row[column.accessorKey];
                  return (
                    <TableCell
                      key={`${rowIndex}-${String(column.accessorKey)}`}
                    >
                      {column?.cell
                        ? column.cell(value, row)
                        : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {renderPagination()}
    </div>
  );
}
