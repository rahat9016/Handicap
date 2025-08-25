// components/ui/data-table.tsx
import { Skeleton } from "@/components/ui/skeleton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Download,
  Eye,
  FileText,
  Plus,
  Sheet,
} from "lucide-react";
import Papa from "papaparse";
import { ReactNode, useMemo, useState } from "react";
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
  sortable?: boolean;
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
  setItemsPerPage: ((page: string | number) => void) | undefined;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  setIsModalOpen?: (isOpen: boolean) => void;
  IsCreate?: boolean;
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
  icon,
  title,
  subtitle,
  searchValue,
  onSearchChange,
  showSearch,
  searchPlaceholder,
  setIsModalOpen,
  IsCreate = false,
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

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  function exportToCSV() {
    const visibleCols = columns.filter(
      (col) =>
        col.accessorKey &&
        visibleColumns.has(col.accessorKey as string) &&
        col.accessorKey !== "actions"
    );

    const headers = visibleCols.map((col) => col.header as string);

    const rows = data.map((row) =>
      visibleCols.map((col) => {
        if (col.accessorKey) {
          return row[col.accessorKey] ?? "";
        }
        return "";
      })
    );

    // ✅ export with PapaParse
    const csv = Papa.unparse({ fields: headers, data: rows });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "table-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToPDF() {
    const visibleCols = columns.filter(
      (col) =>
        col.accessorKey &&
        visibleColumns.has(col.accessorKey as string) &&
        col.accessorKey !== "actions"
    );

    const headers = visibleCols.map((col) => col.header);
    const rows = data.map((row) =>
      visibleCols.map((col) => {
        if (col.accessorKey) return row[col.accessorKey] ?? "";
        return "";
      })
    );

    const doc = new jsPDF();
    autoTable(doc, {
      head: [headers],
      body: rows,
    });
    doc.save("table-data.pdf");
  }

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;

    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = useMemo(() => {
  if (!sortConfig.key) return data;

  return [...data].sort((a, b) => {
    const aVal = a[sortConfig.key as keyof T];
    const bVal = b[sortConfig.key as keyof T];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    // Convert numeric-looking strings into numbers
    const isNumeric =
      !isNaN(Number(aVal)) && !isNaN(Number(bVal));

    if (isNumeric) {
      const numA = Number(aVal);
      const numB = Number(bVal);
      return sortConfig.direction === "asc" ? numA - numB : numB - numA;
    }

    // String comparison (case-insensitive)
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    return sortConfig.direction === "asc"
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });
}, [data, sortConfig]);

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <TableTopBarHeader
          icon={icon}
          title={title}
          subtitle={subtitle}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
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
            <Button
              size="sm"
              className="w-full h-10 bg-slate-100 hover:bg-slate-200"
              onClick={exportToCSV}
            >
              <Sheet />
              Export CSV
            </Button>
            <Button
              size="sm"
              className="w-full h-10 bg-slate-100 hover:bg-slate-200"
              onClick={exportToPDF}
            >
              <FileText />
              Export PDF
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        {IsCreate && setIsModalOpen && (
          <Button
            className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11 gap-1 !px-6"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="!text-2xl text-white" /> Create
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-full border-collapse">
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
                        onClick={() =>
                          handleSort(
                            column.accessorKey as string,
                            column.sortable
                          )
                        }
                        className={`font-medium font-inter text-base text-erieBlack max-w-[200px] truncate whitespace-nowrap select-none ${
                          columns.length - 1 !== index ? "border-r" : ""
                        } ${column.sortable ? "cursor-pointer" : ""}`}
                      >
                        <span className="flex items-center justify-between">
                          {column.header}
                          {column.sortable && (
                            <span>
                              {sortConfig.key === column.accessorKey ? (
                                sortConfig.direction === "asc" ? (
                                  <ArrowDownNarrowWide size={16} />
                                ) : (
                                  <ArrowUpNarrowWide size={16} />
                                )
                              ) : (
                                <ArrowUpNarrowWide
                                  size={16}
                                  className="opacity-50"
                                />
                              )}
                            </span>
                          )}
                        </span>
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
                      .filter((c) =>
                        visibleColumns.has(c.accessorKey as string)
                      )
                      .map((column, colIndex) => (
                        <TableCell
                          key={`skeleton-${rowIndex}-${colIndex}`}
                          className="max-w-[200px]"
                        >
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              ) : sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.size}
                    className="h-24 text-center"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row, rowIndex) => (
                  <TableRow
                    className="h-[62px] text-darkLiver font-inter font-normal text-sm"
                    key={rowIndex}
                  >
                    {columns
                      .filter((c) =>
                        visibleColumns.has(c.accessorKey as string)
                      )
                      .map((column) => {
                        const value = row[column.accessorKey];
                        return (
                          <TableCell
                            key={`${rowIndex}-${String(column.accessorKey)}`}
                            className="max-w-[200px] truncate whitespace-nowrap"
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
        </div>

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
