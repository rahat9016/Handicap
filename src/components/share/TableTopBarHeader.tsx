import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/redux/hooks";
import { Search } from "lucide-react";
import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TableHeaderProps {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  setSelectedId?: (id: string) => void;
  options?: { value: string; label: string }[];
}

export default function TableTopBarHeader({
  icon,
  title,
  subtitle,
  searchValue,
  onSearchChange,
  showSearch = false,
  searchPlaceholder = "Search here...",
  setSelectedId,
  options,
}: TableHeaderProps) {
  const { hasPermission } = useAppSelector((state) => state.permission);
  return (
    <div className="flex flex-col lg:flex-row w-full lg:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-12 h-12 bg-dashboard-primary rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-erieBlack font-inter">
              {title}
            </h1>
            {subtitle && <p className="font-inter text-xs">{subtitle}</p>}
          </div>
        </div>
        {hasPermission && setSelectedId && (
          <Select onValueChange={(val) => setSelectedId(val)}>
            <SelectTrigger className="w-[200px] h-12">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {showSearch && (
        <div className="ml-auto flex items-center w-full lg:w-[300px] border px-2 rounded-md">
          <Search />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            className="border-none shadow-none focus-visible:ring-0"
          />
        </div>
      )}
    </div>
  );
}
