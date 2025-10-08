"use client";

import { daysOfWeek } from "./constant";

export default function CalendarDaysHeader() {
  return (
    <div className="grid grid-cols-7 bg-muted">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="p-2 sm:p-3 text-center font-medium text-xs sm:text-sm border-r border-border last:border-r-0"
        >
          <div className="hidden sm:block text-black">{day}</div>
          <div className="sm:hidden">{day.slice(0, 3)}</div>
        </div>
      ))}
    </div>
  );
}
