import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ReactNode } from "react";

interface TableHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export default function TableTopBarHeader({
  icon,
  title,
  subtitle,
  searchValue,
  onSearchChange,
  showSearch = false,
  searchPlaceholder = "Search here...",
}: TableHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-dashboard-primary rounded-lg flex items-center justify-center text-white">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-erieBlack font-inter">
            {title}
          </h1>
          {subtitle && (
            <p className="font-inter text-xs">{subtitle}</p>
          )}
        </div>
      </div>


      {showSearch && (
        <div className="ml-auto flex items-center w-[300px] border px-2 rounded-md">
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
