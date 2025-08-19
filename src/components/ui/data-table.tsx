// components/ui/data-table.tsx
import { Skeleton } from "@/components/ui/skeleton";

import Pagination from "../share/Pagination";
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
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-[#C6DFF8] h-[62px] px-6">
          <TableRow>
            {columns?.map((column, index) => {
              return (
              <TableHead key={index} className={`font-medium font-inter text-base text-erieBlack `}>
                {column.header}
              </TableHead>
            )
            })}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </div>
  );
}
