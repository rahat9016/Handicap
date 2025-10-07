/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGet } from "@/hooks/useGet";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { EventCalendarData } from "./types/interface";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();
  const { locale } = useParams();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data: courseData, isLoading } = useGet<EventCalendarData>(
    `/events/calendar/monthly?year=${year}&month=${month}`,
    ["events-calendar", String(year), String(month)]
  );
  console.log(courseData);
  const calendarDays = useMemo(
    () => courseData?.data?.calendar || [],
    [courseData]
  );

  // 🔹 Navigate months
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") newDate.setMonth(prev.getMonth() - 1);
      else newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => setCurrentDate(new Date());

  const handleEventClick = (eventId: string) => {
    router.push(`/${locale}/events/${eventId}`);
  };

  // 🔹 Render calendar
  const renderCalendarDays = () => {
    if (!calendarDays.length && !isLoading)
      return (
        <div className="col-span-7 py-10 text-center text-muted-foreground">
          No events found for this month.
        </div>
      );

    return calendarDays.map((dayObj: any) => {
      const isToday = new Date().toISOString().slice(0, 10) === dayObj.date;
      const events = dayObj.events || [];

      return (
        <div
          key={dayObj.date}
          className="min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 border border-border bg-card hover:bg-accent/50 transition-colors"
        >
          <div
            className={cn(
              "text-xs sm:text-sm font-medium mb-1 sm:mb-2",
              isToday ? "text-destructive font-bold" : "text-foreground"
            )}
          >
            {String(dayObj.day).padStart(2, "0")}
          </div>

          <div className="space-y-1">
            {isLoading ? (
              <div className="h-3 w-20 bg-muted animate-pulse rounded"></div>
            ) : (
              events.map((event: any) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  className="text-xs p-1 rounded border cursor-pointer transition-colors hover:bg-primary hover:text-white"
                >
                  <div className="font-medium line-clamp-1">{event.title}</div>
                  {event.location && (
                    <div className="text-[10px] opacity-80 mt-0.5 line-clamp-1">
                      {event.location}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="my-20 max-w-7xl mx-auto p-3 sm:p-6 bg-background">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Event Calendar
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground text-balance px-4">
          Stay updated with important events and activities happening this
          month.
        </p>
      </div>

      {/* Navigation */}
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
            {months[month - 1]} {year}
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
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="text-sm bg-transparent"
        >
          Today
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-7 bg-muted">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="p-2 sm:p-3 text-center font-medium text-xs sm:text-sm border-r border-border last:border-r-0"
            >
              <div className="hidden sm:block">{day}</div>
              <div className="sm:hidden">{day.slice(0, 3)}</div>
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">{renderCalendarDays()}</div>
      </div>
    </Card>
  );
}
