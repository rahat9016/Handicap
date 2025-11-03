"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";
import { LuFilter, LuFilterX, LuGrid2X2, LuList } from "react-icons/lu";

interface TableToolbar {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  viewMode?: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
}

const Toolbar = ({
  search,
  onSearchChange,
  viewMode = "grid",
  onViewModeChange,
  itemsPerPage,
  onItemsPerPageChange,
  isFiltersOpen,
  onToggleFilters,
}: TableToolbar) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm whitespace-nowrap">Rows per page:</span>
        <Select
          value={itemsPerPage === -1 ? "all" : itemsPerPage.toString()}
          onValueChange={(value) => {
            onItemsPerPageChange?.(value)
          }}
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
      <div className="flex-1 w-full flex items-center gap-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-md border w-10 h-10 flex items-center justify-center ${
              viewMode === "grid" ? "bg-[#2A53CD] text-white" : "text-black"
            }`}
            title="Grid View"
          >
            <LuGrid2X2 size={20} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-md border w-10 h-10 flex items-center justify-center ${
              viewMode === "list" ? "bg-[#2A53CD] text-white" : "text-black"
            }`}
            title="List View"
          >
            <LuList size={20} />
          </button>
        </div>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
          <Input
            placeholder="Search here..."
            value={search}
            onChange={onSearchChange}
            className="border pl-10 pr-4 py-2 w-full h-10 bg-white"
          />
        </div>

        <div
          onClick={onToggleFilters}
          className="flex lg:hidden bg-[#2A53CD] hover:bg-[#0490EF] text-white p-2 rounded-md cursor-pointer"
        >
          {isFiltersOpen ? <LuFilterX size={24} /> : <LuFilter size={24} />}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
