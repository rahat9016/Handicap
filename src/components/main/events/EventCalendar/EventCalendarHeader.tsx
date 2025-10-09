"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  monthName: string;
  year: number;
  navigateMonth: (direction: "prev" | "next") => void;
  goToToday: () => void;
}

export default function CalendarHeader({
  monthName,
  year,
  navigateMonth,
  goToToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth("prev")}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-lg sm:text-xl font-semibold min-w-[140px] text-center">
          {monthName} {year}
        </h2>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth("next")}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Button
        size="sm"
        onClick={goToToday}
        className="text-sm bg-dashboard-primary hover:bg-dashboard-primary"
      >
        Today
      </Button>
    </div>
  );
}
