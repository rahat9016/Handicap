// components/ui/data-table.tsx
import { Skeleton } from "@/components/ui/skeleton";

import { Download, Eye, FileText, Plus, Sheet, UsersIcon } from "lucide-react";
import { useState } from "react";
import Pagination from "../share/Pagination";
import TableTopBarHeader from "../share/TableTopBarHeader";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
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
  setItemsPerPage: (page: number) => void;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  setItemsPerPage,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((c) => c.accessorKey as string))
  );

  const toggleColumn = (accessor: string) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(accessor)) newSet.delete(accessor);
      else newSet.add(accessor);
      return newSet;
    });
  };
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <TableTopBarHeader
          icon={<UsersIcon />}
          title="Users"
          subtitle="Manage user accounts"
          showSearch
          // searchValue={search}
          // onSearchChange={handleSearchChange}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-[44px]">
              <Eye />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {columns.map((col) => (
              <DropdownMenuCheckboxItem
                key={String(col.accessorKey)}
                checked={visibleColumns.has(col.accessorKey as string)}
                onCheckedChange={() => toggleColumn(col.accessorKey as string)}
              >
                {col.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-[44px]">
              <Download />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 flex flex-col gap-1">
            <Button size="sm" className="w-full h-10 bg-slate-100 hover:bg-slate-200"><Sheet />Export CSV</Button>
            <Button size="sm" className="w-full h-10 bg-slate-100 hover:bg-slate-200"><FileText />Export PDF</Button>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11 gap-1 !px-6"
          // onClick={() => setIsModalOpen(true)}
        >
          <Plus className="!text-2xl text-white" /> Create
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#C6DFF8] h-[62px]">
              {visibleColumns.size === 0 ? (
                <TableHead className="text-center w-full">
                  No columns selected
                </TableHead>
              ) : (
                columns
                  .filter((c) => visibleColumns.has(c.accessorKey as string))
                  .map((column, index) => (
                    <TableHead
                      key={index}
                      className="font-medium font-inter text-base text-erieBlack"
                    >
                      {column.header}
                    </TableHead>
                  ))
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleColumns.size === 0 ? (
              <TableRow>
                <TableCell colSpan={1} className="text-center h-24">
                  No columns selected
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
                <TableRow className="h-[62px]" key={`skeleton-${rowIndex}`}>
                  {columns
                    .filter((c) => visibleColumns.has(c.accessorKey as string))
                    .map((column, colIndex) => (
                      <TableCell key={`skeleton-${rowIndex}-${colIndex}`}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.size}
                  className="h-24 text-center"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  className="h-[62px] text-darkLiver font-inter font-normal text-sm"
                  key={rowIndex}
                >
                  {columns
                    .filter((c) => visibleColumns.has(c.accessorKey as string))
                    .map((column) => {
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
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </>
  );
}
