"use client";

import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useGet } from "@/hooks/useGet";
import { useMemo, useState } from "react";
import { months } from "./constant";
import EventCalendarDays from "./EventCalendarDays";
import CalendarDaysHeader from "./EventCalendarDaysHeader";
import EventCalendarDaysSkeleton from "./EventCalendarDaysSkeleton";
import CalendarHeader from "./EventCalendarHeader";
import { EventCalendarData } from "./types/interface";

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data: courseData, isLoading } = useGet<EventCalendarData>(
    `/events/calendar/monthly?year=${year}&month=${month}`,
    ["events-calendar", String(year), String(month)]
  );

  const calendarDays = useMemo(
    () => courseData?.data?.calendar || [],
    [courseData]
  );

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") newDate.setMonth(prev.getMonth() - 1);
      else newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => setCurrentDate(new Date());

  return (
    <div className="container px-4 py-20">
      <>
        <SectionTopTitle
          title="Event Calendar"
          desc="Stay updated with important events and activities happening this
            month."
          className="mb-5"
        />
        <CalendarHeader
          monthName={months[month - 1]}
          year={year}
          navigateMonth={navigateMonth}
          goToToday={goToToday}
        />

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <CalendarDaysHeader />
          <div className="grid grid-cols-7 gap-1 sm:gap-2 p-1 sm:p-2">
            {isLoading ? (
              <EventCalendarDaysSkeleton />
            ) : (
              <EventCalendarDays
                calendarDays={calendarDays}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
}
